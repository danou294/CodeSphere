import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, Share2, Code2 } from 'lucide-react'
import { firestore } from '../../../firebaseConfig'
import { useAuth } from '../../Contexts/AuthContext'
import { useProjectsStore, useTabsStore } from '../../../store'
import ModernIDE from '../../IDE/ModernIDE'
import LoadingSpinner from '../../ui/LoadingSpinner'
import { toast } from 'react-toastify'

const ModernEditProject = () => {
  const { projectId: paramsProjectId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { currentProject, setCurrentProject, updateProject } = useProjectsStore()
  const { setActiveTab, updateTabContent } = useTabsStore()
  
  // Fallback: extraire l'ID depuis l'URL si useParams ne fonctionne pas
  const projectId = paramsProjectId || location.pathname.split('/').pop()
  
  const [isLoading, setIsLoading] = useState(true)

  // Rendu du composant

  const loadProject = useCallback(async () => {
    
    if (!projectId || !currentUser) {
      return
    }

    try {
      const projectDoc = await firestore.collection('projects').doc(projectId).get()
      
      if (projectDoc.exists) {
        const projectData = projectDoc.data()
        
        const project = {
          id: projectDoc.id,
          name: projectData.name || 'Projet sans nom',
          description: projectData.description || '',
          html: projectData.html || '',
          css: projectData.css || '',
          js: projectData.js || '',
          createdAt: projectData.createdAt?.toDate() || new Date(),
          updatedAt: projectData.updatedAt?.toDate() || new Date(),
          tags: projectData.tags || []
        }
        
        setCurrentProject(project)
        
        // Mettre à jour les onglets avec le contenu du projet
        updateTabContent('html', project.html)
        updateTabContent('css', project.css)
        updateTabContent('js', project.js)
        setActiveTab('html')
        
      } else {
        toast.error('Projet non trouvé')
        navigate('/projectlist')
      }
    } catch (error) {
      console.error('❌ [ModernEditProject] Erreur lors du chargement du projet:', error)
      toast.error('Erreur lors du chargement du projet')
      navigate('/projectlist')
    } finally {
      setIsLoading(false)
    }
  }, [projectId, currentUser, setCurrentProject, updateTabContent, setActiveTab, navigate])

  useEffect(() => {
    loadProject()
  }, [loadProject])


  const handleBack = () => {
    navigate('/projectlist')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement du projet..." />
      </div>
    )
  }

  if (!currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
            Projet introuvable
          </h2>
          <button onClick={handleBack} className="btn-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </button>
        </div>
      </div>
    )
  }

  
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      {/* Header */}
      <motion.header 
        className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 px-6 py-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="btn-ghost p-2"
              title="Retour"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div>
              <h1 className="text-xl font-bold text-surface-900 dark:text-surface-100 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-primary-600" />
                {currentProject.name}
              </h1>
              {currentProject.description && (
                <p className="text-sm text-surface-600 dark:text-surface-400">
                  {currentProject.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="btn-secondary" title="Prévisualiser">
              <Play className="w-4 h-4 mr-2" />
              Aperçu
            </button>
            
            <button className="btn-ghost" title="Partager">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* IDE */}
      <div className="h-[calc(100vh-80px)]">
        <ModernIDE 
          initialCode={{
            html: currentProject.html || '',
            css: currentProject.css || '',
            js: currentProject.js || ''
          }}
          projectName={currentProject.name}
          onContentChange={async (type, content) => {
            // Mise à jour automatique du projet en temps réel
            try {
              await updateProject(currentProject.id, {
                ...currentProject,
                [type]: content,
                updatedAt: new Date()
              })
            } catch (error) {
              console.error('❌ [EDIT] Erreur lors de la mise à jour automatique:', error)
            }
          }}
          onSave={async (code) => {
            try {
              await updateProject(currentProject.id, {
                ...currentProject,
                html: code.html,
                css: code.css,
                js: code.js,
                updatedAt: new Date()
              })
              toast.success('Projet sauvegardé avec succès!')
            } catch (error) {
              console.error('Erreur lors de la sauvegarde:', error)
              toast.error('Erreur lors de la sauvegarde')
            }
          }}
        />
      </div>
    </div>
  )
}

export default ModernEditProject
