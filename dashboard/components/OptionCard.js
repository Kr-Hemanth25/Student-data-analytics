"use client"
import { motion } from 'framer-motion'

export default function OptionCard({ title, description, icon, onClick }){
  return (
    <motion.button
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -20px rgba(239,68,68,0.35)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative overflow-hidden bg-white/80 backdrop-blur rounded-2xl border border-red-100 text-left p-5 w-full h-full focus:outline-none"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-50/40" />
      <div className="relative flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/10 to-rose-500/10 ring-1 ring-red-200 flex items-center justify-center text-red-600">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </motion.button>
  )
}


