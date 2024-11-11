// LogoutButton.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { toast } from 'react-toastify' // Importer toast de react-toastify

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        toast.success('Déconnexion réussie !') // Notification de succès
        navigate('/login')
      })
      .catch((error) => {
        toast.error('Erreur de déconnexion : ' + error.message) // Notification d'erreur
      })
  }

  return (
    <button
      onClick={handleLogout}
      className="text-gray-200 bg-red-600 px-4 py-2 rounded transition duration-200 ease-in-out hover:bg-red-500 shadow-md ml-4"
    >
      Déconnexion
    </button>
  )
}

export default LogoutButton
