"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navigation from "../components/Navigation";
import { Brain, Shield, Zap } from "lucide-react";

export default function Home() {
  const router = useRouter();

  function handleNavigate(path){
    router.push(path);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white">
      <Navigation />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="text-center mb-16">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Student
            <span className="text-red-500"> Data</span>
            <br />
            Analysis Dashboard
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto px-4"
          >
            Choose an option below to upload a CSV, evaluate a single student, or quickly preview the default dataset.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 px-4"
          >
            <button onClick={()=>handleNavigate('/upload')} className="group text-left" aria-label="Go to Upload CSV">
              <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-lg border border-red-100 h-full w-full">
                <div className="p-3 bg-red-100 rounded-xl w-fit mx-auto mb-4">
                  <Shield className="text-red-500" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Upload CSV</h3>
                <p className="text-gray-600 text-center">Upload a .csv with student data to run full analysis.</p>
              </motion.div>
            </button>

            <button onClick={()=>handleNavigate('/evaluate')} className="group text-left" aria-label="Go to Student Evaluation">
              <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-lg border border-red-100 h-full w-full">
                <div className="p-3 bg-red-100 rounded-xl w-fit mx-auto mb-4">
                  <Brain className="text-red-500" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Student Evaluation</h3>
                <p className="text-gray-600 text-center">Enter skills to predict assessment score and persona.</p>
              </motion.div>
            </button>

            <button onClick={()=>handleNavigate('/preview')} className="group text-left" aria-label="Go to Existing CSV Preview">
              <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-lg border border-red-100 h-full w-full">
                <div className="p-3 bg-red-100 rounded-xl w-fit mx-auto mb-4">
                  <Zap className="text-red-500" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Use Existing CSV</h3>
                <p className="text-gray-600 text-center">Load a default dataset and preview students with personas.</p>
              </motion.div>
            </button>
          </motion.div>
        </div>
        {/* Linked cards above navigate to dedicated pages */}
      </motion.main>
    </div>
  )
}
