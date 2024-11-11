import React, { useState, useEffect } from 'react'
import ChatSidebar from './ChatSidebar'
import ChatInput from './ChatInput'
import { listSessions, getMessages } from '../../services/chatService'
import { useAuth } from '../Contexts/AuthContext' // Assure-toi que le chemin est correct
import { firestore } from '../../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons' // Import de l'icône de fermeture
import { FaRobot } from 'react-icons/fa' // Importer l'icône de robot

const ChatPanel = ({ participantId, onClose }) => {
  const { currentUser } = useAuth()
  const [hasPaid, setHasPaid] = useState(false)
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const checkSubscription = async () => {
      if (currentUser) {
        try {
          const userRef = doc(firestore, 'users', currentUser.uid)
          const userSnap = await getDoc(userRef)
          if (userSnap.exists() && userSnap.data().hasPaidForChatbot) {
            setHasPaid(true)
          }
        } catch (error) {
          console.error(
            "Erreur lors de la vérification de l'abonnement :",
            error
          )
        }
      }
    }

    checkSubscription()
  }, [currentUser])

  useEffect(() => {
    const fetchSessions = async () => {
      if (!participantId) {
        console.error('Participant ID non défini.')
        return
      }

      try {
        const sessionsData = await listSessions(participantId)
        setSessions(sessionsData)
      } catch (error) {
        console.error('Erreur lors de la récupération des sessions:', error)
        setSessions([])
      }
    }

    fetchSessions()
  }, [participantId])

  useEffect(() => {
    if (selectedSession) {
      const fetchMessages = async () => {
        try {
          const messagesData = await getMessages(selectedSession.id)
          setMessages(messagesData)
        } catch (error) {
          console.error('Erreur lors de la récupération des messages:', error)
        }
      }
      fetchMessages()
    }
  }, [selectedSession])

  const handleSelectSession = (session) => {
    setSelectedSession(session)
    setMessages([]) // Réinitialiser les messages lors du changement de session
  }

  const handleSubscribe = () => {
    window.location.href = '/premium-offer'
  }

  return (
    <div className="relative flex flex-col h-full bg-gray-800 text-white">
      {/* Overlay pour les utilisateurs non payants */}
      {!hasPaid && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-10">
          <div className="text-center p-6 bg-white text-gray-800 rounded-lg shadow-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Accès Restreint
            </h2>
            <p className="mb-6 text-lg">
              Débloquez l'accès complet à notre chatbot intelligent en
              souscrivant à l'offre premium. Profitez de fonctionnalités
              exclusives qui transformeront votre expérience utilisateur !
            </p>
            <button
              onClick={handleSubscribe}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-blue-800 transition duration-300"
            >
              Passer à Premium
            </button>
          </div>
        </div>
      )}

      {/* Barre supérieure avec bouton de fermeture */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <FaRobot className="text-blue-500" /> {/* Icône de robot */}
        <h2 className="text-lg font-bold">Assistant Virtuel</h2>
        <button onClick={onClose} className="text-white hover:text-gray-400">
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      </div>

      {/* Conteneur pour la liste des conversations et les messages */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Section pour la liste des conversations */}
        <div className="h-40 overflow-y-auto">
          <ChatSidebar
            sessions={sessions}
            selectedSession={selectedSession}
            onSelectSession={handleSelectSession}
            participantId={participantId}
          />
        </div>

        {/* Section pour les messages */}
        <div
          className="flex-1 p-4 overflow-y-auto space-y-2"
          style={{ maxHeight: 'calc(100vh - 160px)', minHeight: '200px' }}
        >
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${message.is_from_user ? 'bg-blue-600' : 'bg-gray-600'}`}
              >
                {message.content}
              </div>
            ))
          ) : selectedSession ? (
            <p className="text-gray-400">
              Aucun message dans cette discussion.
            </p>
          ) : (
            <p className="text-gray-400">
              Veuillez sélectionner une discussion.
            </p>
          )}
        </div>
      </div>

      {/* Input pour envoyer de nouveaux messages, toujours en bas */}
      {selectedSession && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 border-t border-gray-700">
          <ChatInput
            sessionId={selectedSession.id}
            onNewMessage={setMessages}
          />
        </div>
      )}
    </div>
  )
}

export default ChatPanel
