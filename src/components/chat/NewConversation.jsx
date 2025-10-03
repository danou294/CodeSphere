import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'
import { useUserPremiumStatus } from '../../hooks/useUserPremiumStatus'
import ChatInput from './ChatInput'
import ChatNotification from './ChatNotification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faRobot } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

const NewConversation = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { isPremium, isLoading } = useUserPremiumStatus()
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type) => {
    setNotification({ message, type })
  }

  const hideNotification = () => {
    setNotification(null)
  }

  const handleNewMessage = (response) => {
    console.log('🔄 [NEW CONVERSATION] Nouvelle conversation créée:', response)
    
    if (response && response.session && response.messages) {
      // Rediriger vers la conversation créée
      navigate(`/chat/${response.session.id}`)
      showNotification('Nouvelle conversation créée !', 'success')
    } else {
      showNotification('Erreur lors de la création de la conversation', 'error')
    }
  }

  const handleMessageSent = () => {
    // Pas besoin d'indicateur d'attente pour la création
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!isLoading && !isPremium) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="flex items-center justify-center h-full p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            {/* Effet de brillance */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-75"></div>
            
            <div className="relative text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md border border-gray-200 dark:border-gray-700">
              {/* Icône premium */}
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <FontAwesomeIcon icon={faRobot} className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Accès Premium Requis
              </h2>
              
              <p className="mb-8 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Débloquez l'accès complet à notre <span className="font-semibold text-blue-600 dark:text-blue-400">chatbot intelligent</span> pour créer de nouvelles conversations !
              </p>
              
              {/* Fonctionnalités premium */}
              <div className="mb-8 space-y-3">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Création de conversations illimitées</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>IA avancée et réponses personnalisées</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Support complet Markdown et code</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/premium-offer')}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">🚀 Passer à Premium</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Annulation possible à tout moment
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-surface-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-surface-800 bg-white dark:bg-surface-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/chat')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Retour aux conversations"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Nouvelle conversation
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Commencez une nouvelle discussion avec l'IA
            </p>
          </div>
        </div>
      </div>

      {/* Zone de message vide avec instructions */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faRobot} className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Commencez votre conversation
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Posez votre question ou partagez votre idée. L'IA générera automatiquement un titre pour votre conversation.
          </p>
        </div>
      </div>

      {/* Zone de saisie */}
      <div className="p-4 border-t border-gray-200 dark:border-surface-800 bg-white dark:bg-surface-0">
        <ChatInput
          sessionId={null}
          onNewMessage={handleNewMessage}
          onMessageSent={handleMessageSent}
          isNewConversation={true}
        />
      </div>

      {/* Notifications */}
      {notification && (
        <ChatNotification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </div>
  )
}

export default NewConversation
