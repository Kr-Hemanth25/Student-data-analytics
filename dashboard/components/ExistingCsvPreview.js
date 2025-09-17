"use client"
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function parseCsv(text){
  const [headerLine, ...lines] = text.trim().split(/\r?\n/)
  const headers = headerLine.split(',').map(h=>h.trim())
  const rows = lines.slice(0, 20).map(line => {
    const cells = line.split(',')
    const obj = {}
    headers.forEach((h,i)=> obj[h] = (cells[i] ?? '').trim())
    return obj
  })
  return { headers, rows }
}

export default function ExistingCsvPreview(){
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=>{
    async function load(){
      try{
        const res = await fetch('/students_synthetic_500.csv')
        if(!res.ok) throw new Error('Failed to load CSV')
        const text = await res.text()
        setData(parseCsv(text))
      }catch(err){ setError('Could not load default CSV') }
    }
    load()
  },[])

  if(error){ return <div className="text-sm text-red-600">{error}</div> }
  if(!data){ return <div className="text-sm text-gray-600">Loading preview…</div> }

  return (
    <div className="overflow-auto border rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-red-50 text-red-700">
          <tr>
            {data.headers.map(h=> (
              <th key={h} className="px-3 py-2 text-left whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, idx)=> (
            <motion.tr key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.01 }} className="odd:bg-white even:bg-gray-50">
              {data.headers.map(h=> (
                <td key={h} className="px-3 py-2 whitespace-nowrap">{row[h]}</td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
