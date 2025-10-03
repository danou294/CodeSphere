// Presentation.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Code2, 
  Users, 
  Rocket, 
  Lightbulb, 
  Globe, 
  Shield,
  Zap,
  Star,
  Heart,
  Target,
  Award,
  TrendingUp
} from 'lucide-react'
import CTA from '../ui/CTA.jsx'

// Définir Bot avant son utilisation
const Bot = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const Presentation = () => {
  const features = [
    {
      icon: Code2,
      title: "Éditeur Monaco Professionnel",
      description: "L'éditeur de code le plus puissant avec coloration syntaxique, autocomplétion et debugging intégré.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Bot,
      title: "Assistant IA Premium",
      description: "Chatbot intelligent avec support Markdown, génération de code et conversations illimitées.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Preview Instantané",
      description: "Voyez vos changements instantanément avec notre système de preview ultra-rapide.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Sauvegarde Sécurisée",
      description: "Vos projets sont sauvegardés automatiquement dans Firebase avec une sécurité maximale.",
      color: "from-green-500 to-emerald-500"
    }
  ]

  const futureFeatures = [
    {
      icon: Users,
      title: "Collaboration en Temps Réel",
      description: "Travaillez en équipe avec édition simultanée, chat intégré et partage de sessions en direct."
    },
    {
      icon: Globe,
      title: "Déploiement Automatique",
      description: "Déployez vos projets directement vers Vercel, Netlify ou GitHub Pages en un clic."
    },
    {
      icon: TrendingUp,
      title: "Analytics Avancées",
      description: "Suivez vos performances de codage, temps de développement et productivité avec des métriques détaillées."
    },
    {
      icon: Award,
      title: "Marketplace d'Extensions",
      description: "Installez des extensions personnalisées pour étendre les capacités de votre environnement de développement."
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
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl mb-8 shadow-2xl shadow-primary-500/25"
            >
              <Code2 className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-surface-900 dark:text-white">
              Notre Histoire & Vision
            </h1>
            <p className="text-xl md:text-2xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed">
              Découvrez l'histoire et la vision derrière notre plateforme de
              codage innovante et révolutionnaire.
            </p>
          </motion.div>

          {/* Subtle Floating Elements */}
          <motion.div
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 left-16 w-16 h-16 bg-gradient-to-br from-primary-400/10 to-accent-400/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute top-48 right-24 w-20 h-20 bg-gradient-to-br from-accent-400/10 to-primary-400/10 rounded-full blur-xl"
          />
        </div>
      </section>

      {/* Introduction Section */}
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
            className="bg-white dark:bg-surface-800 rounded-3xl p-8 md:p-12 shadow-xl shadow-surface-200/20 dark:shadow-black/40 border border-surface-200/50 dark:border-surface-700/50"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-surface-900 dark:text-white">
                  Introduction à CodeSphere
                </h2>
                <p className="text-lg text-surface-700 dark:text-surface-300 leading-relaxed mb-6">
                  CodeSphere est une plateforme de codage en ligne conçue pour offrir
                  une expérience de développement fluide et intuitive. Accessible à
                  tous, elle permet de créer, modifier et prévisualiser des projets en{' '}
                  <strong className="text-primary-600 dark:text-primary-400">HTML</strong>,{' '}
                  <strong className="text-primary-600 dark:text-primary-400">CSS</strong>, et{' '}
                  <strong className="text-primary-600 dark:text-primary-400">JavaScript</strong> en temps réel.
                </p>
                <p className="text-lg text-surface-700 dark:text-surface-300 leading-relaxed">
                  Que vous soyez un étudiant, un développeur professionnel, ou simplement passionné de
                  technologie, CodeSphere vous fournit les outils nécessaires pour
                  transformer vos idées en réalité.
                </p>
              </div>
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-2xl flex items-center justify-center">
                  <Code2 className="w-32 h-32 text-primary-500/30" />
                </div>
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    repeatDelay: 2
                  }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Histoire Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-50 dark:bg-surface-800">
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
              L'Histoire de CodeSphere
            </h2>
            <p className="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              Une aventure passionnante qui a commencé par une simple idée
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 20,
              duration: 0.8, 
              delay: 0.2 
            }}
            viewport={{ once: true }}
            className="bg-white dark:bg-surface-700 rounded-3xl p-8 md:p-12 text-center shadow-xl shadow-surface-200/20 dark:shadow-black/40 border border-surface-200/50 dark:border-surface-600/50"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl mb-6 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg text-surface-700 dark:text-surface-300 leading-relaxed max-w-4xl mx-auto">
              Créé par un jeune étudiant passionné dans le cadre d'une formation
              de développeur fullstack, CodeSphere est né du désir de simplifier
              l'expérience de développement. Lassé par les configurations
              complexes des IDE traditionnels, il a voulu créer un environnement
              de codage accessible à tous, directement depuis un navigateur, sans
              compromis sur les fonctionnalités.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Utilisations Innovantes */}
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
              Utilisations Innovantes
            </h2>
            <p className="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              CodeSphere offre des possibilités d'utilisation diversifiées et créatives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: "🎵",
                title: "Création de Playlists de Code",
                description: "Organisez et partagez des collections de projets et d'exemples de code."
              },
              {
                icon: "💼",
                title: "Katas pour Entreprises",
                description: "Facilitez la formation et le développement des compétences avec des exercices pratiques."
              },
              {
                icon: "📂",
                title: "Exportation de Code",
                description: "Exportez facilement vos projets pour les utiliser dans d'autres environnements."
              },
              {
                icon: "💻",
                title: "Prototypage Rapide",
                description: "Testez des idées et des prototypes directement en ligne, en quelques clics."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
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
                className="bg-white dark:bg-surface-800 rounded-3xl p-6 shadow-xl shadow-surface-200/20 dark:shadow-black/40 border border-surface-200/50 dark:border-surface-700/50 transition-all duration-200 hover:shadow-2xl hover:shadow-surface-200/30 dark:hover:shadow-black/50 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-surface-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnalités Clés */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-50 dark:bg-surface-800">
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
              Fonctionnalités Clés
            </h2>
            <p className="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              Découvrez ce qui rend CodeSphere unique et puissant
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
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
                  className="bg-white dark:bg-surface-700 rounded-3xl p-6 text-center group cursor-pointer shadow-xl shadow-surface-200/20 dark:shadow-black/40 border border-surface-200/50 dark:border-surface-600/50 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-surface-200/30 dark:hover:shadow-black/50"
                >
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-500 ease-out`}
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
                  <h3 className="text-lg font-semibold mb-3 text-surface-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Opportunités Futures */}
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
              Opportunités Futures
            </h2>
            <p className="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
              Toujours en quête d'amélioration, nous planifions de lancer des fonctionnalités révolutionnaires
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {futureFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
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
                  className="bg-white dark:bg-surface-700 rounded-3xl p-6 shadow-xl shadow-surface-200/20 dark:shadow-black/40 border border-surface-200/50 dark:border-surface-600/50 transition-all duration-200 hover:shadow-2xl hover:shadow-surface-200/30 dark:hover:shadow-black/50 hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-primary-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-surface-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        title="Prêt à Découvrir Plus ?"
        subtitle="Rejoignez la communauté CodeSphere et transformez votre expérience de développement"
        buttonText="Essayer l'IDE Gratuit"
        buttonIcon={Rocket}
        variant="default"
        onClick={() => window.location.href = '/ide'}
      />
    </div>
  )
}

export default Presentation
