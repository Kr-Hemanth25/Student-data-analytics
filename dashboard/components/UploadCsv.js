"use client"
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnalysisDashboard from './AnalysisDashboard'

export default function UploadCsv(){
  const inputRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [analysis, setAnalysis] = useState(null)

  function handlePick(){ inputRef.current?.click() }

  async function handleFile(e){
    const file = e.target.files?.[0]
    if(!file){ return }
    if(!file.name.toLowerCase().endsWith('.csv')){
      setStatus('error'); setMessage('Please select a .csv file'); return
    }
    try{
      setStatus('loading'); setMessage('Please wait, the model is evaluating your CSV...')
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/analyze', { method: 'POST', body: form })
      const data = await res.json()
      if(!res.ok){ throw new Error(data.error || 'analyze_failed') }
      setAnalysis(data)
      setStatus('success'); setMessage(`Analyzed: ${file.name}`)
    }catch(err){
      setStatus('error'); setMessage('Analyze failed. Ensure Python env is set up.')
    }
  }

  return (
    <div className="space-y-5">
      <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handlePick} disabled={status==='loading'} className={`px-5 py-3 rounded-xl transition w-full text-base font-semibold ${status==='loading' ? 'bg-red-300 cursor-not-allowed text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}>{status==='loading' ? 'Analyzing…' : 'Upload CSV'}</motion.button>
      <AnimatePresence>
        {status !== 'idle' && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className={`${status==='loading' ? 'text-base text-center text-gray-700' : 'text-sm'} ${status==='success' ? 'text-green-600' : status==='error' ? 'text-red-600' : ''}`}>
            {message}
          </motion.div>
        )}
      </AnimatePresence>
      {analysis && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Student Details</h2>
          <AnalysisDashboard data={analysis} />
        </div>
      )}
    </div>
  )
}


