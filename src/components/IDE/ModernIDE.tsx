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
  Zap
} from 'lucide-react'
import Editor from '@monaco-editor/react'
import { useAuth } from '../Contexts/AuthContext'

interface ModernIDEProps {
  initialCode?: {
    html: string
    css: string
    js: string
  }
  onSave?: (code: { html: string; css: string; js: string }) => void
  projectName?: string
}

const ModernIDE: React.FC<ModernIDEProps> = ({
  initialCode = {
    html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mon Projet</title>\n</head>\n<body>\n  <h1>Bienvenue sur CodeSphere !</h1>\n  <p>Commencez à coder dès maintenant.</p>\n</body>\n</html>',
    css: 'body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  min-height: 100vh;\n}\n\nh1 {\n  text-align: center;\n  margin-bottom: 20px;\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n}\n\np {\n  text-align: center;\n  font-size: 18px;\n}',
    js: '// Votre JavaScript ici\nconsole.log("CodeSphere IDE est prêt !");\n\n// Exemple d\'interactivité\ndocument.addEventListener("DOMContentLoaded", function() {\n  const h1 = document.querySelector("h1");\n  h1.addEventListener("click", function() {\n    this.style.transform = "scale(1.1)";\n    setTimeout(() => {\n      this.style.transform = "scale(1)";\n    }, 200);\n  });\n});'
  },
  onSave,
  projectName = "Nouveau Projet"
}) => {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html')
  const [code, setCode] = useState(initialCode)
  const [preview, setPreview] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [theme, setTheme] = useState<'vs-dark' | 'vs-light'>('vs-dark')
  const [fontSize, setFontSize] = useState(14)
  const [autoSave, setAutoSave] = useState(true)
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
      setCode(prev => ({
        ...prev,
        [language]: value
      }))
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave(code)
    }
    // Sauvegarde locale
    localStorage.setItem('codesphere-project', JSON.stringify(code))
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="btn-secondary px-4 py-2 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Sauvegarder</span>
            </motion.button>

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
