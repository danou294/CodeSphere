import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { useAuth } from '../Contexts/AuthContext'
import { firestore } from '../../firebaseConfig'
import { 
  Edit3, 
  Trash2, 
  Plus, 
  Eye, 
  Code2, 
  Calendar,
  User,
  FolderOpen,
  Sparkles,
  ArrowRight,
  Search,
  Filter,
  Grid3X3,
  List
} from 'lucide-react'
import Swal from 'sweetalert2'

const ProjectList = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'recent', 'old'
  const { currentUser } = useAuth()
  const [selectedProject, setSelectedProject] = useState(null)
  const [isPopupVisible, setPopupVisibility] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProjects = async () => {
      if (currentUser) {
        try {
          const userProjectsCollection = collection(firestore, 'projects')
          const q = query(
            userProjectsCollection,
            where('author', '==', currentUser.uid)
          )
          const querySnapshot = await getDocs(q)
          const userProjectsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setProjects(userProjectsData)
        } catch (error) {
          console.error('Erreur lors de la récupération des projets :', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUserProjects()
  }, [currentUser])

  const handleDelete = async (projectId) => {
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
        await deleteDoc(doc(firestore, 'projects', projectId))
        setProjects(projects.filter((project) => project.id !== projectId))
        Swal.fire(
          'Supprimé',
          'Votre projet a été supprimé avec succès.',
          'success'
        )
      } catch (error) {
        console.error('Erreur lors de la suppression du projet :', error)
        Swal.fire('Erreur', 'Impossible de supprimer le projet.', 'error')
      }
    }
  }

  const handleEyeClick = (project) => {
    if (selectedProject === project && isPopupVisible) {
      setPopupVisibility(false)
      setSelectedProject(null)
    } else {
      setSelectedProject(project)
      setPopupVisibility(true)
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterStatus === 'recent') {
      return matchesSearch && project.createdAt && 
             new Date(project.createdAt.toDate()) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    } else if (filterStatus === 'old') {
      return matchesSearch && project.createdAt && 
             new Date(project.createdAt.toDate()) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    }
    
    return matchesSearch
  })

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Date inconnue'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50 to-indigo-100 dark:from-surface-950 dark:via-blue-950 dark:to-indigo-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"
          />
          <p className="text-surface-600 dark:text-surface-400 text-lg">Chargement de vos projets...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50 to-indigo-100 dark:from-surface-950 dark:via-blue-950 dark:to-indigo-900">
      <div className="container mx-auto p-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl mb-6 shadow-xl shadow-primary-500/25"
          >
            <FolderOpen className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-surface-900 to-surface-600 dark:from-white dark:to-surface-300 bg-clip-text text-transparent mb-4">
            Mes Projets
          </h1>
          <p className="text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Gérez et organisez tous vos projets de développement en un seul endroit
          </p>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-surface-200/50 dark:shadow-black/50 border border-white/20 dark:border-surface-700/50 p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-12 pr-8 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="all">Tous les projets</option>
                <option value="recent">Projets récents</option>
                <option value="old">Projets anciens</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-surface-100 dark:bg-surface-800 rounded-2xl p-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Create Project Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/create-project">
                <button className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-200 flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Nouveau Projet</span>
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Projects Section */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center py-20"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-surface-200 to-surface-300 dark:from-surface-700 dark:to-surface-600 rounded-3xl mb-6"
            >
              <Code2 className="w-12 h-12 text-surface-500 dark:text-surface-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">
              {searchTerm ? 'Aucun projet trouvé' : 'Aucun projet encore créé'}
            </h3>
            <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md mx-auto">
              {searchTerm 
                ? 'Essayez de modifier vos critères de recherche'
                : 'Commencez par créer votre premier projet de développement !'
              }
            </p>
            <Link to="/create-project">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-200 flex items-center space-x-3 mx-auto"
              >
                <Plus className="w-6 h-6" />
                <span>Créer mon premier projet</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-surface-200/50 dark:shadow-black/50 border border-white/20 dark:border-surface-700/50 overflow-hidden transition-all duration-300 ${
                    viewMode === 'list' ? 'p-6' : 'p-6'
                  }`}
                >
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2 line-clamp-2">
                        {project.title || 'Projet sans titre'}
                      </h3>
                      <p className="text-surface-600 dark:text-surface-400 text-sm line-clamp-2">
                        {project.description || 'Aucune description'}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEyeClick(project)}
                      className="ml-4 p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Project Meta */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-surface-500 dark:text-surface-400">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(project.createdAt)}</span>
                    </div>
                    {project.language && (
                      <div className="flex items-center space-x-2 text-sm text-surface-500 dark:text-surface-400">
                        <Code2 className="w-4 h-4" />
                        <span>{project.language}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/edit-project/${project.id}`)}
                        className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-xl hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors"
                        title="Modifier"
                      >
                        <Edit3 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(project.id)}
                        className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/edit-project/${project.id}`)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center space-x-1 transition-colors"
                    >
                      <span>Ouvrir</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Project Count */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center mt-8 text-surface-500 dark:text-surface-400"
          >
            <p className="text-sm">
              {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} trouvé{filteredProjects.length > 1 ? 's' : ''}
              {searchTerm && ` pour "${searchTerm}"`}
            </p>
          </motion.div>
        )}
      </div>

      {/* Preview Popup */}
      <AnimatePresence>
        {isPopupVisible && selectedProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-3xl shadow-2xl p-4 w-80 h-96 z-50"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-surface-900 dark:text-white text-sm">
                Aperçu: {selectedProject.title}
              </h4>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPopupVisibility(false)}
                className="p-1 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
              >
                <span className="text-lg">×</span>
              </motion.button>
            </div>
            <iframe
              className="w-full h-full border-none rounded-2xl"
              srcDoc={`
                <!DOCTYPE html>
                <html>
                  <head>
                    <style>${selectedProject.css || ''}</style>
                  </head>
                  <body>
                    ${selectedProject.html || ''}
                    <script>${selectedProject.js || ''}</script>
                  </body>
                </html>
              `}
              sandbox="allow-scripts"
              title="Preview"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProjectList
