"use client"
import { motion, AnimatePresence } from 'framer-motion'
import { signInWithGoogle } from '../lib/firebaseClient'

export default function AuthRequiredModal({ open, onClose }){
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/30" onClick={onClose} />
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ type: 'spring', stiffness: 380, damping: 30 }} className="relative bg-white rounded-2xl p-6 w-[92%] max-w-md shadow-xl border border-red-100">
            <h3 className="text-lg font-semibold">Login required</h3>
            <p className="text-sm text-gray-600 mt-1">Please sign in with Google to access this feature.</p>
            <div className="mt-4 flex gap-3 justify-end">
              <button className="px-4 py-2 rounded-lg border" onClick={onClose}>Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600" onClick={()=>{ signInWithGoogle(); onClose?.() }}>Sign in with Google</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


