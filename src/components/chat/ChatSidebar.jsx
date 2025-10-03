import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  listSessions,
  createSession,
  deleteSession,
} from '../../services/chatService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

const ChatSidebar = ({ participantId }) => {
  const navigate = useNavigate()
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)

  useEffect(() => {
    const fetchSessions = async () => {
      if (!participantId) {
        console.error('Participant ID non défini.')
        return
      }

      try {
        const response = await listSessions(participantId)
        const sessionsData = response.sessions || [] // Extraire le tableau sessions de la réponse
        setSessions(sessionsData)
      } catch (error) {
        console.error('Erreur lors de la récupération des sessions:', error)
        setSessions([])
      }
    }

    fetchSessions()
  }, [participantId])

  const handleCreateSession = () => {
    // Naviguer vers la page de création de conversation
    navigate('/chat/new')
  }

  const handleDeleteSession = async (sessionId) => {
    const result = await Swal.fire({
      title: 'Confirmer la suppression',
      text: 'Cette action est irréversible. Voulez-vous continuer ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    })

    if (result.isConfirmed) {
      try {
        await deleteSession(sessionId)
        setSessions((prevSessions) =>
          prevSessions.filter((session) => session.id !== sessionId)
        )
        setSelectedSession(null)
        Swal.fire(
          'Supprimé',
          'La discussion a été supprimée avec succès.',
          'success'
        )
      } catch (error) {
        console.error(
          `Erreur lors de la suppression de la session ${sessionId}:`,
          error
        )
        Swal.fire('Erreur', 'Impossible de supprimer la discussion.', 'error')
      }
    }
  }

  const handleSelectSession = (session) => {
    setSelectedSession(session)
    navigate(`/chat/${session.id}`)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Bouton pour créer une nouvelle conversation */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={handleCreateSession}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
          <span className="text-sm font-medium">Nouvelle conversation</span>
        </button>
      </div>
      
      {/* Liste des conversations */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session.id}
                className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedSession?.id === session.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
                    : 'hover:bg-gray-100 dark:hover:bg-surface-200 text-gray-700 dark:text-white border border-transparent'
                }`}
                onClick={() => handleSelectSession(session)}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-3 h-3 rounded-full ${
                    selectedSession?.id === session.id ? 'bg-blue-500' : 'bg-gray-400'
                  }`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {session.title || "Nouvelle conversation"}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-surface-400 truncate">
                          {new Date(session.created_at).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteSession(session.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity duration-200 p-1 ml-2"
                  title="Supprimer"
                >
                  <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-200 dark:bg-surface-200 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faPlus} className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 dark:text-surface-400 mb-2">
                Aucune conversation
              </p>
              <p className="text-xs text-gray-400 dark:text-surface-500">
                Créez votre première conversation !
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatSidebar
