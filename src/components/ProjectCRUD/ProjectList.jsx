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
      <div className="min-h-screen bg-white/95 dark:bg-surface-0/95 backdrop-blur-xl flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"
          />
          <p className="text-surface-600 dark:text-surface-400 text-lg">Chargement de vos projets...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white/95 dark:bg-surface-0/95 backdrop-blur-xl">
      <div className="container mx-auto p-6">
        {/* Header Section */}
                          <motion.div
           initial={{ opacity: 0, y: -15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ 
             duration: 0.4, 
             ease: [0.25, 0.46, 0.45, 0.94]
           }}
                       className="text-center mb-16"
         >
           <motion.div
             initial={{ scale: 0, rotate: -45 }}
             animate={{ scale: 1, rotate: 0 }}
             transition={{ 
               duration: 0.5, 
               ease: [0.34, 1.56, 0.64, 1]
             }}
             whileHover={{ 
               scale: 1.03, 
               rotate: 2,
               y: -2
             }}
             whileTap={{ scale: 0.99 }}
                           className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl mb-6 shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-50"
           >
             <FolderOpen className="w-10 h-10 text-white" />
           </motion.div>
           
           <motion.h1
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ 
               duration: 0.4, 
               ease: [0.25, 0.46, 0.45, 0.94],
               delay: 0.2
             }}
             className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-surface-900 to-surface-600 dark:from-white dark:to-surface-300 bg-clip-text text-transparent mb-4"
           >
             Mes Projets
           </motion.h1>
           
                       <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.4
              }}
              className="text-xl text-surface-600 dark:text-white max-w-2xl mx-auto"
            >
              Gérez et organisez tous vos projets de développement en un seul endroit
            </motion.p>
         </motion.div>

        {/* Controls Section */}
                                   <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.6
            }}
            whileHover={{ 
              scale: 1.002,
              y: -0.5
            }}
                         className="bg-white/95 dark:bg-surface-100/95 backdrop-blur-xl rounded-3xl shadow-md shadow-surface-200/30 dark:shadow-surface-800/20 border border-surface-200/50 dark:border-surface-700/50 p-6 mb-8 transition-all duration-50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
            {/* Search Bar */}
                         <div className="relative flex-1 max-w-md">
                               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-600 dark:text-surface-400" />
                               <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl text-surface-600 dark:text-surface-400 placeholder-surface-600 dark:placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-50"
                />
             </div>

            {/* Filter Dropdown */}
                         <div className="relative">
                               <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-600 dark:text-surface-400" />
                               <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-12 pr-8 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl text-surface-600 dark:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-50 appearance-none cursor-pointer"
                >
                <option value="all">Tous les projets</option>
                <option value="recent">Projets récents</option>
                <option value="old">Projets anciens</option>
              </select>
            </div>

            {/* View Mode Toggle */}
                         <div className="flex items-center space-x-2 bg-surface-100 dark:bg-surface-800 rounded-2xl p-1">
                             <motion.button
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 transition={{ duration: 0.03 }}
                 onClick={() => setViewMode('grid')}
                                                                       className={`p-2 rounded-xl transition-all duration-50 ${
                     viewMode === 'grid'
                       ? 'bg-primary-500 text-white shadow-lg'
                       : 'text-surface-600 dark:text-white hover:text-surface-900 dark:hover:text-white'
                   }`}
               >
                 <Grid3X3 className="w-5 h-5" />
               </motion.button>
               <motion.button
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 transition={{ duration: 0.03 }}
                 onClick={() => setViewMode('list')}
                                                                       className={`p-2 rounded-xl transition-all duration-50 ${
                     viewMode === 'list'
                       ? 'bg-primary-500 text-white shadow-lg'
                       : 'text-surface-600 dark:text-white hover:text-surface-900 dark:hover:text-white'
                   }`}
               >
                 <List className="w-5 h-5" />
               </motion.button>
            </div>

            {/* Create Project Button */}
                         <motion.div
               whileHover={{ scale: 1.01 }}
               whileTap={{ scale: 0.99 }}
               transition={{ duration: 0.03 }}
             >
               <Link to="/create-project">
                                                                       <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-sm shadow-primary-500/20 hover:shadow-md hover:shadow-primary-500/25 transition-all duration-50 flex items-center space-x-2">
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
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ 
               duration: 0.4, 
               ease: [0.25, 0.46, 0.45, 0.94],
               delay: 0.8
             }}
             className="text-center py-20"
           >
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.5
              }}
              whileHover={{ 
                scale: 1.08, 
                rotate: 8,
                y: -4
              }}
                             className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-surface-200 to-surface-300 dark:from-surface-700 dark:to-surface-600 rounded-3xl mb-6 shadow-sm hover:shadow-md transition-all duration-100"
            >
              <Code2 className="w-12 h-12 text-primary-600 dark:text-primary-400" />
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.6
              }}
              className="text-2xl font-bold text-surface-900 dark:text-white mb-4"
            >
              {searchTerm ? 'Aucun projet trouvé' : 'Aucun projet encore créé'}
            </motion.h3>
            
                         <motion.p
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ 
                 duration: 0.3, 
                 ease: [0.25, 0.46, 0.45, 0.94],
                 delay: 0.7
               }}
               className="text-slate-600 dark:text-white mb-8 max-w-md mx-auto"
             >
              {searchTerm 
                ? 'Essayez de modifier vos critères de recherche'
                : 'Commencez par créer votre premier projet de développement !'
              }
            </motion.p>
            
            <Link to="/create-project">
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.8
                }}
                whileHover={{ 
                  scale: 1.03,
                  y: -2
                }}
                whileTap={{ scale: 0.97 }}
                                 className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-100 flex items-center space-x-3 mx-auto"
              >
                <Plus className="w-6 h-6" />
                <span>Créer mon premier projet</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        ) : (
                     <motion.div
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ 
               duration: 0.4, 
               ease: [0.25, 0.46, 0.45, 0.94],
               delay: 0.8
             }}
             className={viewMode === 'grid' 
               ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
               : 'space-y-4'
             }
           >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                                     initial={{ opacity: 0, y: 15, scale: 0.98, rotateY: -4 }}
                   animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
                   exit={{ 
                     opacity: 0, 
                     y: -15, 
                     scale: 0.98, 
                     rotateY: 4,
                     transition: { duration: 0.05 }
                   }}
                   transition={{ 
                     delay: index * 0.1, 
                     duration: 0.3,
                     ease: [0.25, 0.46, 0.45, 0.94]
                   }}
                   whileHover={{ 
                     y: -3, 
                     scale: 1.01,
                     rotateY: 0.5,
                     transition: { duration: 0.05 }
                   }}
                   whileTap={{ scale: 0.995 }}
                                     className={`bg-white/95 dark:bg-surface-100/95 backdrop-blur-xl rounded-3xl shadow-md shadow-surface-200/30 dark:shadow-surface-800/20 border border-surface-200/50 dark:border-surface-700/50 overflow-hidden transition-all duration-50 hover:shadow-lg hover:shadow-surface-300/30 dark:hover:shadow-surface-700/20 ${
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
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                       transition={{ duration: 0.03 }}
                       onClick={() => handleEyeClick(project)}
                                               className="ml-4 p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors duration-50"
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
                         whileHover={{ scale: 1.01 }}
                         whileTap={{ scale: 0.99 }}
                         transition={{ duration: 0.03 }}
                         onClick={() => navigate(`/edit-project/${project.id}`)}
                                                   className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors duration-50"
                         title="Modifier"
                       >
                         <Edit3 className="w-4 h-4" />
                       </motion.button>
                       <motion.button
                         whileHover={{ scale: 1.01 }}
                         whileTap={{ scale: 0.99 }}
                         transition={{ duration: 0.03 }}
                         onClick={() => handleDelete(project.id)}
                         className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors duration-50"
                         title="Supprimer"
                       >
                         <Trash2 className="w-4 h-4" />
                       </motion.button>
                    </div>
                    
                                         <motion.button
                       whileHover={{ scale: 1.01, x: 2 }}
                       whileTap={{ scale: 0.99 }}
                       transition={{ duration: 0.03 }}
                       onClick={() => navigate(`/edit-project/${project.id}`)}
                                               className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center space-x-1 transition-colors duration-50"
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
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ 
               duration: 0.4, 
               ease: [0.25, 0.46, 0.45, 0.94],
               delay: 1.2
             }}
             className="text-center mt-8 text-surface-500 dark:text-white"
           >
                         <p className="text-sm text-surface-500 dark:text-white">
               {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} trouvé{filteredProjects.length > 1 ? 's' : ''}
               {searchTerm && ` pour "${searchTerm}"`}
             </p>
          </motion.div>
        )}
      </div>

             {/* Preview Popup */}
       <AnimatePresence>
         {isPopupVisible && selectedProject && (
           <>
             {/* Backdrop */}
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
               className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
               onClick={() => setPopupVisibility(false)}
             />
             
             {/* Popup */}
             <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ 
                 opacity: 0, 
                 scale: 0.9, 
                 y: 20,
                 transition: { duration: 0.1 }
               }}
               transition={{ 
                 duration: 0.2, 
                 ease: [0.25, 0.46, 0.45, 0.94]
               }}
                               className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-3xl shadow-2xl p-4 w-[95vw] max-w-5xl h-[95vh] max-h-[800px] z-50"
             >
                                                               <div className="flex items-center justify-between mb-2">
                                     <h4 className="font-semibold text-surface-900 dark:text-surface-100 text-base">
                     Aperçu: {selectedProject.title}
                   </h4>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.1 }}
                    onClick={() => setPopupVisibility(false)}
                    className="p-2 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-xl transition-all duration-200"
                  >
                    <span className="text-xl font-bold">×</span>
                  </motion.button>
                </div>
                                                                                                                                       <div className="w-full h-[calc(100%-3rem)] overflow-hidden rounded-2xl">
                    <iframe
                      className="w-full h-full border-none bg-transparent"
                      srcDoc={`
                        <!DOCTYPE html>
                        <html>
                          <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                              * {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                              }
                              
                              html, body {
                                width: 100%;
                                height: 100%;
                                margin: 0;
                                padding: 0;
                                background: transparent;
                              }
                              
                              body {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                min-height: 100vh;
                                background: transparent;
                              }
                              
                              .project-container {
                                width: 100%;
                                height: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                background: transparent;
                              }
                              
                              ${selectedProject.css || ''}
                            </style>
                          </head>
                          <body>
                            <div class="project-container">
                              ${selectedProject.html || ''}
                            </div>
                            <script>${selectedProject.js || ''}</script>
                          </body>
                        </html>
                      `}
                      sandbox="allow-scripts"
                      title="Preview"
                    />
                  </div>
             </motion.div>
           </>
         )}
       </AnimatePresence>
    </div>
  )
}

export default ProjectList
