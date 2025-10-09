import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Code2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ModernIDE from '../../IDE/ModernIDE'

const EditProject = () => {
  const navigate = useNavigate()
  const [isLoading] = useState(false)

  const handleBack = () => {
    navigate('/projectlist')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
        <div className="w-8 h-8 border-4 border-t-4 border-primary-600 border-solid rounded-full animate-spin"></div>
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
                Éditeur de Projet
              </h1>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                Utilisez l'IDE moderne pour éditer votre projet
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* IDE */}
      <div className="h-[calc(100vh-80px)]">
        <ModernIDE 
          projectName="Nouveau Projet"
          onSave={(code) => {
            // Ici vous pouvez ajouter la logique de sauvegarde
          }}
        />
      </div>
    </div>
  )
}

export default EditProject
