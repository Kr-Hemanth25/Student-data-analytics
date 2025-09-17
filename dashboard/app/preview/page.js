"use client";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import AnalysisDashboard from "../../components/AnalysisDashboard";
import LoginGate from "../../components/LoginGate";

export default function PreviewPage(){
  const [analysis, setAnalysis] = useState(null)
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('Loading default CSV…')

  useEffect(()=>{
    async function load(){
      try{
        setStatus('loading'); setMessage('Please wait, the model is evaluating the default CSV...')
        const res = await fetch('/students_synthetic_500.csv')
        if(!res.ok) throw new Error('Failed to fetch CSV')
        const text = await res.text()
        const blob = new Blob([text], { type: 'text/csv' })
        const file = new File([blob], 'students_synthetic_500.csv', { type: 'text/csv' })
        const form = new FormData()
        form.append('file', file)
        const analyzed = await fetch('/api/analyze', { method: 'POST', body: form })
        const data = await analyzed.json()
        if(!analyzed.ok){ throw new Error(data.error || 'analyze_failed') }
        setAnalysis(data)
        setStatus('success'); setMessage('Loaded dataset')
      }catch(err){
        setStatus('error'); setMessage('Could not load or analyze the default CSV')
      }
    }
    load()
  },[])

  return (
    <LoginGate>
      <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white">
        <Navigation />
        <main className="mx-auto w-11/12 md:w-4/5 px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Existing CSV Preview</h1>
          <p className="text-gray-600 mb-8">This uses the bundled dataset to show the same analysis and charts.</p>
          <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 md:p-10">
            {status !== 'idle' && status !== 'success' && (
              <div className={`text-base text-center ${status==='error' ? 'text-red-600' : 'text-gray-700'}`}>{message}</div>
            )}
            {analysis && (
              <div className="mt-6">
                <AnalysisDashboard data={analysis} />
              </div>
            )}
            <div className="mt-4 text-xs text-gray-500 text-center">Note: This CSV comes from the company and is provided solely for preview purposes.</div>
          </div>
        </main>
      </div>
    </LoginGate>
  )
}


