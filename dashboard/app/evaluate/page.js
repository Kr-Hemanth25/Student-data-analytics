"use client";
import Navigation from "../../components/Navigation";
import StudentEvaluation from "../../components/StudentEvaluation";
import LoginGate from "../../components/LoginGate";

export default function EvaluatePage(){
  return (
    <LoginGate>
      <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white">
        <Navigation />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Student Evaluation</h1>
          <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
            <StudentEvaluation />
          </div>
        </main>
      </div>
    </LoginGate>
  )
}


