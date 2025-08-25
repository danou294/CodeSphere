import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react'
import { useState } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  variant = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true
}) => {
  useEffect(() => {
    if (closeOnEscape) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      
      if (isOpen) {
        document.addEventListener('keydown', handleEscape)
        document.body.style.overflow = 'hidden'
      }
      
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen, onClose, closeOnEscape])

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-md'
      case 'md':
        return 'max-w-lg'
      case 'lg':
        return 'max-w-2xl'
      case 'xl':
        return 'max-w-4xl'
      case 'full':
        return 'max-w-full mx-4'
      default:
        return 'max-w-lg'
    }
  }

  const getVariantIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />
      case 'error':
        return <XCircle className="w-6 h-6 text-red-500" />
      case 'info':
        return <Info className="w-6 h-6 text-blue-500" />
      default:
        return null
    }
  }

  const getVariantColors = () => {
    switch (variant) {
      case 'success':
        return 'border-green-200 dark:border-green-800'
      case 'warning':
        return 'border-yellow-200 dark:border-yellow-800'
      case 'error':
        return 'border-red-200 dark:border-red-800'
      case 'info':
        return 'border-blue-200 dark:border-blue-800'
      default:
        return 'border-surface-200 dark:border-surface-700'
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`${getSizeClasses()} w-full bg-white dark:bg-surface-900 rounded-2xl shadow-2xl border ${getVariantColors()} overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center space-x-3">
                {getVariantIcon()}
                {title && (
                  <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
                    {title}
                  </h2>
                )}
              </div>
              
              {showCloseButton && (
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors duration-200 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Composant de confirmation rapide
export const ConfirmModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'warning' | 'error'
}> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  variant = 'default'
}) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      variant={variant}
      showCloseButton={false}
      closeOnOverlayClick={false}
    >
      <div className="text-center">
        <p className="text-surface-600 dark:text-surface-400 mb-6">
          {message}
        </p>
        
        <div className="flex space-x-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="btn-secondary px-6 py-2"
          >
            {cancelText}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirm}
            className={`px-6 py-2 ${
              variant === 'error' 
                ? 'btn-danger' 
                : variant === 'warning'
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'btn-primary'
            }`}
          >
            {confirmText}
          </motion.button>
        </div>
      </div>
    </Modal>
  )
}

// Hook pour gérer les modals
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(!isOpen)

  return {
    isOpen,
    open,
    close,
    toggle
  }
}

export default Modal
