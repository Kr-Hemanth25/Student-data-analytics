"use client"
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, signInWithGoogle } from '../lib/firebaseClient'
import { motion } from 'framer-motion'

export default function LoginGate({ children }){
  const [user, setUser] = useState(undefined) // undefined=loading, null=not logged in, object=logged in
  const [show, setShow] = useState(false)

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u => {
      const val = u || null
      setUser(val)
      setShow(val === null)
    })
    return () => unsub()
  },[])

  return (
    <div className="relative">
      {children}
      {user === undefined && (
        <div className="fixed inset-0 z-50 grid place-items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-3 py-2 rounded bg-white text-gray-700 shadow">Loading…</motion.div>
        </div>
      )}
      {show && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 grid place-items-center p-4">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-2xl bg-white border border-red-100 shadow-xl p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-900">Sign in to continue</h2>
              <p className="text-sm text-gray-600 mt-1">Use your Google account to access uploads, evaluation, and dataset preview.</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button onClick={()=> signInWithGoogle()} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">Sign in with Google</button>
                <button onClick={()=> setShow(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}


