"use client"
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from './contexts/AuthContext'

export default function AuthModal({ isOpen, onClose }){
  const { login } = useAuth()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="relative bg-white rounded-2xl p-6 w-[92%] max-w-md shadow-xl border">
            <h3 className="text-lg font-semibold">Sign in</h3>
            <p className="text-sm text-gray-600 mt-1">Continue with Google to access the dashboard.</p>
            <div className="mt-4 flex gap-3 justify-end">
              <button className="px-4 py-2 rounded-lg border" onClick={onClose}>Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600" onClick={()=> { login(); onClose?.() }}>Sign in with Google</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


