import { NextResponse } from 'next/server'

export async function POST(request){
  try{
    const body = await request.json()
    const apiBase = process.env.FASTAPI_BASE_URL || 'https://student-backend-j5cc.onrender.com'
    const upstream = await fetch(`${apiBase}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await upstream.json()
    return NextResponse.json(data, { status: upstream.status })
  }catch(e){
    return NextResponse.json({ error: e.message || 'unknown_error' }, { status: 500 })
  }
}


