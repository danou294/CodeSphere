import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Code2, 
  Sparkles, 
  Zap, 
  Shield, 
  Globe, 
  Rocket,
  ArrowRight,
  Play,
  Star,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react'
import CTA from '../ui/CTA.jsx'

const Home = () => {
  const features = [
    {
      icon: Code2,
      title: "Éditeur Monaco Avancé",
      description: "L'éditeur de code le plus puissant avec coloration syntaxique, autocomplétion et debugging intégré.",
      color: "from-primary-500 to-accent-500"
    },
    {
      icon: Sparkles,
      title: "Assistant AI Premium",
      description: "Intelligence artificielle avancée pour vous aider à coder plus rapidement et efficacement.",
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: Zap,
      title: "Preview en Temps Réel",
      description: "Voyez vos changements instantanément avec notre système de preview ultra-rapide.",
      color: "from-contact-500 to-accent-500"
    },
    {
      icon: Shield,
      title: "Sécurité Maximale",
      description: "Votre code est protégé avec les meilleures pratiques de sécurité et de confidentialité.",
      color: "from-success-500 to-accent-500"
    },
    {
      icon: Globe,
      title: "Déploiement Facile",
      description: "Déployez vos projets en un clic vers GitHub, Netlify, Vercel et plus encore.",
      color: "from-blue-600 to-indigo-600"
    },
    {
      icon: Rocket,
      title: "Performance Optimale",
      description: "Optimisé pour la vitesse avec un chargement ultra-rapide et une expérience fluide.",
      color: "from-orange-600 to-red-600"
    }
  ]

  const stats = [
    { number: "50K+", label: "Développeurs", icon: Users },
    { number: "100K+", label: "Projets Créés", icon: Code2 },
    { number: "99.9%", label: "Uptime", icon: CheckCircle },
    { number: "<100ms", label: "Temps de Réponse", icon: Clock }
  ]

  const testimonials = [
    {
      name: "Alexandre Dubois",
      role: "Développeur Full-Stack",
      content: "CodeSphere a révolutionné ma façon de coder. L'assistant AI est incroyablement intelligent !",
      rating: 5,
      avatar: "AD"
    },
    {
      name: "Marie Laurent",
      role: "Lead Frontend",
      content: "L'éditeur Monaco est parfait et la preview en temps réel m'a fait gagner des heures.",
      rating: 5,
      avatar: "ML"
    },
    {
      name: "Thomas Moreau",
      role: "Architecte Logiciel",
      content: "La meilleure plateforme de développement que j'ai utilisée. Simple, rapide et puissante.",
      rating: 5,
      avatar: "TM"
    }
  ]

  return (
    <div className="min-h-screen animated-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">CodeSphere</span>
            </h1>
            <p className="text-xl md:text-2xl text-surface-700 dark:text-white max-w-3xl mx-auto leading-relaxed">
              La plateforme de développement moderne qui transforme votre façon de coder. 
              Éditeur avancé, AI intelligent, et déploiement en un clic.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/ide"
              className="btn-primary px-8 py-4 text-lg font-semibold group"
            >
              Commencer à Coder
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/premium-offer"
              className="btn-secondary px-8 py-4 text-lg font-semibold group"
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Découvrir Premium
            </Link>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-accent-400/20 to-primary-400/20 rounded-full blur-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Pourquoi Choisir CodeSphere ?
            </h2>
            <p className="text-xl text-surface-700 dark:text-white max-w-2xl mx-auto">
              Découvrez les fonctionnalités qui font de CodeSphere la plateforme de développement la plus avancée
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="card p-8 text-center group cursor-pointer transition-all duration-150 hover:shadow-xl hover:shadow-gray-200 dark:hover:shadow-gray-800"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-150`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-surface-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-surface-700 dark:text-white leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-100 dark:bg-surface-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-surface-700 dark:text-white font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-xl text-surface-700 dark:text-white max-w-2xl mx-auto">
              Rejoignez des milliers de développeurs qui ont déjà transformé leur expérience de codage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="card p-8 transition-all duration-150 hover:shadow-xl hover:shadow-gray-200 dark:hover:shadow-gray-800"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-surface-700 dark:text-white mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-surface-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-surface-700 dark:text-white">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        title="Prêt à Commencer l'Aventure ?"
        subtitle="Rejoignez CodeSphere aujourd'hui et découvrez une nouvelle façon de développer des applications"
        buttonText="Commencer Gratuitement"
        buttonIcon={Play}
        variant="default"
        onClick={() => window.location.href = '/ide'}
      />
    </div>
  )
}

export default Home
