import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Sparkles, Zap } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  variant?: 'default' | 'pulse' | 'bounce' | 'wave'
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text = 'Chargement...',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const renderSpinner = () => {
    switch (variant) {
      case 'pulse':
        return (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className={`${sizeClasses[size]} bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center`}
          >
            <Code2 className="w-1/2 h-1/2 text-white" />
          </motion.div>
        )

      case 'bounce':
        return (
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className={`${sizeClasses[size]} bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center`}
          >
            <Sparkles className="w-1/2 h-1/2 text-white" />
          </motion.div>
        )

      case 'wave':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                className="w-3 h-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
              />
            ))}
          </div>
        )

      default:
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className={`${sizeClasses[size]} border-4 border-surface-200 dark:border-surface-700 border-t-primary-500 rounded-full`}
          />
        )
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderSpinner()}
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`${textSizes[size]} text-surface-600 dark:text-surface-400 text-center`}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

// Composant de chargement plein écran
export const FullScreenLoader: React.FC<{ text?: string }> = ({ text }) => (
  <div className="fixed inset-0 bg-white dark:bg-surface-950 flex items-center justify-center z-50">
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <Code2 className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold gradient-text mb-2">CodeSphere</h2>
        <p className="text-surface-600 dark:text-surface-400">Chargement en cours...</p>
      </motion.div>
      
      <LoadingSpinner size="lg" text={text} variant="pulse" />
    </div>
  </div>
)

// Composant de chargement de page
export const PageLoader: React.FC<{ text?: string }> = ({ text }) => (
  <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex items-center justify-center">
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Zap className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
          {text || 'Chargement...'}
        </h3>
      </motion.div>
      
      <LoadingSpinner size="md" variant="bounce" />
    </div>
  </div>
)

// Composant de chargement de bouton
export const ButtonLoader: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center space-x-2"
  >
    <div className={`animate-spin rounded-full border-2 border-white border-t-transparent ${
      size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
    }`} />
    <span>Chargement...</span>
  </motion.div>
)

export default LoadingSpinner
