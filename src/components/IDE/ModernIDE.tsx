import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code2, 
  Eye, 
  Settings, 
  Download, 
  Share2, 
  Play,
  Save,
  FileText,
  Palette,
  Maximize2,
  Minimize2,
  RotateCcw,
  Zap,
  Bot,
  MessageCircle
} from 'lucide-react'
import Editor from '@monaco-editor/react'
import { useUserPremiumStatus } from '../../hooks/useUserPremiumStatus'
import { useAuth } from '../Contexts/AuthContext'

interface ModernIDEProps {
  initialCode?: {
    html: string
    css: string
    js: string
  }
  onSave?: (code: { html: string; css: string; js: string }) => void
  onCodeChange?: (code: { html: string; css: string; js: string }) => void
  projectName?: string
}

const ModernIDE: React.FC<ModernIDEProps> = ({
  initialCode = {
    html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mon Projet</title>\n</head>\n<body>\n  <h1>Bienvenue sur CodeSphere !</h1>\n  <p>Commencez à coder dès maintenant.</p>\n</body>\n</html>',
    css: 'body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  min-height: 100vh;\n}\n\nh1 {\n  text-align: center;\n  margin-bottom: 20px;\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n}\n\np {\n  text-align: center;\n  font-size: 18px;\n}',
  },
  onSave,
  onCodeChange,
  projectName = "Nouveau Projet"
}) => {
  const { currentUser } = useAuth()
  const { isPremium } = useUserPremiumStatus()
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html')
  const [code, setCode] = useState(initialCode)
  const [preview, setPreview] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [theme, setTheme] = useState<'vs-dark' | 'vs-light'>('vs-dark')
  const [fontSize, setFontSize] = useState(14)
  const [autoSave, setAutoSave] = useState(() => {
    // Récupérer la préférence depuis localStorage, défaut à true
    const saved = localStorage.getItem('codesphere-autosave')
    return saved !== null ? JSON.parse(saved) : true
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const previewRef = useRef<HTMLIFrameElement>(null)

  const tabs = [
    { id: 'html', name: 'HTML', icon: FileText, color: 'from-orange-500 to-red-500' },
    { id: 'css', name: 'CSS', icon: Palette, color: 'from-blue-500 to-cyan-500' },
    { id: 'js', name: 'JavaScript', icon: Code2, color: 'from-yellow-500 to-orange-500' }
  ]

  useEffect(() => {
    updatePreview()
  }, [code])

  useEffect(() => {
    if (autoSave) {
      const timer = setTimeout(() => {
        handleSave()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [code, autoSave])

  const updatePreview = () => {
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${projectName}</title>
          <style>${code.css}</style>
        </head>
        <body>
          ${code.html}
          <script>${code.js}</script>
        </body>
      </html>
    `
    setPreview(fullHtml)
  }

  const handleCodeChange = (value: string | undefined, language: string) => {
    if (value !== undefined) {
      const newCode = {
        ...code,
        [language]: value
      }
      setCode(newCode)
      
      // Appeler le callback pour notifier les changements SEULEMENT si auto-sauvegarde activée
      if (onCodeChange && autoSave) {
        onCodeChange(newCode)
      } else if (!autoSave) {
      }
    }
  }

  const handleAutoSaveToggle = (checked: boolean) => {
    setAutoSave(checked)
    // Sauvegarder la préférence dans localStorage
    localStorage.setItem('codesphere-autosave', JSON.stringify(checked))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus('saving')
    
    try {
      if (onSave) {
        await onSave(code)
      }
      // Sauvegarde locale
      localStorage.setItem('codesphere-project', JSON.stringify(code))
      
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleRun = () => {
    updatePreview()
  }

  const handleReset = () => {
    setCode(initialCode)
  }

  const handleDownload = () => {
    const blob = new Blob([preview], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${projectName}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: projectName,
        text: 'Regardez ce projet créé avec CodeSphere !',
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // Afficher une notification
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className={`h-screen bg-surface-50 dark:bg-surface-950 flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">{projectName}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRun}
              className="btn-primary px-4 py-2 flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Exécuter</span>
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: saveStatus === 'saving' ? 1 : 1.05,
                boxShadow: saveStatus === 'saving' ? "0 4px 15px rgba(34, 197, 94, 0.2)" : "0 8px 25px rgba(34, 197, 94, 0.3)"
              }}
              whileTap={{ scale: saveStatus === 'saving' ? 1 : 0.95 }}
              onClick={handleSave}
              disabled={isSaving}
              className={`relative px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg transition-all duration-200 group overflow-hidden ${
                saveStatus === 'saving' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white cursor-not-allowed' 
                  : saveStatus === 'saved'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                  : saveStatus === 'error'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:shadow-xl'
              }`}
            >
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:translate-x-full transition-all duration-700 transform -skew-x-12"></div>
              
              {/* Icône avec animation */}
              <motion.div
                animate={saveStatus === 'saving' ? { 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                } : saveStatus === 'saved' ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                } : {
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: saveStatus === 'saving' ? 1 : 0.6,
                  repeat: saveStatus === 'saving' ? Infinity : 1,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                {saveStatus === 'saving' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Save className="w-5 h-5" />
                  </motion.div>
                ) : saveStatus === 'saved' ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✓
                  </motion.div>
                ) : saveStatus === 'error' ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✗
                  </motion.div>
                ) : (
                  <Save className="w-5 h-5" />
                )}
              </motion.div>
              
              {/* Texte avec effet de glissement */}
              <motion.span 
                className="relative z-10"
                initial={{ x: 0 }}
                whileHover={{ x: saveStatus === 'saving' ? 0 : 2 }}
                transition={{ duration: 0.2 }}
              >
                {saveStatus === 'saving' ? 'Sauvegarde...' : 
                 saveStatus === 'saved' ? 'Sauvegardé !' :
                 saveStatus === 'error' ? 'Erreur' : 'Sauvegarder'}
              </motion.span>
              
              {/* Indicateur de statut */}
              <motion.div
                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                  saveStatus === 'saving' ? 'bg-blue-400' :
                  saveStatus === 'saved' ? 'bg-green-400' :
                  saveStatus === 'error' ? 'bg-red-400' : 'bg-green-400'
                } opacity-0 group-hover:opacity-100`}
                animate={saveStatus === 'saving' ? { 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                } : saveStatus === 'saved' ? {
                  scale: [0, 1.5, 1],
                  opacity: [0, 1, 0]
                } : saveStatus === 'error' ? {
                  scale: [0, 1.5, 1],
                  opacity: [0, 1, 0]
                } : {
                  scale: [1, 1.2, 1],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: saveStatus === 'saving' ? 1 : 0.5,
                  repeat: saveStatus === 'saving' ? Infinity : 1,
                  ease: "easeInOut"
                }}
              />
            </motion.button>

            {/* Widget Chatbot */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => setShowChatbot(!showChatbot)}
                className={`px-4 py-2 flex items-center space-x-2 rounded-xl font-semibold transition-all duration-200 ${
                  isPremium 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed opacity-60'
                }`}
                disabled={!isPremium}
              >
                <Bot className="w-4 h-4" />
                <span>Chatbot IA</span>
                {isPremium && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </button>
              
              {/* Tooltip pour utilisateurs non premium */}
              {!isPremium && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  Accès Premium requis
                </div>
              )}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFullscreen}
              className="btn-ghost p-2"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(!showSettings)}
              className="btn-ghost p-2"
            >
              <Settings className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 px-6 py-4 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Thème de l'éditeur
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as 'vs-dark' | 'vs-light')}
                  className="input"
                >
                  <option value="vs-dark">Sombre</option>
                  <option value="vs-light">Clair</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Taille de police
                </label>
                <input
                  type="range"
                  min="10"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-surface-500">{fontSize}px</span>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoSave"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="autoSave" className="text-sm font-medium text-surface-700 dark:text-surface-300">
                  Sauvegarde automatique
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Panel */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 px-6 py-4 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                    Assistant IA CodeSphere
                  </h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Obtenez de l'aide pour votre code en temps réel
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-surface-700 dark:text-surface-300 mb-2">
                    Bonjour ! Je suis votre assistant IA pour le développement. Je peux vous aider avec :
                  </p>
                  <ul className="text-xs text-surface-600 dark:text-surface-400 space-y-1">
                    <li>• Optimisation de code</li>
                    <li>• Correction d'erreurs</li>
                    <li>• Suggestions d'amélioration</li>
                    <li>• Explications de concepts</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => window.open('/chat', '_blank')}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ouvrir le Chat</span>
              </button>
              <button
                onClick={() => window.open('/premium-offer', '_blank')}
                className="px-4 py-3 border border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 rounded-lg font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
              >
                Premium
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Editor Section */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'html' | 'css' | 'js')}
                    className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-5 h-5 bg-gradient-to-r ${tab.color} rounded p-1`}>
                      <Icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium">{tab.name}</span>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1">
            <Editor
              height="100%"
              language={activeTab}
              theme={theme}
              value={code[activeTab]}
              onChange={(value) => handleCodeChange(value, activeTab)}
              options={{
                fontSize,
                minimap: { enabled: false },
                wordWrap: 'on',
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                insertSpaces: true,
                folding: true,
                foldingStrategy: 'indentation',
                showFoldingControls: 'always',
                unfoldOnClickAfterEnd: 2,
                theme: theme
              }}
            />
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-1/2 bg-white dark:bg-surface-900 border-l border-surface-200 dark:border-surface-700">
          <div className="flex items-center justify-between px-4 py-3 border-b border-surface-200 dark:border-surface-700">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-surface-600" />
              <span className="font-medium text-surface-900 dark:text-surface-100">Aperçu</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="btn-ghost p-2 text-surface-600 hover:text-surface-900"
                title="Réinitialiser"
              >
                <RotateCcw className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="btn-ghost p-2 text-surface-600 hover:text-surface-900"
                title="Télécharger"
              >
                <Download className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="btn-ghost p-2 text-surface-600 hover:text-surface-900"
                title="Partager"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
          
          <div className="flex-1 h-full">
            <iframe
              ref={previewRef}
              srcDoc={preview}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
              title="Preview"
            />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <motion.footer 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-700 px-6 py-2"
      >
        <div className="flex items-center justify-between text-sm text-surface-600 dark:text-surface-400">
          <div className="flex items-center space-x-4">
            <span>Langage: {activeTab.toUpperCase()}</span>
            <span>Taille: {fontSize}px</span>
            {autoSave && (
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-green-500" />
                <span>Auto-sauvegarde</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {currentUser && (
              <span className="text-primary-600 dark:text-primary-400">
                Connecté en tant que {currentUser.email}
              </span>
            )}
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default ModernIDE
