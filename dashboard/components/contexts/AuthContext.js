"use client"
import { createContext, useContext, useEffect, useState } from 'react'
import { auth, signInWithGoogle, signOutUser } from '../../lib/firebaseClient'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext({ currentUser: null, login: ()=>{}, logout: ()=>{} })

export function AuthProvider({ children }){
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u => setCurrentUser(u))
    return () => unsub()
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, login: signInWithGoogle, logout: signOutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
}


