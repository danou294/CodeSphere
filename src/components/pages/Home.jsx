import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../../public/Assets/logo.png'
import { useAuth } from '../Contexts/AuthContext.jsx'

const Home = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const isMobileOrTablet = window.innerWidth <= 1024 // Détection des écrans mobiles et tablettes
    const hasSeenModal = sessionStorage.getItem('hasSeenModal')
    if (isMobileOrTablet && !hasSeenModal) {
      setShowModal(true)
    }
  }, [])

  const handleStartProject = () => {
    if (currentUser) {
      navigate('/projectlist')
    } else {
      navigate('/editor')
    }
  }

  const handleContinue = () => {
    setShowModal(false)
    sessionStorage.setItem('hasSeenModal', 'true')
  }

  return (
    <div className="home-container text-center p-10 bg-blue-50 min-h-screen overflow-hidden">
      {/* Modal d'avertissement pour la première visite sur mobile/tablette */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-xs w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Optimisez votre Expérience avec CodeSphere
            </h2>
            <p className="text-gray-700 mb-4">
              Bienvenue sur <strong>CodeSphere</strong>, votre plateforme de
              développement web. Pour une expérience optimale, nous vous
              recommandons d'utiliser un ordinateur. Découvrez toutes nos
              fonctionnalités avancées et travaillez plus confortablement.
            </p>
            <button
              onClick={handleContinue}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Continuer
            </button>
          </div>
        </div>
      )}

      <div className="max-w-screen-md mx-auto">
        <img
          src={logo}
          alt="CodeSphere Logo"
          className="mx-auto w-64 h-auto mb-0"
        />
      </div>
      <h1 className="text-5xl font-extrabold mt-5 mb-0 text-blue-600">
        Bienvenue sur CodeSphere
      </h1>
      <p className="text-lg mt-5 mb-0 text-gray-700">
        <strong>CodeSphere</strong>, votre plateforme de développement web de
        confiance, offre une expérience immersive et interactive. Créez, éditez
        et prévisualisez vos projets en{' '}
        <strong>HTML, CSS, et JavaScript</strong> en temps réel directement
        depuis votre navigateur.
      </p>
      <p className="text-lg mt-5 mb-0 text-gray-700">
        Que vous soyez un <strong>développeur professionnel</strong> ou un{' '}
        <strong>passionné de technologie</strong>, CodeSphere est conçu pour
        simplifier votre flux de travail avec des fonctionnalités telles que l'
        <strong>inscription simplifiée via Google ou GitHub</strong>, et une{' '}
        <strong>collaboration en temps réel</strong>.
      </p>
      <p className="text-lg mt-5 mb-0 text-gray-700">
        Rejoignez notre <strong>communauté innovante</strong> et commencez à
        transformer vos idées en réalité aujourd'hui avec CodeSphere.
      </p>
      <div className="mt-10 mb-0">
        <button
          onClick={handleStartProject}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out"
        >
          Commencer dès maintenant
        </button>
      </div>
      <div className="mt-10 flex justify-center mb-0">
        <div className="p-4 w-auto max-w-md text-left bg-white rounded-lg shadow-lg mb-0">
          <h2 className="text-2xl font-bold text-blue-600">
            Pourquoi choisir CodeSphere ?
          </h2>
          <ul className="list-disc list-inside text-gray-700 mt-3">
            <li>Édition en temps réel</li>
            <li>Intégration facile avec Google et GitHub</li>
            <li>Interface utilisateur intuitive</li>
            <li>Support et communauté actifs</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
