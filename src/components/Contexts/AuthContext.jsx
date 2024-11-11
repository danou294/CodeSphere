// src/Contexts/AuthContext.jsx
import React, { useContext, useState, useEffect, createContext } from 'react'
import { auth } from '../../firebaseConfig' // Assurez-vous que le chemin est correct
import { onAuthStateChanged, signOut } from 'firebase/auth' // Importer signOut

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
      setCurrentUser(null) // Réinitialise l'utilisateur actuel après déconnexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion : ', error)
    }
  }

  const value = {
    currentUser,
    logout, // Ajout de la fonction logout au contexte
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
