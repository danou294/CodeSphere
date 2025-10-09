import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ChatSidebar from './ChatSidebar'
import ChatInput from './ChatInput'
import ChatNotification from './ChatNotification'
import { listSessions, getMessages } from '../../services/chatService'
import { useAuth } from '../Contexts/AuthContext'
import { useUserPremiumStatus } from '../../hooks/useUserPremiumStatus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUser, faRobot, faSpinner, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import '../../styles/chat.css'

const ChatPanel = ({ participantId }) => {
  const { id: sessionId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { isPremium, isLoading: premiumLoading } = useUserPremiumStatus()
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  const [messages, setMessages] = useState([])
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false)
  const [notification, setNotification] = useState(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const messagesEndRef = useRef(null)
  const lastLoadedSessionRef = useRef(null)
  const [copiedCode, setCopiedCode] = useState(null)
  const [refreshSessions, setRefreshSessions] = useState(0)
  const [tempUserMessage, setTempUserMessage] = useState(null)

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

  // Recharger les sessions quand on revient de la création d'une conversation
  useEffect(() => {
    const handleFocus = () => {
      if (participantId) {
        const fetchSessions = async () => {
          try {
            const response = await listSessions(participantId)
            const sessionsData = response.sessions || []
            setSessions(sessionsData)
          } catch (error) {
            console.error('Erreur lors du rechargement des sessions:', error)
          }
        }
        fetchSessions()
      }
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [participantId])

  // Charger la session spécifique basée sur l'ID de l'URL
  useEffect(() => {
    if (sessionId && sessions.length > 0) {
      const session = sessions.find(s => s.id === parseInt(sessionId))
      if (session && lastLoadedSessionRef.current !== session.id) {
        setSelectedSession(session)
        lastLoadedSessionRef.current = session.id
        
        // Charger immédiatement les messages de cette session
      const fetchMessages = async () => {
          setIsLoadingMessages(true)
          try {
            const messagesData = await getMessages(session.id)
            setMessages(messagesData.messages || [])
        } catch (error) {
            console.error('❌ [CHAT PANEL] Erreur lors du chargement depuis URL:', error)
            // Si la session n'existe plus, rediriger vers la liste des conversations
            if (error.response?.data?.error?.includes('No ChatSession matches')) {
              showNotification('Cette conversation a été supprimée', 'warning')
              navigate('/chat')
            }
          } finally {
            setIsLoadingMessages(false)
          }
        }
        fetchMessages()
      }
    }
  }, [sessionId, sessions])

  // Supprimé ce useEffect car il entre en conflit avec le chargement depuis l'URL
  // Les messages sont maintenant chargés directement dans handleSelectSession et dans le useEffect de l'URL

  const handleSelectSession = async (session) => {
    
    // Éviter de recharger si c'est la même session
    if (lastLoadedSessionRef.current === session.id) {
      navigate(`/chat/${session.id}`)
      return
    }
    
    setSelectedSession(session)
    lastLoadedSessionRef.current = session.id
    navigate(`/chat/${session.id}`)
    
    // Charger immédiatement les messages de cette session
    setIsLoadingMessages(true)
    try {
      const messagesData = await getMessages(session.id)
      setMessages(messagesData.messages || [])
    } catch (error) {
      console.error('❌ [CHAT PANEL] Erreur lors du chargement immédiat des messages:', error)
      // Si la session n'existe plus, rediriger vers la liste des conversations
      if (error.response?.data?.error?.includes('No ChatSession matches')) {
        showNotification('Cette conversation a été supprimée', 'warning')
        navigate('/chat')
      }
    } finally {
      setIsLoadingMessages(false)
    }
  }

  const handleNewMessage = (response) => {
    setIsWaitingForResponse(false) // Arrêter l'attente
    setTempUserMessage(null) // Supprimer le message temporaire
    
    if (response && response.messages) {
      setMessages(response.messages)
      // Suppression de la notification de succès
    } else {
      showNotification('Erreur lors de la réception du message', 'error')
      // Recharger les messages si la réponse n'est pas dans le bon format
      if (selectedSession) {
        const fetchMessages = async () => {
          setIsLoadingMessages(true)
          try {
            const messagesData = await getMessages(selectedSession.id)
            setMessages(messagesData.messages || [])
          } catch (error) {
            console.error('❌ [CHAT PANEL] Erreur lors du rechargement:', error)
            // Si la session n'existe plus, rediriger vers la liste des conversations
            if (error.response?.data?.error?.includes('No ChatSession matches')) {
              showNotification('Cette conversation a été supprimée', 'warning')
              navigate('/chat')
            }
          } finally {
            setIsLoadingMessages(false)
          }
        }
        fetchMessages()
      }
    }
  }


  const handleMessageSent = (userMessage) => {
    setIsWaitingForResponse(true) // Commencer l'attente
    // Ajouter le message utilisateur temporairement
    setTempUserMessage({
      id: 'temp-' + Date.now(),
      content: userMessage,
      is_from_user: true,
      sender_id: currentUser?.uid,
      timestamp: new Date().toISOString()
    })
  }

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
  }

  const hideNotification = () => {
    setNotification(null)
  }

  // Scroll automatique vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isWaitingForResponse])

  const handleSubscribe = () => {
    window.location.href = '/premium-offer'
  }

  return (
    <div className="relative flex flex-col h-full bg-white dark:bg-surface-0 text-gray-900 dark:text-surface-900">
      {/* Overlay moderne pour les utilisateurs non payants */}
      {!premiumLoading && !isPremium && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-blue-900/80 to-purple-900/90 backdrop-blur-sm flex flex-col justify-center items-center z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            {/* Effet de brillance */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-75"></div>
            
            <div className="relative text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg border border-gray-200 dark:border-gray-700">
              {/* Icône premium */}
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <FontAwesomeIcon icon={faRobot} className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Accès Premium Requis
            </h2>
              
              <p className="mb-8 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Débloquez l'accès complet à notre <span className="font-semibold text-blue-600 dark:text-blue-400">chatbot intelligent</span> et profitez de fonctionnalités exclusives !
              </p>
              
              {/* Fonctionnalités premium */}
              <div className="mb-8 space-y-3">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Conversations illimitées avec l'IA</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Réponses rapides et précises</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Support Markdown et code</span>
                </div>
              </div>
              
            <button
              onClick={handleSubscribe}
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
      )}

      {/* Indicateur de chargement du statut premium */}
      {premiumLoading && (
        <div className="absolute inset-0 bg-white dark:bg-surface-0 flex flex-col justify-center items-center z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Vérification du statut premium...</p>
          </div>
        </div>
      )}

      {/* Header moderne */}
      <div className="border-b border-gray-200 dark:border-surface-800 bg-white dark:bg-surface-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/chat')}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Retour</span>
        </button>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <FontAwesomeIcon icon={faRobot} className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Assistant IA</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">CodeSphere</p>
              </div>
            </div>
            
            {/* Bouton pour basculer la sidebar sur mobile */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Interface ChatGPT Style avec Sidebar */}
      <div className="flex-1 flex bg-white dark:bg-surface-0 relative">
        {/* Overlay pour mobile */}
        {showSidebar && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setShowSidebar(false)}
          />
        )}
        {/* Zone des messages - Prend tout l'espace sauf la sidebar */}
        <div className="flex-1 overflow-y-auto chat-scroll">
          <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
            {isLoadingMessages ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-600 dark:text-gray-400">Chargement des messages...</span>
                </div>
              </div>
            ) : messages.length > 0 || tempUserMessage ? (
              [...messages, ...(tempUserMessage ? [tempUserMessage] : [])].map((message, index) => {
                const isTempMessage = typeof message.id === 'string' && message.id.startsWith('temp-')
                return (
                <motion.div
                  key={message.id || index}
                  initial={isTempMessage ? { 
                    opacity: 0, 
                    y: 50, 
                    scale: 0.8,
                    x: message.is_from_user ? 50 : -50
                  } : { opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    x: 0
                  }}
                  transition={{ 
                    duration: isTempMessage ? 0.6 : 0.3,
                    ease: isTempMessage ? "easeOut" : "easeInOut"
                  }}
                  className={`flex gap-4 ${message.is_from_user ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.is_from_user ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.is_from_user 
                        ? 'bg-blue-500 text-white' 
                        : 'avatar-gradient text-white'
                    }`}>
                      <FontAwesomeIcon 
                        icon={message.is_from_user ? faUser : faRobot} 
                        className="w-4 h-4" 
          />
        </div>

                    {/* Message */}
                    <div className={`rounded-2xl px-4 py-3 message-glow ${
                      message.is_from_user 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white border dark:border-slate-600'
                    }`}>
                      {message.is_from_user ? (
                        <div className="whitespace-pre-wrap text-sm leading-relaxed text-white">
                          {message.content}
                        </div>
                      ) : (
                        <div className="text-sm leading-relaxed prose prose-sm max-w-none text-gray-900 dark:text-white [&>*]:text-gray-900 dark:[&>*]:text-white">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              // Style personnalisé pour les éléments Markdown
                              code: ({node, inline, className, children, ...props}) => {
                                const match = /language-(\w+)/.exec(className || '')
                                const language = match ? match[1] : ''
                                
                                return !inline && language ? (
                                  <div className="relative my-2">
                                    <div className="flex justify-between items-center bg-gray-800 text-gray-300 px-3 py-2 rounded-t-lg text-xs">
                                      <span className="font-medium">{language}</span>
                                      <button
                                        onClick={async () => {
                                          try {
                                            const codeText = String(children).replace(/\n$/, '')
                                            await navigator.clipboard.writeText(codeText)
                                            setCopiedCode(codeText)
                                            showNotification('Code copié dans le presse-papiers !', 'success')
                                            // Réinitialiser après 2 secondes
                                            setTimeout(() => setCopiedCode(null), 2000)
                                          } catch (err) {
                                            console.error('Erreur lors de la copie:', err)
                                            showNotification('Erreur lors de la copie', 'error')
                                          }
                                        }}
                                        className="hover:text-white transition-colors flex items-center gap-1"
                                        title="Copier le code"
                                      >
                                        {copiedCode === String(children).replace(/\n$/, '') ? (
                                          <>
                                            <FontAwesomeIcon icon={faSquareCheck} className="w-3 h-3 text-green-400" />
                                            <span className="text-xs">Copié</span>
                                          </>
                                        ) : (
                                          <>
                                            <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />
                                            <span className="text-xs">Copier</span>
                                          </>
                                        )}
                                      </button>
                                    </div>
                                    <SyntaxHighlighter
                                      style={oneDark}
                                      language={language}
                                      PreTag="div"
                                      className="rounded-b-lg"
                                      customStyle={{
                                        margin: 0,
                                        fontSize: '0.875rem',
                                        lineHeight: '1.5',
                                        borderRadius: '0 0 0.5rem 0.5rem'
                                      }}
                                      {...props}
                                    >
                                      {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                  </div>
                                ) : (
                                  <code className="bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded text-xs font-mono text-gray-900 dark:text-white" {...props}>
                                    {children}
                                  </code>
                                )
                              },
                              pre: ({children}) => {
                                // Si c'est déjà un SyntaxHighlighter, ne pas wrapper
                                if (children && children.props && children.props.className?.includes('language-')) {
                                  return children
                                }
                                
                                // Si c'est un bloc de code sans langage spécifique, ajouter un bouton de copie
                                const codeText = children?.props?.children || children
                                if (codeText && typeof codeText === 'string' && codeText.length > 10) {
                                  return (
                                    <div className="relative my-2">
                                      <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white px-3 py-2 rounded-t-lg text-xs">
                                        <span className="font-medium">Code</span>
                                        <button
                                          onClick={async () => {
                                            try {
                                              await navigator.clipboard.writeText(codeText)
                                              setCopiedCode(codeText)
                                              showNotification('Code copié dans le presse-papiers !', 'success')
                                              setTimeout(() => setCopiedCode(null), 2000)
                                            } catch (err) {
                                              console.error('Erreur lors de la copie:', err)
                                              showNotification('Erreur lors de la copie', 'error')
                                            }
                                          }}
                                          className="hover:text-gray-900 dark:hover:text-surface-200 transition-colors flex items-center gap-1"
                                          title="Copier le code"
                                        >
                                          {copiedCode === codeText ? (
                                            <>
                                              <FontAwesomeIcon icon={faSquareCheck} className="w-3 h-3 text-green-500" />
                                              <span className="text-xs">Copié</span>
                                            </>
                                          ) : (
                                            <>
                                              <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />
                                              <span className="text-xs">Copier</span>
                                            </>
                                          )}
                                        </button>
                                      </div>
                                      <pre className="bg-gray-200 dark:bg-gray-600 p-3 rounded-b-lg overflow-x-auto text-gray-900 dark:text-white">
                                        {children}
                                      </pre>
                                    </div>
                                  )
                                }
                                
                                return (
                                  <pre className="bg-gray-200 dark:bg-gray-600 p-3 rounded-lg overflow-x-auto my-2 text-gray-900 dark:text-white">
                                    {children}
                                  </pre>
                                )
                              },
                              blockquote: ({children}) => (
                                <blockquote className="border-l-4 border-blue-500 pl-4 italic my-2 text-gray-600 dark:text-gray-300">
                                  {children}
                                </blockquote>
                              ),
                              ul: ({children}) => (
                                <ul className="list-disc list-inside my-2 space-y-1">
                                  {children}
                                </ul>
                              ),
                              ol: ({children}) => (
                                <ol className="list-decimal list-inside my-2 space-y-1">
                                  {children}
                                </ol>
                              ),
                              h1: ({children}) => (
                                <h1 className="text-lg font-bold my-2 text-gray-900 dark:text-white">
                                  {children}
                                </h1>
                              ),
                              h2: ({children}) => (
                                <h2 className="text-base font-bold my-2 text-gray-900 dark:text-white">
                                  {children}
                                </h2>
                              ),
                              h3: ({children}) => (
                                <h3 className="text-sm font-bold my-2 text-gray-900 dark:text-white">
                                  {children}
                                </h3>
                              ),
                              p: ({children}) => (
                                <p className="my-2">
                                  {children}
                                </p>
                              ),
                              strong: ({children}) => (
                                <strong className="font-semibold text-gray-900 dark:text-white">
                                  {children}
                                </strong>
                              ),
                              em: ({children}) => (
                                <em className="italic text-gray-700 dark:text-surface-300">
                                  {children}
                                </em>
                              ),
                              a: ({href, children}) => (
                                <a 
                                  href={href} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:text-blue-600 underline"
                                >
                                  {children}
                                </a>
                              ),
                              table: ({children}) => (
                                <div className="overflow-x-auto my-2">
                                  <table className="min-w-full border border-gray-300 dark:border-surface-600">
                                    {children}
                                  </table>
                                </div>
                              ),
                              th: ({children}) => (
                                <th className="border border-gray-300 dark:border-surface-600 px-3 py-2 bg-gray-100 dark:bg-surface-300 font-semibold text-left text-gray-900 dark:text-white">
                                  {children}
                                </th>
                              ),
                              td: ({children}) => (
                                <td className="border border-gray-300 dark:border-surface-600 px-3 py-2 text-gray-900 dark:text-white">
                                  {children}
                                </td>
                              )
                            }}
              >
                {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
              </div>
                </motion.div>
                )
              })
          ) : selectedSession ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-surface-200 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faRobot} className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Commencez une conversation
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Posez votre première question à l'assistant IA
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-surface-200 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faRobot} className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Sélectionnez une conversation
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choisissez une conversation existante ou créez-en une nouvelle
                  </p>
                </div>
              </div>
            )}


            {/* Indicateur d'attente de réponse sophistiqué */}
            <AnimatePresence>
              {(isWaitingForResponse || tempUserMessage) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <FontAwesomeIcon icon={faRobot} className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-200 dark:bg-surface-200 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-900 dark:text-white font-medium">Assistant IA réfléchit</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full typing-dot" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full typing-dot" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full typing-dot" />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 dark:text-surface-400">
                      Génération de la réponse en cours...
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Référence pour le scroll automatique */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Sidebar des conversations - Verticale à droite */}
        <div className={`${showSidebar ? 'flex' : 'hidden'} lg:flex w-80 border-l border-gray-200 dark:border-surface-800 bg-gray-50 dark:bg-surface-100 flex-col fixed lg:relative top-0 right-0 h-full z-40`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Conversations</h3>
            <button
              onClick={() => setShowSidebar(false)}
              className="lg:hidden w-8 h-8 rounded-full bg-gray-200 dark:bg-surface-300 flex items-center justify-center text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-surface-200 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ChatSidebar
              sessions={sessions}
              selectedSession={selectedSession}
              onSelectSession={(session) => {
                handleSelectSession(session)
                setShowSidebar(false) // Fermer la sidebar sur mobile après sélection
              }}
              participantId={participantId}
            />
          </div>
        </div>
      </div>

      {/* Input moderne pour envoyer de nouveaux messages */}
      {selectedSession && (
        <div className="border-t border-gray-200 dark:border-surface-800 bg-white dark:bg-surface-0">
          <div className="px-4 py-4">
          <ChatInput
            sessionId={selectedSession.id}
              onNewMessage={handleNewMessage}
              onMessageSent={handleMessageSent}
          />
          </div>
        </div>
      )}

      {/* Notification */}
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

export default ChatPanel
