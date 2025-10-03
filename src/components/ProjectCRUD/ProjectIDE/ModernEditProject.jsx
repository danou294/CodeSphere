import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, Share2, Code2 } from 'lucide-react'
import { doc, getDoc } from 'firebase/firestore'
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

  console.log('🔍 [ModernEditProject] Rendu du composant')
  console.log('🔍 [ModernEditProject] URL actuelle:', window.location.href)
  console.log('🔍 [ModernEditProject] location.pathname:', location.pathname)
  console.log('🔍 [ModernEditProject] paramsProjectId:', paramsProjectId)
  console.log('🔍 [ModernEditProject] projectId final:', projectId)
  console.log('🔍 [ModernEditProject] useParams complet:', useParams())
  console.log('🔍 [ModernEditProject] currentUser:', currentUser)
  console.log('🔍 [ModernEditProject] currentProject:', currentProject)
  console.log('🔍 [ModernEditProject] isLoading:', isLoading)

  const loadProject = useCallback(async () => {
    console.log('🚀 [ModernEditProject] loadProject appelé')
    console.log('🚀 [ModernEditProject] projectId:', projectId)
    console.log('🚀 [ModernEditProject] currentUser:', currentUser)
    
    if (!projectId || !currentUser) {
      console.log('❌ [ModernEditProject] projectId ou currentUser manquant')
      return
    }

    try {
      console.log('📡 [ModernEditProject] Récupération du projet depuis Firestore...')
      const projectDoc = await getDoc(doc(firestore, 'projects', projectId))
      
      if (projectDoc.exists()) {
        console.log('✅ [ModernEditProject] Projet trouvé dans Firestore')
        const projectData = projectDoc.data()
        console.log('📊 [ModernEditProject] Données du projet:', projectData)
        
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
        
        console.log('🏗️ [ModernEditProject] Projet construit:', project)
        console.log('💾 [ModernEditProject] Appel de setCurrentProject...')
        setCurrentProject(project)
        
        console.log('📝 [ModernEditProject] Mise à jour des onglets...')
        // Mettre à jour les onglets avec le contenu du projet
        updateTabContent('html', project.html)
        updateTabContent('css', project.css)
        updateTabContent('js', project.js)
        setActiveTab('html')
        
        console.log('✅ [ModernEditProject] Projet chargé avec succès')
      } else {
        console.log('❌ [ModernEditProject] Projet non trouvé dans Firestore')
        toast.error('Projet non trouvé')
        navigate('/projectlist')
      }
    } catch (error) {
      console.error('❌ [ModernEditProject] Erreur lors du chargement du projet:', error)
      toast.error('Erreur lors du chargement du projet')
      navigate('/projectlist')
    } finally {
      console.log('🏁 [ModernEditProject] Fin du chargement, isLoading = false')
      setIsLoading(false)
    }
  }, [projectId, currentUser, setCurrentProject, updateTabContent, setActiveTab, navigate])

  useEffect(() => {
    console.log('🔄 [ModernEditProject] useEffect déclenché')
    loadProject()
  }, [loadProject])


  const handleBack = () => {
    navigate('/projectlist')
  }

  if (isLoading) {
    console.log('⏳ [ModernEditProject] Affichage du LoadingSpinner')
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement du projet..." />
      </div>
    )
  }

  if (!currentProject) {
    console.log('❌ [ModernEditProject] currentProject est null, affichage de l\'erreur')
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

  console.log('🎯 [ModernEditProject] Rendu de l\'éditeur avec le projet:', currentProject)
  
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
            console.log('🔄 [EDIT] Modification détectée:', { type, content: content.substring(0, 50) + '...' })
            try {
              await updateProject(currentProject.id, {
                ...currentProject,
                [type]: content,
                updatedAt: new Date()
              })
              console.log('✅ [EDIT] Projet mis à jour automatiquement')
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
