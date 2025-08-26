
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Play, Download } from 'lucide-react'

const ButtonShowcase = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 gradient-text tracking-tight">Styles de Boutons Apple</h2>
        <p className="text-surface-700 dark:text-surface-100">
          Trois styles principaux : Filled, Tinted, et Plain
        </p>
      </div>

      {/* Filled Buttons (CTA principal) */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-surface-950 dark:text-white tracking-tight">Filled - CTA Principal</h3>
        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ y: -0.5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
            className="btn-primary px-6 py-3"
          >
            Commencer Maintenant
          </motion.button>
          
          <motion.button
            whileHover={{ y: -0.5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
            className="btn-primary px-6 py-3"
          >
            <Play className="w-4 h-4 mr-2" />
            Lancer
          </motion.button>
          
          <motion.button
            whileHover={{ y: -0.5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
            className="btn-primary px-6 py-3"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Continuer
          </motion.button>
        </div>
      </div>

      {/* Tinted Buttons (secondaire, fond discret) */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-surface-950 dark:text-white tracking-tight">Tinted - Secondaire</h3>
        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ y: -0.5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
            className="btn-secondary px-6 py-3"
          >
            En savoir plus
          </motion.button>
          
          <motion.button
            whileHover={{ y: -0.5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
            className="btn-secondary px-6 py-3"
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger
          </motion.button>
          
          <motion.button
            whileHover={{ y: -0.5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
            className="btn-secondary px-6 py-3"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Découvrir
          </motion.button>
        </div>
      </div>

      {/* Plain Buttons (texte seul) */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-surface-950 dark:text-white tracking-tight">Plain - Texte Seul</h3>
        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ y: -0.5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
            className="btn-ghost px-6 py-3"
          >
            Annuler
          </motion.button>
          
          <motion.button
            whileHover={{ y: -0.5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
            className="btn-ghost px-6 py-3"
          >
            Modifier
          </motion.button>
          
          <motion.button
            whileHover={{ y: -0.5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
            className="btn-ghost px-6 py-3"
          >
            Supprimer
          </motion.button>
        </div>
      </div>

      {/* Danger Button */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-surface-950 dark:text-white tracking-tight">Danger</h3>
        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ y: -0.5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
            className="btn-danger px-6 py-3"
          >
            Supprimer définitivement
          </motion.button>
        </div>
      </div>

      {/* Badges */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-surface-950 dark:text-white tracking-tight">Badges Apple-style</h3>
        <div className="flex flex-wrap gap-4">
          <span className="badge-primary">Primary</span>
          <span className="badge-success">Success</span>
          <span className="badge-warning">Warning</span>
          <span className="badge-error">Error</span>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-surface-950 dark:text-white tracking-tight">Cards Apple-style</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <h4 className="font-semibold mb-2 text-surface-950 dark:text-white tracking-tight">Card Simple</h4>
            <p className="text-surface-600 dark:text-surface-200 text-sm">
              Une carte avec des bordures subtiles et des ombres légères.
            </p>
          </div>
          
          <div className="card p-6">
            <h4 className="font-semibold mb-2 text-surface-950 dark:text-white tracking-tight">Card Interactive</h4>
            <p className="text-surface-600 dark:text-surface-200 text-sm">
              Hover pour voir l'effet de transition douce.
            </p>
          </div>
          
          <div className="card p-6">
            <h4 className="font-semibold mb-2 text-surface-950 dark:text-white tracking-tight">Card Glass</h4>
            <p className="text-surface-600 dark:text-surface-200 text-sm">
              Effet de verre avec backdrop-blur.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ButtonShowcase
