import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Play, Share2, Code2 } from 'lucide-react'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../../../firebaseConfig'
import { useAuth } from '../../Contexts/AuthContext'
import { useProjectsStore, useTabsStore } from '../../../store'
import ModernIDE from '../../IDE/ModernIDE'
import LoadingSpinner from '../../ui/LoadingSpinner'
import { toast } from 'react-toastify'

const ModernEditProject = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { currentProject, setCurrentProject, updateProject } = useProjectsStore()
  const { setActiveTab, updateTabContent } = useTabsStore()
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const loadProject = async () => {
      if (!projectId || !currentUser) return

      try {
        const projectDoc = await getDoc(doc(firestore, 'projects', projectId))
        
        if (projectDoc.exists()) {
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
        console.error('Erreur lors du chargement du projet:', error)
        toast.error('Erreur lors du chargement du projet')
        navigate('/projectlist')
      } finally {
        setIsLoading(false)
      }
    }

    loadProject()
  }, [projectId, currentUser, setCurrentProject, updateTabContent, setActiveTab, navigate])

  const handleSave = async () => {
    if (!currentProject) return

    setIsSaving(true)
    try {
      // Ici vous pourriez ajouter la logique de sauvegarde Firebase
      // Pour l'instant, on utilise juste le store Zustand
      await updateProject(currentProject.id, {
        ...currentProject,
        updatedAt: new Date()
      })
      
      toast.success('Projet sauvegardé avec succès!')
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      toast.error('Erreur lors de la sauvegarde')
    } finally {
      setIsSaving(false)
    }
  }

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
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-primary"
              title="Sauvegarder"
            >
              {isSaving ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Sauvegarder
            </button>
            
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
          project={currentProject}
          onContentChange={(type, content) => {
            updateTabContent(type, content)
            updateProject(currentProject.id, { [type]: content })
          }}
        />
      </div>
    </div>
  )
}

export default ModernEditProject
