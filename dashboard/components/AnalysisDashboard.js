"use client"
import { useMemo, useState } from 'react'
import { Bar, Scatter, Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale, Tooltip, Legend)

export default function AnalysisDashboard({ data }){
  const overview = data?.overview || {}
  const correlations = data?.correlations || {}
  const preview = data?.preview || []
  const [query, setQuery] = useState('')

  const barData = useMemo(()=>{
    const labels = Object.keys(overview).filter(k=> k !== 'assessment_score')
    return {
      labels,
      datasets: [{
        label: 'Average',
        data: labels.map(l=> overview[l] ?? 0),
        backgroundColor: 'rgba(239,68,68,0.5)'
      }]
    }
  }, [overview])

  const scatterData = useMemo(()=>{
    const xs = preview.map(r => Number(r.attention) || 0)
    const ys = preview.map(r => Number(r.assessment_score) || 0)
    return {
      datasets: [{
        label: 'Attention vs Score',
        data: xs.map((x,i)=> ({ x, y: ys[i] })),
        backgroundColor: 'rgba(239,68,68,0.6)'
      }]
    }
  }, [preview])

  const radarData = useMemo(()=>{
    const s = preview[0] || {}
    const labels = ['comprehension','attention','focus','retention','engagement_time']
    return {
      labels,
      datasets: [{
        label: s.name || 'Sample Student',
        data: labels.map(k => Number(s[k]) || 0),
        backgroundColor: 'rgba(239,68,68,0.2)',
        borderColor: 'rgba(239,68,68,0.8)'
      }]
    }
  }, [preview])

  const categoryBarData = useMemo(()=>{
    const labels = Array.from({ length: 10 }, (_, i) => `${i*10}-${i===9 ? 100 : (i+1)*10}`)
    const counts = new Array(10).fill(0)
    for(const row of preview){
      const s = Number(row.assessment_score)
      if(Number.isFinite(s) && s >= 0){
        const idx = Math.max(0, Math.min(9, Math.floor(s/10)))
        counts[idx] += 1
      }
    }
    return {
      labels,
      datasets: [{
        label: 'Students per score range',
        data: counts,
        backgroundColor: 'rgba(239,68,68,0.5)'
      }]
    }
  }, [preview])

  const personaBarData = useMemo(()=>{
    const counts = new Map()
    const personasList = Array.isArray(data?.personas) && data.personas.length === preview.length
      ? data.personas
      : preview.map(r => {
          const s = Number(r.assessment_score)
          if(!Number.isFinite(s)) return 'Unknown'
          if(s >= 85) return 'High Performer'
          if(s >= 70) return 'Consistent Learner'
          if(s >= 50) return 'Developing Learner'
          return 'Needs Support'
        })
    for(const p of personasList){ counts.set(p, (counts.get(p) || 0) + 1) }
    const labels = Array.from(counts.keys())
    const values = labels.map(l => counts.get(l))
    return {
      labels,
      datasets: [{
        label: 'Students per persona',
        data: values,
        backgroundColor: 'rgba(59,130,246,0.5)'
      }]
    }
  }, [data?.personas, preview])

  const filteredPreview = query.trim()
    ? preview.filter(r => String(r.name || '').toLowerCase().includes(query.toLowerCase()))
    : preview

  return (
    <div className="space-y-8 text-gray-900 w-[90%] mx-auto">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(overview).map(([k,v])=> (
          <div key={k} className="rounded-xl border border-red-100 bg-white p-4">
            <div className="text-sm text-gray-900 capitalize">{k.replace('_',' ')}</div>
            <div className="text-2xl font-semibold">{v}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-red-100 bg-white p-4 lg:col-span-2">
          <h3 className="font-semibold mb-2">Average Skills</h3>
          <div className="h-96">
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }}}} />
          </div>
        </div>
        <div className="rounded-xl border border-red-100 bg-white p-4">
          <h3 className="font-semibold mb-2">Attention vs Score</h3>
          <div className="h-80">
            <Scatter data={scatterData} options={{ responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: 'attention' }}, y: { title: { display: true, text: 'score' }}}}} />
          </div>
        </div>
        <div className="rounded-xl border border-red-100 bg-white p-4 lg:col-span-3">
          <h3 className="font-semibold mb-2">Student Profile (sample)</h3>
          <div className="h-80">
            <Radar data={radarData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }}}} />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-red-100 bg-white p-4">
          <h3 className="font-semibold mb-2">Assessment Score Distribution (10-point bins)</h3>
          <div className="h-80">
            <Bar data={categoryBarData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }}, scales: { x: { title: { display: true, text: 'Score Range' }}, y: { title: { display: true, text: 'Students' }, beginAtZero: true }}}} />
          </div>
        </div>
        <div className="rounded-xl border border-red-100 bg-white p-4">
          <h3 className="font-semibold mb-2">Persona Distribution</h3>
          <div className="h-80">
            <Bar data={personaBarData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }}, scales: { x: { title: { display: true, text: 'Persona' }}, y: { title: { display: true, text: 'Students' }, beginAtZero: true }}}} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-red-100 bg-white p-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h3 className="font-semibold">Students (preview)</h3>
          <input
            type="text"
            value={query}
            onChange={e=> setQuery(e.target.value)}
            placeholder="Search by name..."
            className="border border-gray-300 rounded-lg px-3 py-2 w-64 max-w-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-red-50 text-red-700">
              <tr>
                {(data.columns || []).slice(0,10).map(h => (
                  <th key={h} className="px-3 py-2 text-center whitespace-nowrap capitalize">{h}
                  </th>
                ))}
                {data.personas && <th className="px-3 py-2 text-center whitespace-nowrap capitalize">persona</th>}
              </tr>
            </thead>
            <tbody>
              {filteredPreview.map((row, idx)=> (
                <tr key={idx} className="odd:bg-white even:bg-gray-50">
                  {(data.columns || []).slice(0,10).map(h => (
                    <td key={h} className="px-3 py-2 whitespace-nowrap text-center">{row[h]}</td>
                  ))}
                  {data.personas && <td className="px-3 py-2 whitespace-nowrap text-center">{data.personas[idx]}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-red-100 bg-white p-4">
        <h3 className="font-semibold mb-2">Insights</h3>
        <ul className="list-disc pl-5 text-sm text-gray-900">
          {Object.entries(correlations).slice(0,6).map(([k,v])=> (
            <li key={k}>{k} correlation with score: {v}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}


