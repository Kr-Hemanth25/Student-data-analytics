"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function StudentEvaluation(){
  const [form, setForm] = useState({ focus: '', attention: '', retention: '', comprehension: '', engagement_time: '' })
  const [result, setResult] = useState(null)
  const [status, setStatus] = useState('idle')

  function handleChange(e){ setForm(prev => ({ ...prev, [e.target.name]: e.target.value })) }

  async function onSubmit(e){
    e.preventDefault()
    const rawValues = Object.values(form)
    const hasBlankOrNaN = rawValues.some(v => v === '' || Number.isNaN(Number(v)))
    if(hasBlankOrNaN){
      setResult({ score: null, persona: 'Prediction not possible. Enter numeric values for all parameters (0-100).' })
      setStatus('error')
      return
    }
    const values = rawValues.map(v => Number(v))
    const invalid = values.some(v => v < 0 || v > 100)
    if(invalid){
      return setResult({ score: null, persona: 'Please enter values between 0 and 100' })
    }
    try{
      setStatus('loading')
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if(!res.ok){ throw new Error(data.error || 'prediction_failed') }
      setResult({ score: data.score, persona: data.persona })
      setStatus('success')
    }catch(err){
      setResult({ score: null, persona: 'Prediction failed. Ensure Python env is set up.' })
      setStatus('error')
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {['focus','attention','retention','comprehension','engagement_time'].map(key => (
          <div key={key} className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 capitalize">{key.replace('_',' ')}</label>
            <input type="number" name={key} value={form[key]} onChange={handleChange} min="0" max="100" placeholder="0-100" className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 bg-white text-gray-900 placeholder-gray-400 ${form[key] === '' ? 'border-red-300 focus:ring-red-300' : 'border-gray-300 focus:ring-red-300'}`} />
          </div>
        ))}
        <div className="md:col-span-2">
          <motion.button whileHover={{ scale: status==='loading' ? 1 : 1.02 }} whileTap={{ scale: status==='loading' ? 1 : 0.98 }} type="submit" disabled={status==='loading'} className={`px-4 py-2 rounded-lg transition w-full ${status==='loading' ? 'bg-red-300 cursor-not-allowed text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}>{status==='loading' ? 'Evaluating… Please wait' : 'Predict Assessment'}</motion.button>
        </div>
      </form>
      {status==='loading' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gray-700">Model is evaluating your inputs…</motion.div>
      )}
      {result && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg bg-red-50 border border-red-100 text-center">
          <div className="font-semibold text-gray-900">Predicted Assessment Score: <span className="text-gray-900">{result.score}</span></div>
          <div className="text-sm text-gray-900">Persona: {result.persona}</div>
        </motion.div>
      )}
    </div>
  )
}


