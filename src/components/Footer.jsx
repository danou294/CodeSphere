import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Code2, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart,
  ArrowUp,
  ExternalLink
} from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "CodeSphere",
      links: [
        { name: "Accueil", href: "/" },
        { name: "À Propos", href: "/presentation" },
        { name: "Contact", href: "/contact" },
        { name: "Premium", href: "/premium-offer" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Aide", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Conditions", href: "/terms-and-conditions" },
        { name: "Statut", href: "#" }
      ]
    }
  ]

  const socialLinks = [
    { 
      name: "GitHub", 
      href: "https://github.com/danou294", 
      icon: Github,
      color: "hover:text-gray-700 dark:hover:text-gray-300"
    },
    { 
      name: "Twitter", 
      href: "https://twitter.com/danlev29", 
      icon: Twitter,
      color: "hover:text-blue-500 dark:hover:text-blue-400"
    },
    { 
      name: "LinkedIn", 
      href: "https://www.linkedin.com/in/daniellevy2904/", 
      icon: Linkedin,
      color: "hover:text-blue-600 dark:hover:text-blue-500"
    },
    { 
      name: "Email", 
      href: "mailto:danielevy29@gmail.com", 
      icon: Mail,
      color: "hover:text-red-500 dark:hover:text-red-400"
    }
  ]

  return (
    <footer className="bg-white dark:bg-surface-900 border-t border-surface-200/50 dark:border-surface-700/50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                duration: 0.6 
              }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Link to="/" className="flex items-center space-x-3 group">
                <img 
                  src="/Assets/logo.png" 
                  alt="CodeSphere Logo" 
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                />
                <span className="text-2xl font-bold text-black dark:text-black group-hover:scale-105 transition-transform">
                  CodeSphere
                </span>
              </Link>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                duration: 0.6,
                delay: 0.1
              }}
              viewport={{ once: true }}
              className="text-surface-600 dark:text-surface-400 mb-6 leading-relaxed max-w-md"
            >
              La plateforme de développement moderne qui transforme votre façon de coder. 
              Éditeur avancé, AI intelligent, et déploiement en un clic.
            </motion.p>

            {/* IDE Gratuit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                duration: 0.6,
                delay: 0.2
              }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Link
                to="/ide"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all duration-200 group"
              >
                <Code2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>IDE Gratuit</span>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                duration: 0.6,
                delay: 0.2
              }}
              viewport={{ once: true }}
              className="flex space-x-4"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-surface-100 dark:bg-surface-800 rounded-xl text-surface-600 dark:text-surface-400 transition-all duration-300 ${social.color} hover:bg-surface-200 dark:hover:bg-surface-700 hover:scale-110`}
                    whileHover={{ 
                      y: -2,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      transition: { type: "spring", stiffness: 400, damping: 20 }
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="sr-only">{social.name}</span>
                  </motion.a>
                )
              })}
            </motion.div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                duration: 0.6,
                delay: 0.1 + sectionIndex * 0.1
              }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-black dark:text-black mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 20,
                      duration: 0.4,
                      delay: 0.2 + sectionIndex * 0.1 + linkIndex * 0.05
                    }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={link.href}
                      className="text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                      {link.href.startsWith('http') && (
                        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-surface-200/50 dark:border-surface-700/50 bg-surface-50 dark:bg-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
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
              className="flex items-center space-x-2 text-surface-600 dark:text-surface-400 text-sm"
            >
              <span>© {currentYear} CodeSphere. Tous droits réservés.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Créé avec</span>
              <Heart className="w-4 h-4 text-red-500 inline" />
              <span className="hidden sm:inline">en France</span>
            </motion.div>

            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                duration: 0.6,
                delay: 0.4
              }}
              viewport={{ once: true }}
              className="p-3 bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-600 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group"
              whileHover={{ 
                y: -2,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { type: "spring", stiffness: 400, damping: 20 }
              }}
              title="Retour en haut"
            >
              <ArrowUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
