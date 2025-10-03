import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TypingMessage = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 30) // Vitesse de frappe

      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, onComplete])

  return (
    <div className="whitespace-pre-wrap text-sm leading-relaxed">
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          className="inline-block w-0.5 h-4 bg-gray-600 dark:bg-gray-400 ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </div>
  )
}

export default TypingMessage
