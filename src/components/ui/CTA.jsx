import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Star, Zap } from 'lucide-react'

const CTA = ({ 
  title, 
  subtitle, 
  buttonText, 
  buttonIcon = ArrowRight,
  variant = 'default',
  onClick,
  className = ''
}) => {
  const variants = {
    default: {
      background: 'from-surface-100 via-surface-50 to-surface-100 dark:from-surface-800 dark:via-surface-700 dark:to-surface-800',
      border: 'border-surface-200/50 dark:border-surface-600/50',
      buttonBg: 'from-primary-400 to-accent-400 hover:from-primary-500 hover:to-accent-500 dark:from-primary-500 dark:to-accent-500 dark:hover:from-primary-600 dark:hover:to-accent-600',
      accent: 'text-primary-600 dark:text-primary-400'
    },
    premium: {
      background: 'from-gradient-100 via-gradient-50 to-gradient-100 dark:from-gradient-900 dark:via-gradient-800 dark:to-gradient-900',
      border: 'border-gradient-200/50 dark:border-gradient-600/50',
      buttonBg: 'from-gradient-400 to-accent-400 hover:from-gradient-500 hover:to-accent-500 dark:from-gradient-500 dark:to-accent-500 dark:hover:from-gradient-600 dark:hover:to-accent-600',
      accent: 'text-gradient-600 dark:text-gradient-400'
    },
    contact: {
      background: 'from-contact-100 via-contact-50 to-contact-100 dark:from-contact-800 dark:via-contact-700 dark:to-contact-800',
      border: 'border-contact-200/50 dark:border-contact-600/50',
      buttonBg: 'from-contact-400 to-accent-400 hover:from-contact-500 hover:to-accent-500 dark:from-contact-500 dark:to-accent-500 dark:hover:from-contact-600 dark:hover:to-accent-600',
      accent: 'text-contact-600 dark:text-contact-400'
    }
  }

  const currentVariant = variants[variant]
  const ButtonIcon = buttonIcon

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 80, 
        damping: 25,
        duration: 0.8 
      }}
      viewport={{ once: true }}
      className={`relative overflow-hidden py-24 ${className}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br ${currentVariant.background}"></div>
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-3xl"
      />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 80, 
            damping: 25,
            duration: 0.8,
            delay: 0.2
          }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          {/* Accent Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 20,
              duration: 0.6,
              delay: 0.3
            }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/80 dark:bg-surface-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-surface-700/50 mb-8"
          >
            <Sparkles className={`w-8 h-8 ${currentVariant.accent}`} />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 80, 
              damping: 25,
              duration: 0.8,
              delay: 0.4
            }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-white mb-6 leading-tight"
          >
            {title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 80, 
              damping: 25,
              duration: 0.8,
              delay: 0.5
            }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-surface-600 dark:text-surface-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 80, 
              damping: 25,
              duration: 0.8,
              delay: 0.6
            }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={onClick}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r ${currentVariant.buttonBg} text-surface-900 hover:text-white dark:text-white font-semibold text-lg rounded-2xl shadow-2xl shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-500 overflow-hidden"
              whileHover={{ 
                y: -4,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { type: "spring", stiffness: 400, damping: 20 }
              }}
            >
              {/* Button Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Button Content */}
              <span className="relative z-10 flex items-center space-x-3">
                <span>{buttonText}</span>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <ButtonIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
              </span>

              {/* Button Border Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 80, 
            damping: 25,
            duration: 0.8,
            delay: 0.8
          }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center space-x-2"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default CTA
