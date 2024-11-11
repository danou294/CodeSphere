import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../Contexts/AuthContext.jsx'
import { firestore } from '../../firebaseConfig'
import { baseProject } from '../../features/redux.js'
import { toast, ToastContainer } from 'react-toastify' // Importer Toastify
import 'react-toastify/dist/ReactToastify.css' // Importer le style de Toastify

function CreateProject() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      toast.error('Veuillez remplir tous les champs !') // Notification d'erreur
      return
    }
    setLoading(true)
    try {
      const docRef = await addDoc(collection(firestore, 'projects'), {
        title,
        description,
        html: baseProject.html,
        css: baseProject.css,
        javascript: baseProject.js,
        createdAt: serverTimestamp(),
        author: currentUser.uid,
        collaboration: [],
      })
      console.log('Document written with ID: ', docRef.id)
      toast.success('Projet ajouté avec succès !') // Notification de succès
      navigate('/projectList')
    } catch (error) {
      console.error('Error adding document: ', error)
      toast.error("Erreur lors de l'ajout du projet : " + error.message) // Notification d'erreur
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-10 bg-white rounded-lg shadow-lg min-w-[400px]"
      >
        <h2 className="text-2xl font-bold mb-5 text-gray-800">
          Ajouter un projet
        </h2>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Titre
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border text-black border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border text-black border-gray-300 rounded-lg"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className={`w-full p-3 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-lg font-medium`}
          disabled={loading}
        >
          {loading ? <Spinner /> : 'Ajouter'}
        </button>
      </form>
      <ToastContainer /> {/* Ajouter le conteneur pour les notifications */}
    </div>
  )
}

// Composant Spinner pour le chargement
const Spinner = () => (
  <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
)

export default CreateProject
