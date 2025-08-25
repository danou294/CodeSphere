import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../Contexts/AuthContext.jsx'
import { firestore } from '../../firebaseConfig'
import { defaultProject } from '../../constants/defaultProject'
import { useProjectsStore } from '../../store'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { 
  Plus, 
  Edit3, 
  FileText, 
  Sparkles, 
  ArrowLeft,
  ArrowRight,
  Code2,
  FolderPlus
} from 'lucide-react'

function CreateProject() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [language, setLanguage] = useState('html')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const languages = [
    { value: 'html', label: 'HTML/CSS/JS', icon: '🌐' },
    { value: 'react', label: 'React', icon: '⚛️' },
    { value: 'vue', label: 'Vue.js', icon: '💚' },
    { value: 'angular', label: 'Angular', icon: '🅰️' },
    { value: 'node', label: 'Node.js', icon: '🟢' },
    { value: 'python', label: 'Python', icon: '🐍' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      toast.error('❌ Veuillez remplir tous les champs !')
      return
    }
    setLoading(true)
    try {
      const docRef = await addDoc(collection(firestore, 'projects'), {
        title,
        description,
        language,
        html: defaultProject.html,
        css: defaultProject.css,
        javascript: defaultProject.js,
        createdAt: serverTimestamp(),
        author: currentUser.uid,
        collaboration: [],
      })
      console.log('Document written with ID: ', docRef.id)
      toast.success('🎉 Projet créé avec succès !')
      navigate('/projectList')
    } catch (error) {
      console.error('Error adding document: ', error)
      toast.error("❌ Erreur lors de la création du projet : " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50 to-indigo-100 dark:from-surface-950 dark:via-blue-950 dark:to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl mb-6 shadow-xl shadow-primary-500/25"
          >
            <FolderPlus className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-surface-900 to-surface-600 dark:from-white dark:to-surface-300 bg-clip-text text-transparent mb-4">
            Créer un Projet
          </h1>
          <p className="text-xl text-surface-600 dark:text-surface-400">
            Donnez vie à vos idées de développement
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-surface-200/50 dark:shadow-black/50 border border-white/20 dark:border-surface-700/50 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-3">
                Nom du projet
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Edit3 className="w-5 h-5 text-surface-400" />
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Mon projet incroyable..."
                />
              </div>
            </motion.div>

            {/* Description Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-3">
                Description
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FileText className="w-5 h-5 text-surface-400" />
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows="4"
                  className="w-full pl-12 pr-4 py-4 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Décrivez votre projet..."
                />
              </div>
            </motion.div>

            {/* Language Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-3">
                Type de projet
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.value}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLanguage(lang.value)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 text-center ${
                      language === lang.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:border-primary-300 dark:hover:border-primary-600'
                    }`}
                  >
                    <div className="text-2xl mb-2">{lang.icon}</div>
                    <div className="text-sm font-medium">{lang.label}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Project Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="p-4 bg-gradient-to-r from-surface-50 to-blue-50 dark:from-surface-800 dark:to-blue-900/30 rounded-2xl border border-surface-200 dark:border-surface-700"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Sparkles className="w-5 h-5 text-primary-500" />
                <span className="font-semibold text-surface-700 dark:text-surface-300">
                  Aperçu du projet
                </span>
              </div>
              <div className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4" />
                  <span>Template de base inclus</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Éditeur Monaco intégré</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Preview en temps réel</span>
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Création en cours...</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Créer le projet</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-center mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/projectList')}
            className="text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white font-medium flex items-center space-x-2 mx-auto transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à la liste</span>
          </motion.button>
        </motion.div>
      </motion.div>
      <ToastContainer />
    </div>
  )
}

export default CreateProject
