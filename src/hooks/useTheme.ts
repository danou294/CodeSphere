import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'light'
    }
    return 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const setThemeAndPersist = (newTheme: Theme) => {
    setTheme(newTheme)
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
    }
  }

  return {
    theme,
    setTheme: setThemeAndPersist,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  }
}
