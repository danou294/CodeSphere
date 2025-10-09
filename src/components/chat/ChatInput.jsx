import React, { useState, useRef, useEffect } from 'react'
import { addMessage, createConversationWithMessage } from '../../services/chatService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../Contexts/AuthContext'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'
import '../../styles/chat.css'

const ChatInput = ({ sessionId, onNewMessage, onMessageSent, isNewConversation = false }) => {
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const textareaRef = useRef(null)
  const { currentUser } = useAuth()

  const handleSendMessage = async () => {
    if (message.trim() && !isSending) {
      const messageToSend = message.trim()
      setIsSending(true)
      setIsAnimating(true)
      
      // Délai pour l'animation de transition
      setTimeout(() => {
        onMessageSent?.(messageToSend) // Notifier que l'envoi commence avec le message
        setMessage('') // Vider l'input après l'animation
        setIsAnimating(false)
      }, 500) // 500ms pour l'animation
      
      try {
        const senderId = currentUser?.uid || 'anonymous'
        let response
        
        if (isNewConversation) {
          response = await createConversationWithMessage(currentUser.uid, messageToSend, senderId)
        } else {
          response = await addMessage(sessionId, messageToSend, senderId)
        }
        
        setMessage('')
        onNewMessage(response) // Mettre à jour l'état des messages après envoi
      } catch (error) {
        console.error('❌ [CHAT INPUT] Erreur lors de l\'envoi du message:', error)
        console.error('❌ [CHAT INPUT] Détails de l\'erreur:', error.response?.data)
        
        // Si la session n'existe plus, afficher un message spécifique
        if (error.response?.data?.error?.includes('No ChatSession matches')) {
          Swal.fire(
            'Conversation supprimée',
            'Cette conversation a été supprimée. Vous allez être redirigé vers la liste des conversations.',
            'warning'
          )
        } else {
          Swal.fire(
            'Erreur',
            "Impossible d'envoyer le message. Veuillez réessayer.",
            'error'
          )
        }
      } finally {
        setIsSending(false)
      }
    } else if (!message.trim()) {
      Swal.fire(
        'Erreur',
        'Le champ de message ne peut pas être vide.',
        'warning'
      )
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="relative">
      <motion.div 
        className="flex items-end gap-3 bg-white dark:bg-surface-100 rounded-2xl border border-gray-200 dark:border-surface-800 p-3 shadow-sm chat-input focus-within:border-gray-300 dark:focus-within:border-surface-600 focus-within:ring-0 focus-within:outline-none"
        animate={isAnimating ? {
          scale: 0.95,
          opacity: 0.7,
          y: -10
        } : {
          scale: 1,
          opacity: 1,
          y: 0
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tapez votre message..."
          className="flex-1 resize-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-none outline-none focus:outline-none focus:ring-0 focus:border-none text-sm leading-relaxed max-h-32 min-h-[24px]"
          rows={1}
          disabled={isSending}
        />
        <motion.button
          onClick={handleSendMessage}
          disabled={!message.trim() || isSending}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 send-button ${
            message.trim() && !isSending
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-200 dark:bg-surface-200 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={message.trim() && !isSending ? { scale: 1.05 } : {}}
          whileTap={message.trim() && !isSending ? { scale: 0.95 } : {}}
        >
          {isSending ? (
            <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
          )}
        </motion.button>
      </motion.div>
      
      {/* Indicateur de statut */}
      {isSending && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-8 left-0 text-xs text-gray-500 dark:text-gray-400"
        >
          Envoi en cours...
        </motion.div>
      )}
    </div>
  )
}

export default ChatInput
