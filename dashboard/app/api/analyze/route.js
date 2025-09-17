import { NextResponse } from 'next/server'

export async function POST(request){
  try{
    const form = await request.formData()
    const file = form.get('file')
    if(!file){
      return NextResponse.json({ error: 'file_missing' }, { status: 400 })
    }
    const apiBase = process.env.FASTAPI_BASE_URL || 'https://student-backend-j5cc.onrender.com'
    const upstream = await fetch(`${apiBase}/analyze`, {
      method: 'POST',
      body: form
    })
    const data = await upstream.json()
    return NextResponse.json(data, { status: upstream.status })
  }catch(e){
    return NextResponse.json({ error: e.message || 'unknown_error' }, { status: 500 })
  }
}


