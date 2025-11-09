import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './Contexts/AuthContext.jsx'
import { toast } from 'react-toastify'
import { useUserPremiumStatus } from '../hooks/useUserPremiumStatus'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Crown,
  Home,
  Info,
  Contact,
  Plus
} from 'lucide-react'
import { SimpleThemeToggle } from './ui/ThemeToggle'

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const { isPremium, isLoading: premiumLoading } = useUserPremiumStatus()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Déconnexion réussie !')
      navigate('/')
      setIsMobileMenuOpen(false)
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error)
      toast.error('Erreur lors de la déconnexion : ' + error.message)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white/95 dark:bg-surface-0/95 backdrop-blur-xl border-b border-surface-200/50 dark:border-surface-800/50 sticky top-0 z-50 shadow-2xl shadow-surface-200/30 dark:shadow-black/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
          {/* Logo - Responsive */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="/Assets/logo.png" 
              alt="CodeSphere Logo" 
              className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 object-contain group-hover:scale-110 transition-transform"
            />
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-surface-700 dark:text-white group-hover:scale-105 transition-transform">
              CodeSphere
            </span>
          </Link>

          {/* Desktop Navigation - Optimisé pour lg+ */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link 
              to="/" 
              className="text-surface-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-300 transition-all duration-200 flex items-center space-x-2 group px-4 py-2 rounded-xl hover:bg-surface-100/50 dark:hover:bg-surface-800/30"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm xl:text-base">Accueil</span>
            </Link>
            <Link 
              to="/presentation" 
              className="text-surface-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-300 transition-all duration-200 flex items-center space-x-2 group px-4 py-2 rounded-xl hover:bg-surface-100/50 dark:hover:bg-surface-800/30"
            >
              <Info className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm xl:text-base">À Propos</span>
            </Link>
            <Link 
              to="/contact" 
              className="text-surface-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-300 transition-all duration-200 flex items-center space-x-2 group px-4 py-2 rounded-xl hover:bg-surface-100/50 dark:hover:bg-surface-800/30"
            >
              <Contact className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm xl:text-base">Contact</span>
            </Link>
            <Link 
              to="/premium-offer" 
              className="text-surface-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-300 transition-all duration-200 flex items-center space-x-2 group px-4 py-2 rounded-xl hover:bg-surface-100/50 dark:hover:bg-surface-800/30"
            >
              <Crown className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm xl:text-base">Premium</span>
            </Link>
          </div>

          {/* Right Side - Auth & Theme - Responsive */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Theme Toggle */}
            <div className="hidden sm:block">
              <SimpleThemeToggle />
            </div>
            
            {/* Auth Buttons - Responsive */}
            {currentUser ? (
              <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                {isPremium && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 lg:px-3 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium flex items-center space-x-1"
                  >
                    <Crown className="w-3 h-3 lg:w-3 lg:h-3" />
                    <span className="hidden xl:inline">Premium</span>
                  </motion.span>
                )}
                <Link
                  to="/projectlist"
                  className="btn-secondary px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm"
                >
                  <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                  <span className="hidden xl:inline">Mes Projets</span>
                  <span className="xl:hidden">Projets</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-danger px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm flex items-center space-x-1"
                >
                  <LogOut className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden xl:inline">Déconnexion</span>
                  <span className="xl:hidden">Déco</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                <Link
                  to="/login"
                  className="btn-secondary px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors duration-200"
                >
                  <User className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                  <span className="hidden xl:inline">Connexion</span>
                  <span className="xl:hidden">Connexion</span>
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm hover:bg-primary-700 transition-colors duration-200"
                >
                  <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                  <span className="hidden xl:inline">Inscription</span>
                  <span className="xl:hidden">Inscription</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button - Toujours visible sur mobile */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-surface-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-300 hover:bg-surface-100/50 dark:hover:bg-surface-800/50 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Amélioré avec animations fluides */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeInOut",
              height: { duration: 0.4, ease: "easeInOut" }
            }}
            className="md:hidden border-t border-surface-200/50 dark:border-surface-800/50 bg-white/95 dark:bg-surface-0/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-3">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="block text-surface-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-300 transition-all duration-200 py-3 px-4 rounded-xl hover:bg-surface-100/50 dark:hover:bg-surface-800/30 flex items-center space-x-3"
                >
                  <Home className="w-5 h-5" />
                  <span className="text-base font-medium">Accueil</span>
                </Link>
                <Link
                  to="/presentation"
                  onClick={closeMobileMenu}
                  className="block text-surface-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-300 transition-all duration-200 py-3 px-4 rounded-xl hover:bg-surface-100/50 dark:hover:bg-surface-800/30 flex items-center space-x-3"
                >
                  <Info className="w-5 h-5" />
                  <span className="text-base font-medium">À Propos</span>
                </Link>
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="block text-surface-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-300 transition-all duration-200 py-3 px-4 rounded-xl hover:bg-surface-100/50 dark:hover:bg-surface-800/30 flex items-center space-x-3"
                >
                  <Contact className="w-5 h-5" />
                  <span className="text-base font-medium">Contact</span>
                </Link>
                <Link
                  to="/premium-offer"
                  onClick={closeMobileMenu}
                  className="block text-surface-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-300 transition-all duration-200 py-3 px-4 rounded-xl hover:bg-surface-100/50 dark:hover:bg-surface-800/30 flex items-center space-x-3"
                >
                  <Crown className="w-5 h-5" />
                  <span className="text-base font-medium">Premium</span>
                </Link>
              </div>

              {/* Theme Toggle - Visible sur mobile */}
              <div className="sm:hidden pt-2 border-t border-surface-200/50 dark:border-surface-800/50">
                <div className="flex justify-center py-2">
                  <SimpleThemeToggle />
                </div>
              </div>
              
              {/* Auth Section */}
              {currentUser ? (
                <div className="space-y-4 pt-2 border-t border-surface-200/50 dark:border-surface-800/50">
                  {isPremium && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-3 rounded-xl text-center font-medium flex items-center justify-center space-x-2">
                      <Crown className="w-5 h-5" />
                      <span>💎 Premium</span>
                    </div>
                  )}
                  <Link
                    to="/projectlist"
                    onClick={closeMobileMenu}
                    className="block btn-secondary w-full text-center py-3 text-base font-medium"
                  >
                    <Plus className="w-5 h-5 inline mr-2" />
                    Mes Projets
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full btn-danger py-3 text-base font-medium flex items-center justify-center space-x-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-2 border-t border-surface-200/50 dark:border-surface-800/50">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block btn-secondary w-full text-center py-3 text-base font-medium hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors duration-200"
                  >
                    <User className="w-5 h-5 inline mr-2" />
                    Connexion
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="block btn-primary w-full text-center py-3 text-base font-medium hover:bg-primary-700 transition-colors duration-200"
                  >
                    <Plus className="w-5 h-5 inline mr-2" />
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
