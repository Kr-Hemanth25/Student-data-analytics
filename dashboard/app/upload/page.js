"use client";
import Navigation from "../../components/Navigation";
import UploadCsv from "../../components/UploadCsv";
import LoginGate from "../../components/LoginGate";

export default function UploadPage(){
  return (
    <LoginGate>
      <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white">
        <Navigation />
        <main className="mx-auto w-11/12 md:w-4/5 px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Upload CSV</h1>
          <p className="text-gray-600 mb-8">Upload your student dataset to analyze performance and personas.</p>
          <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 md:p-10">
            <UploadCsv />
          </div>
        </main>
      </div>
    </LoginGate>
  )
}


