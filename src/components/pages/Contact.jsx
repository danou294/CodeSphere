import React from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  MessageCircle, 
  Users, 
  Clock, 
  Heart,
  Send,
  Phone,
  MapPin,
  Globe,
  Zap,
  Code2
} from 'lucide-react'
import CTA from '../ui/CTA.jsx'

const ContactPage = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "contact@codesphere.fr",
      action: "mailto:contact@codesphere.fr",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageCircle,
      title: "Chat Support",
      description: "Support en ligne 24/7",
      action: "#",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Collaborations",
      description: "Partenariats et projets",
      action: "#",
      color: "from-purple-500 to-pink-500"
    }
  ]

  const features = [
    {
      icon: Zap,
      title: "Réponse Rapide",
      description: "Nous répondons généralement sous 48 heures"
    },
    {
      icon: Heart,
      title: "Support Personnalisé",
      description: "Une équipe dédiée à votre satisfaction"
    },
    {
      icon: Globe,
      title: "Disponible Partout",
      description: "Support multilingue et international"
    }
  ]

  return (
    <div className="min-h-screen animated-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 20,
              duration: 0.8 
            }}
            className="mb-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 0.2, 
                type: "spring", 
                stiffness: 200, 
                damping: 20 
              }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-accent-500 to-primary-500 rounded-3xl mb-8 shadow-2xl shadow-accent-500/25"
            >
              <MessageCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-surface-900 dark:text-white">
              Parlons de Votre Projet !
            </h1>
            <p className="text-xl md:text-2xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed">
              Nous sommes toujours ouverts à de nouvelles opportunités de
              collaboration et à explorer des propositions intéressantes.
            </p>
          </motion.div>

          {/* Subtle Floating Elements */}
          <motion.div
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 left-16 w-16 h-16 bg-gradient-to-br from-accent-400/10 to-primary-400/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute top-48 right-24 w-20 h-20 bg-gradient-to-br from-primary-400/10 to-accent-400/10 rounded-full blur-xl"
          />
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 20,
              duration: 0.8 
            }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-surface-900 dark:text-white">
              Comment Nous Contacter
            </h2>
            <p className="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              Choisissez la méthode qui vous convient le mieux
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 20,
                    duration: 0.6, 
                    delay: index * 0.1 
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -8,
                    transition: { type: "spring", stiffness: 200, damping: 25 }
                  }}
                  className="bg-white dark:bg-surface-800 rounded-3xl p-8 text-center group cursor-pointer shadow-xl shadow-surface-200/20 dark:shadow-black/40 border border-surface-200/50 dark:border-surface-700/50 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-surface-200/30 dark:hover:shadow-black/50"
                >
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-500 ease-out`}
                    animate={{ 
                      scale: [1, 1.02, 1],
                      boxShadow: [
                        "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
                        "0 20px 40px -3px rgba(0, 0, 0, 0.15)",
                        "0 10px 25px -3px rgba(0, 0, 0, 0.1)"
                      ]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-surface-900 dark:text-white">
                    {method.title}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 mb-4">
                    {method.description}
                  </p>
                  <a
                    href={method.action}
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 font-medium"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Contacter
                  </a>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-50 dark:bg-surface-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                duration: 0.8 
              }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-surface-900 dark:text-white">
                  Parlons de Votre Projet
                </h2>
                <p className="text-lg text-surface-700 dark:text-surface-300 leading-relaxed mb-6">
                  Que vous ayez une idée de projet, une question, ou une suggestion, n'hésitez
                  pas à nous contacter. Nous sommes prêts à discuter et à trouver des
                  solutions ensemble !
                </p>
              </div>

              <div className="bg-white dark:bg-surface-700 rounded-3xl p-6 shadow-xl shadow-surface-200/20 dark:shadow-black/40 border border-surface-200/50 dark:border-surface-600/50">
                <h3 className="text-xl font-semibold mb-4 text-surface-900 dark:text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                  Collaborations
                </h3>
                <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                  Nous apprécions les collaborations créatives et innovantes. Si vous avez une idée de projet, un
                  partenariat potentiel ou toute autre proposition, nous serions ravis
                  d'en discuter. Parlons de comment nous pouvons travailler ensemble
                  pour créer quelque chose de formidable !
                </p>
              </div>

              <div className="bg-white dark:bg-surface-700 rounded-3xl p-6 shadow-xl shadow-surface-200/20 dark:shadow-black/40 border border-surface-200/50 dark:border-surface-600/50">
                <h3 className="text-xl font-semibold mb-4 text-surface-900 dark:text-white flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                  Résiliation de Services
                </h3>
                <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                  Pour toute demande de résiliation de services, veuillez envoyer un e-mail à{' '}
                  <a 
                    href="mailto:contact@codesphere.fr" 
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline font-medium"
                  >
                    contact@codesphere.fr
                  </a>
                  . Assurez-vous d'inclure tous les détails nécessaires pour traiter
                  votre demande rapidement et efficacement.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Features & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                duration: 0.8, 
                delay: 0.2 
              }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Features */}
              <div className="bg-white dark:bg-surface-700 rounded-3xl p-6 shadow-xl shadow-surface-200/20 dark:shadow-black/40 border border-surface-200/50 dark:border-surface-600/50">
                <h3 className="text-xl font-semibold mb-6 text-surface-900 dark:text-white text-center">
                  Pourquoi Nous Choisir ?
                </h3>
                <div className="space-y-4">
                  {features.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 20,
                          duration: 0.6, 
                          delay: 0.4 + index * 0.1 
                        }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-surface-900 dark:text-white mb-1">
                            {feature.title}
                          </h4>
                          <p className="text-surface-600 dark:text-surface-400 text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
                
                {/* IDE Gratuit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 20,
                    duration: 0.6, 
                    delay: 0.8 
                  }}
                  viewport={{ once: true }}
                  className="mt-6 pt-6 border-t border-surface-200 dark:border-surface-600"
                >
                  <div className="text-center">
                    <p className="text-surface-600 dark:text-surface-400 mb-4 text-sm">
                      En attendant notre réponse, essayez notre IDE gratuit !
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.location.href = '/ide'}
                      className="btn-primary px-6 py-3 text-sm font-semibold group"
                    >
                      <Code2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Essayer l'IDE Gratuit
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Response Time */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 20,
                  duration: 0.6, 
                  delay: 0.6 
                }}
                viewport={{ once: true }}
                className="bg-white dark:bg-surface-700 rounded-3xl p-6 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 dark:border-primary-500/20 shadow-xl shadow-surface-200/20 dark:shadow-black/40"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl mb-4 shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-surface-900 dark:text-white">
                    Temps de Réponse
                  </h3>
                  <p className="text-surface-700 dark:text-surface-300">
                    Nous répondons généralement sous <strong className="text-primary-600 dark:text-primary-400">48 heures</strong>. 
                    Merci de votre patience !
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        title="Prêt à Collaborer ?"
        subtitle="Contactez-nous dès aujourd'hui et transformons vos idées en réalité"
        buttonText="Nous Écrire"
        buttonIcon={Mail}
        variant="contact"
        onClick={() => window.open('mailto:contact@codesphere.fr', '_blank')}
      />
    </div>
  )
}

export default ContactPage
