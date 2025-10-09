import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code2, 
  Eye, 
  Settings, 
  Download, 
  Share2, 
  FileText,
  Palette,
  Maximize2,
  Minimize2,
  RotateCcw,
  Zap,
  Sparkles,
  Crown,
  Bot,
  MessageCircle,
  X
} from 'lucide-react'
import Editor from '@monaco-editor/react'
import { useUserPremiumStatus } from '../../hooks/useUserPremiumStatus'

const ModernIDE = ({
  initialCode = {
    html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mon Projet Gratuit</title>\n</head>\n<body>\n  <h1>Bienvenue sur CodeSphere !</h1>\n  <p>Commencez à coder gratuitement dès maintenant.</p>\n  <div class="features">\n    <div class="feature">\n      <h3>🚀 Éditeur Monaco</h3>\n      <p>L\'éditeur de code le plus avancé</p>\n    </div>\n    <div class="feature">\n      <h3>👁️ Preview Temps Réel</h3>\n      <p>Voyez vos changements instantanément</p>\n    </div>\n    <div class="feature">\n      <h3>💾 Sauvegarde Locale</h3>\n      <p>Vos projets sont sauvegardés localement</p>\n    </div>\n  </div>\n</body>\n</html>',
    css: 'body {\n  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  min-height: 100vh;\n}\n\nh1 {\n  text-align: center;\n  margin-bottom: 30px;\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n  font-size: 2.5em;\n}\n\np {\n  text-align: center;\n  font-size: 18px;\n  margin-bottom: 40px;\n}\n\n.features {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  max-width: 800px;\n  margin: 0 auto;\n}\n\n.feature {\n  background: rgba(255, 255, 255, 0.1);\n  padding: 20px;\n  border-radius: 10px;\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  text-align: center;\n  transition: transform 0.3s ease;\n}\n\n.feature:hover {\n  transform: translateY(-5px);\n}\n\n.feature h3 {\n  margin: 0 0 10px 0;\n  font-size: 1.2em;\n}\n\n.feature p {\n  margin: 0;\n  font-size: 14px;\n  opacity: 0.9;\n}',
  },
  onSave,
  projectName = "🚀 Mon Projet CodeSphere",
  project,
  onContentChange
}) => {
  const { isPremium } = useUserPremiumStatus()
  const [activeTab, setActiveTab] = useState('html')
  const [code, setCode] = useState(initialCode)
  const [preview, setPreview] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [theme, setTheme] = useState('vs-dark')
  const [fontSize, setFontSize] = useState(14)
  const [autoSave, setAutoSave] = useState(() => {
    // Récupérer la préférence depuis localStorage, défaut à true
    const saved = localStorage.getItem('codesphere-autosave')
    return saved !== null ? JSON.parse(saved) : true
  })
  const [editorWidth, setEditorWidth] = useState(60)
  const [isResizing, setIsResizing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileView, setMobileView] = useState('code')
  const previewRef = useRef(null)

  const tabs = [
    { id: 'html', name: 'HTML', icon: FileText, color: 'from-orange-500 to-red-500' },
    { id: 'css', name: 'CSS', icon: Palette, color: 'from-blue-500 to-cyan-500' },
    { id: 'js', name: 'JavaScript', icon: Code2, color: 'from-yellow-500 to-orange-500' }
  ]

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setEditorWidth(100)
      } else {
        setEditorWidth(60)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Event listeners pour le redimensionnement (desktop uniquement)
  useEffect(() => {
    if (isMobile) return

    const handleGlobalMouseMove = (e) => {
      if (isResizing) {
        const container = document.querySelector('.ide-container')
        if (container) {
          const rect = container.getBoundingClientRect()
          const newWidth = ((e.clientX - rect.left) / rect.width) * 100
          if (newWidth >= 30 && newWidth <= 80) {
            setEditorWidth(newWidth)
          }
        }
      }
    }

    const handleGlobalMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isResizing, isMobile])

  useEffect(() => {
    updatePreview()
  }, [code])

  useEffect(() => {
    if (autoSave) {
      const timer = setTimeout(() => {
        localStorage.setItem('codesphere-project-gratuit', JSON.stringify(code))
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

  const handleCodeChange = (value, language) => {
    if (value !== undefined) {
      const newCode = {
        ...code,
        [language]: value
      }
      setCode(newCode)
      
      // Appeler le callback pour notifier les changements SEULEMENT si auto-sauvegarde activée
      if (onContentChange && autoSave) {
        onContentChange(language, value)
      } else if (!autoSave) {
      }
    }
  }

  const handleAutoSaveToggle = (checked) => {
    setAutoSave(checked)
    // Sauvegarder la préférence dans localStorage
    localStorage.setItem('codesphere-autosave', JSON.stringify(checked))
  }

  const handleSave = () => {
    if (onSave) {
      onSave(code)
    }
    
    // Sauvegarde locale de secours
    localStorage.setItem('codesphere-project-gratuit', JSON.stringify(code))
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
        text: 'Regardez ce projet créé avec CodeSphere gratuit !',
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
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

  const handleMouseDown = (e) => {
    if (!isMobile) {
      setIsResizing(true)
      e.preventDefault()
    }
  }

  return (
    <div className={`h-screen bg-surface-50 dark:bg-surface-950 flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 px-4 md:px-6 py-3 md:py-4 relative z-20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-3 h-3 md:w-5 md:h-5 text-white" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-lg md:text-xl font-bold gradient-text">{projectName}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs md:text-sm bg-gradient-to-r from-green-400 to-emerald-500 text-white px-2 py-1 rounded-full font-semibold shadow-sm">
                    ✨ GRATUIT
                  </span>
                  <span className="text-xs text-surface-500 dark:text-surface-400">
                    CodeSphere IDE
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-3 bg-white dark:bg-surface-900 p-1 md:p-2 rounded-lg border border-surface-200 dark:border-surface-700">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="btn-primary px-3 py-2 text-sm font-semibold flex items-center space-x-2"
              title="Sauvegarder manuellement"
            >
              <Zap className="w-4 h-4" />
              <span className="hidden md:inline">Sauvegarder</span>
            </motion.button>


            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFullscreen}
              className="btn-ghost p-2 text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100 hidden md:block"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(true)}
              className="btn-ghost p-2 text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100 hidden md:block"
            >
              <Settings className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Premium Banner - Masquée pour les utilisateurs premium */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 md:px-6 py-2 md:py-3 text-center relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2 text-white font-medium text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <Crown className="w-4 h-4" />
              <span>Version Gratuite : Éditeur + Preview</span>
            </div>
            <a 
              href="/premium-offer" 
              className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-orange-50 transition-colors"
            >
              Passer Premium
            </a>
          </div>
        </div>
      )}


      {/* Mobile Navigation Tabs */}
      {isMobile && (
        <div className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 relative z-10">
          <div className="flex">
            <motion.button
              onClick={() => setMobileView('code')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 ${
                mobileView === 'code'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                  : 'text-surface-600 dark:text-surface-400'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <Code2 className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs">Code</span>
            </motion.button>
            
            <motion.button
              onClick={() => setMobileView('preview')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 ${
                mobileView === 'preview'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                  : 'text-surface-600 dark:text-surface-400'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs">Preview</span>
            </motion.button>
            
            <motion.button
              onClick={() => setMobileView('settings')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 ${
                mobileView === 'settings'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                  : 'text-surface-600 dark:text-surface-400'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs">Réglages</span>
            </motion.button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex ide-container relative z-0">
        {/* Desktop Layout */}
        {!isMobile && (
          <>
            {/* Editor Section */}
            <div className="flex flex-col" style={{ width: `${editorWidth}%` }}>
              {/* Tabs */}
              <div className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
                <div className="flex">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-4 md:px-6 py-3 border-b-2 transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                            : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r ${tab.color} rounded p-0.5 md:p-1`}>
                          <Icon className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                        <span className="text-sm md:text-base font-medium">{tab.name}</span>
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
                    unfoldOnClickAfterEndOfLine: 2,
                    theme: theme
                  }}
                />
              </div>
            </div>

            {/* Resize Handle */}
            <div 
              className="w-1 bg-surface-300 dark:bg-surface-600 hover:bg-primary-500 dark:hover:bg-primary-400 cursor-col-resize transition-colors duration-200 relative group"
              onMouseDown={handleMouseDown}
            >
              <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/20 transition-colors duration-200" />
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500/0 group-hover:bg-primary-500/60 rounded-full transition-all duration-200" />
            </div>

            {/* Preview Section */}
            <div className="bg-white dark:bg-surface-900 border-l border-surface-200 dark:border-surface-700" style={{ width: `${100 - editorWidth}%` }}>
              <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-surface-200 dark:border-surface-700">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-surface-600" />
                  <span className="font-medium text-surface-900 dark:text-surface-100 text-sm md:text-base">Aperçu</span>
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
          </>
        )}

        {/* Mobile Layout */}
        {isMobile && (
          <div className="w-full">
            {/* Code View */}
            {mobileView === 'code' && (
              <div className="h-full">
                {/* Mobile Code Tabs */}
                <div className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
                  <div className="flex">
                    {tabs.map((tab) => {
                      const Icon = tab.icon
                      return (
                        <motion.button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex-1 flex items-center justify-center space-x-2 py-2 border-b-2 transition-all duration-200 ${
                            activeTab === tab.id
                              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                              : 'border-transparent text-surface-600 dark:text-surface-400'
                          }`}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className={`w-3 h-3 bg-gradient-to-r ${tab.color} rounded p-0.5`}>
                            <Icon className="w-2 h-2 text-white" />
                          </div>
                          <span className="text-xs font-medium">{tab.name}</span>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Mobile Editor */}
                <div className="h-full">
                  <Editor
                    height="100%"
                    language={activeTab}
                    theme={theme}
                    value={code[activeTab]}
                    onChange={(value) => handleCodeChange(value, activeTab)}
                    options={{
                      fontSize: Math.max(11, fontSize - 3),
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
                      unfoldOnClickAfterEndOfLine: 2,
                      theme: theme
                    }}
                  />
                </div>
              </div>
            )}

            {/* Preview View */}
            {mobileView === 'preview' && (
              <div className="h-full bg-white dark:bg-surface-900">
                <div className="flex items-center justify-between px-4 py-3 border-b border-surface-200 dark:border-surface-700">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-surface-600" />
                    <span className="font-medium text-surface-900 dark:text-surface-100 text-sm">Aperçu</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReset}
                      className="btn-ghost p-2 text-surface-600"
                      title="Réinitialiser"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDownload}
                      className="btn-ghost p-2 text-surface-600"
                      title="Télécharger"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShare}
                      className="btn-ghost p-2 text-surface-600"
                      title="Partager"
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                
                <div className="h-full">
                  <iframe
                    ref={previewRef}
                    srcDoc={preview}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                    title="Preview"
                  />
                </div>
              </div>
            )}

            {/* Settings View */}
            {mobileView === 'settings' && (
              <div className="h-full bg-white dark:bg-surface-900 p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4 md:mb-6 text-surface-900 dark:text-white">
                  Paramètres
                </h3>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Thème de l'éditeur
                    </label>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="input w-full"
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
                      min="8"
                      max="18"
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
                      onChange={(e) => handleAutoSaveToggle(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="autoSave" className="text-sm font-medium text-surface-700 dark:text-surface-300">
                      Sauvegarde automatique
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <motion.footer 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-700 px-4 md:px-6 py-2 relative z-10"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs md:text-sm text-surface-600 dark:text-surface-400 space-y-1 md:space-y-0">
          <div className="flex flex-wrap items-center space-x-2 md:space-x-4">
            <span>Langage: {activeTab.toUpperCase()}</span>
            <span>Taille: {fontSize}px</span>
            {!isMobile && <span>Éditeur: {Math.round(editorWidth)}%</span>}
            {isMobile && <span>Vue: {mobileView === 'code' ? 'Code' : mobileView === 'preview' ? 'Preview' : 'Réglages'}</span>}
            {autoSave && (
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-green-500" />
                <span>Auto-sauvegarde</span>
              </div>
            )}
            {!autoSave && (
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-gray-400" />
                <span className="text-gray-500">Auto-sauvegarde désactivée</span>
              </div>
            )}
            {!isPremium && <span className="text-green-600 font-medium">✓ Version Gratuite</span>}
            {isPremium && <span className="text-purple-600 font-medium">✓ Version Premium</span>}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-surface-500">
              CodeSphere IDE Gratuit • {isMobile ? 'Mobile' : 'Desktop'} • Éditeur + Preview
            </span>
            {!autoSave && (
              <span className="text-orange-500 font-medium">
                ⚠️ Auto-sauvegarde désactivée
              </span>
            )}
          </div>
        </div>
      </motion.footer>

      {/* Settings Modal Popup */}
      <AnimatePresence>
        {showSettings && (
          <div className="modal-overlay" onClick={() => setShowSettings(false)}>
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="modal-content bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 max-w-2xl w-[90vw] md:w-[600px]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-surface-200 dark:border-surface-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-surface-900 dark:text-white">Paramètres de l'IDE</h2>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowSettings(false)}
                  className="btn-ghost p-2 text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
                      Thème de l'éditeur
                    </label>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="input w-full"
                    >
                      <option value="vs-dark">Sombre</option>
                      <option value="vs-light">Clair</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
                      Taille de police
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="10"
                        max="24"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-surface-500">
                        <span>10px</span>
                        <span className="font-medium">{fontSize}px</span>
                        <span>24px</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-3 p-4 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
                      <input
                        type="checkbox"
                        id="autoSave"
                        checked={autoSave}
                        onChange={(e) => handleAutoSaveToggle(e.target.checked)}
                        className="rounded w-4 h-4"
                      />
                      <label htmlFor="autoSave" className="text-sm font-medium text-surface-700 dark:text-surface-300">
                        Sauvegarde automatique
                      </label>
                      {autoSave && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <Zap className="w-4 h-4" />
                          <span className="text-xs font-medium">Activée</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSettings(false)}
                  className="btn-secondary px-6 py-2"
                >
                  Fermer
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bouton Chatbot Flottant Permanent */}
      {!showChatbot && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowChatbot(true)}
          className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg transition-all duration-200 ${
            isPremium 
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-purple-500/25' 
              : 'bg-gray-400 text-white cursor-not-allowed opacity-60'
          }`}
          disabled={!isPremium}
          title={isPremium ? "Ouvrir l'Assistant IA" : "Accès Premium requis"}
        >
          <Bot className="w-6 h-6 mx-auto" />
          {isPremium && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
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
        </motion.button>
      )}

      {/* Chatbot Flottant */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-80 max-w-[calc(100vw-2rem)]"
          >
            <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-2xl border border-surface-200 dark:border-surface-700 overflow-hidden">
              {/* Header du Chatbot */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Assistant IA</h3>
                    <p className="text-white/80 text-xs">CodeSphere</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChatbot(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Contenu du Chatbot */}
              <div className="p-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <Bot className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-surface-700 dark:text-surface-300 mb-2">
                        Bonjour ! Je peux vous aider avec :
                      </p>
                      <ul className="text-xs text-surface-600 dark:text-surface-400 space-y-1">
                        <li>• Optimisation de code</li>
                        <li>• Correction d'erreurs</li>
                        <li>• Suggestions d'amélioration</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={() => window.open('/chat', '_blank')}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-2.5 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ouvrir le Chat Complet</span>
                  </button>
                  
                  <button
                    onClick={() => window.open('/premium-offer', '_blank')}
                    className="w-full border border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 py-2.5 px-4 rounded-lg font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
                  >
                    Passer Premium
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ModernIDE
