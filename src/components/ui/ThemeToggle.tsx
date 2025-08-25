import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
      className="relative inline-flex items-center rounded-lg bg-surface-100 dark:bg-surface-100/10 p-1 border border-surface-200 dark:border-white/10"
    >
      {themes.map(({ value, icon: Icon, label }) => (
        <motion.button
          key={value}
          onClick={() => setTheme(value)}
          className={`relative p-2 rounded-md transition-all duration-200 ${
            theme === value
              ? 'text-primary-600 dark:text-primary-400 bg-white dark:bg-white/10 shadow-sm'
              : 'text-surface-700 dark:text-surface-100 hover:text-surface-900 dark:hover:text-white'
          }`}
          whileHover={{ y: -0.5 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
        >
          <Icon className="w-4 h-4" />
          <span className="sr-only">{label}</span>
          
          {theme === value && (
            <motion.div
              layoutId="activeTheme"
              className="absolute inset-0 rounded-md bg-primary-600/10 dark:bg-primary-500/15 border border-primary-600/15 dark:border-primary-500/20"
              initial={false}
              transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  )
}

export function SimpleThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative p-3 rounded-xl bg-surface-100 dark:bg-surface-100/10 text-surface-700 dark:text-white hover:text-surface-900 dark:hover:text-primary-300 transition-colors duration-200 border border-surface-200 dark:border-white/10 hover:border-surface-300 dark:hover:border-white/20 min-h-[44px] hover:bg-surface-200 dark:hover:bg-surface-100/20"
      whileHover={{ y: -0.5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
      >
        {isDark ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  )
}
