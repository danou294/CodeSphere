import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebaseConfig'

export interface Project {
  id: string
  name: string
  description?: string
  html: string
  css: string
  js: string
  createdAt: Date
  updatedAt: Date
  tags?: string[]
}

interface ProjectsState {
  projects: Project[]
  currentProject: Project | null
  isLoading: boolean
  
  // Actions
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>
  deleteProject: (id: string) => void
  setCurrentProject: (project: Project | null) => void
  loadProjects: () => void
  saveProject: (project: Project) => void
}

const defaultProject: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> = {
  name: 'Nouveau Projet',
  description: 'Un nouveau projet CodeSphere',
  html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mon Projet</title>\n</head>\n<body>\n  <h1>Bienvenue sur CodeSphere !</h1>\n  <p>Commencez à coder dès maintenant.</p>\n</body>\n</html>',
  css: 'body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  min-height: 100vh;\n}\n\nh1 {\n  text-align: center;\n  margin-bottom: 20px;\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n}\n\np {\n  text-align: center;\n  font-size: 18px;\n}',
  js: '// Votre JavaScript ici\nconsole.log("CodeSphere IDE est prêt !");',
  tags: ['nouveau', 'template']
}

export const useProjectsStore = create<ProjectsState>()(
  devtools(
    persist(
      (set, _get) => ({
        projects: [],
        currentProject: null,
        isLoading: false,

        createProject: (projectData) => {
          const newProject: Project = {
            ...defaultProject,
            ...projectData,
            id: `project-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          
          set((state) => ({
            projects: [...state.projects, newProject],
            currentProject: newProject
          }))
        },

        updateProject: async (id, updates) => {
          console.log('🔄 [STORE] updateProject appelé:', { id, updates })
          try {
            // Sauvegarder dans Firebase
            console.log('📡 [STORE] Tentative de sauvegarde Firebase...')
            const projectRef = doc(firestore, 'projects', id)
            console.log('📡 [STORE] Référence Firebase créée:', projectRef.path)
            
            await updateDoc(projectRef, {
              ...updates,
              updatedAt: new Date()
            })
            
            console.log('✅ [STORE] Projet mis à jour dans Firebase:', id)
            
            // Mettre à jour le store local
            set((state) => ({
              projects: state.projects.map(project =>
                project.id === id 
                  ? { ...project, ...updates, updatedAt: new Date() }
                  : project
              ),
              currentProject: state.currentProject?.id === id
                ? { ...state.currentProject, ...updates, updatedAt: new Date() }
                : state.currentProject
            }))
            
            console.log('✅ [STORE] Store local mis à jour')
          } catch (error) {
            console.error('❌ [STORE] Erreur lors de la mise à jour Firebase:', error)
            console.error('❌ [STORE] Détails de l\'erreur:', error.message)
            console.error('❌ [STORE] Code d\'erreur:', error.code)
            
            // Mettre à jour quand même le store local en cas d'erreur
            set((state) => ({
              projects: state.projects.map(project =>
                project.id === id 
                  ? { ...project, ...updates, updatedAt: new Date() }
                  : project
              ),
              currentProject: state.currentProject?.id === id
                ? { ...state.currentProject, ...updates, updatedAt: new Date() }
                : state.currentProject
            }))
            
            console.log('⚠️ [STORE] Store local mis à jour malgré l\'erreur Firebase')
          }
        },

        deleteProject: (id) => {
          set((state) => ({
            projects: state.projects.filter(project => project.id !== id),
            currentProject: state.currentProject?.id === id ? null : state.currentProject
          }))
        },

        setCurrentProject: (project) => {
          set({ currentProject: project })
        },

        loadProjects: () => {
          set({ isLoading: true })
          // Ici on pourrait charger depuis une API ou localStorage
          // Pour l'instant, on utilise la persistance Zustand
          set({ isLoading: false })
        },

        saveProject: (project) => {
          set((state) => ({
            projects: state.projects.map(p => 
              p.id === project.id ? project : p
            ),
            currentProject: project
          }))
        }
      }),
      {
        name: 'projects-storage',
        partialize: (state) => ({ 
          projects: state.projects,
          currentProject: state.currentProject 
        })
      }
    ),
    {
      name: 'projects-store'
    }
  )
)
