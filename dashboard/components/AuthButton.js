"use client"
import { useEffect, useState } from 'react'
import { auth, signInWithGoogle, signOutUser } from '../lib/firebaseClient'
import { onAuthStateChanged } from 'firebase/auth'
import { motion } from 'framer-motion'

export default function AuthButton(){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u=> setUser(u))
    return () => unsub()
  },[])

  if(user){
    return (
      <div className="flex items-center gap-3">
        <img src={user.photoURL || ''} alt="avatar" className="w-8 h-8 rounded-full" />
        <span className="text-sm text-capitalize">{user.displayName || user.email}</span>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={()=> signOutUser()} className="px-3 py-1 rounded bg-red-500 text-white">Sign out</motion.button>
      </div>
    )
  }

  return (
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={()=> signInWithGoogle()} className="px-3 py-1 rounded bg-red-500 text-white">Sign in with Google</motion.button>
  )
}


