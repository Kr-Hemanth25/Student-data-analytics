"use client"
import { motion } from 'framer-motion'
import { useAuth } from './contexts/AuthContext'

export default function Navigation(){
  const { currentUser, login, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 bg-red-500 text-white">
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.25 }} className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <h1 className="text-base md:text-lg font-semibold tracking-tight">Student Analysis Dashboard</h1>
        <div className="flex items-center gap-3">
          {currentUser && <span className="hidden sm:inline text-white/90 text-sm uppercase">{currentUser.displayName || currentUser.email}</span>}
          {!currentUser ? (
            <button onClick={login} className="px-3 py-1 rounded bg-white text-red-600 font-medium hover:bg-white/90">Sign in</button>
          ) : (
            <button onClick={logout} className="px-3 py-1 rounded bg-white text-red-600 font-medium hover:bg-white/90">Sign out</button>
          )}
        </div>
      </motion.div>
    </header>
  )
}


