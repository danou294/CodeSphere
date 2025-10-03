import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext.jsx'
import { toast } from 'react-toastify'
import { redirectToCheckout } from '../../services/stripeService'
import { usePremiumStatus } from '../../hooks/usePremiumStatus'
import { 
  Crown, 
  Zap, 
  Shield, 
  CheckCircle, 
  Star,
  ArrowRight,
  Rocket,
  Users,

  Globe,
  Code2,
  Bot
} from 'lucide-react'
import CTA from '../ui/CTA.jsx'

const PremiumOffer = () => {
  const { currentUser } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { isPremium, isLoading: subscriptionLoading } = usePremiumStatus()

  useEffect(() => {
    // Vérifie si c'est un retour de redirection de Checkout
    const searchParams = new URLSearchParams(location.search)
    
    if (searchParams.get('success')) {
      toast.success('🎉 Paiement réussi! Vous avez maintenant accès au chatbot premium.')
    }

    if (searchParams.get('canceled')) {
      toast.info('ℹ️ Paiement annulé. Vous pouvez continuer à explorer les offres.')
    }
  }, [location.search])

  // Rediriger si l'utilisateur est déjà premium
  useEffect(() => {
    if (isPremium && !subscriptionLoading) {
      toast.info('✅ Vous avez déjà un abonnement premium actif!')
      // Rediriger vers la page principale après 2 secondes
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [isPremium, subscriptionLoading, navigate])

  const handleCheckout = async () => {
    if (!currentUser) {
      toast.warning("Veuillez vous connecter pour souscrire à l'offre premium.")
      return
    }

    console.log('🔍 [CHECKOUT] Début du processus de paiement')
    console.log('🔍 [CHECKOUT] Utilisateur connecté:', currentUser.uid)
    console.log('🔍 [CHECKOUT] URL API:', import.meta.env.VITE_API_BASE_URL)
    console.log('🔍 [CHECKOUT] Clé Stripe:', import.meta.env.VITE_STRIPE_PUBLIC_KEY ? '✅ Configurée' : '❌ Manquante')

    setIsLoading(true)
    try {
      console.log('🔍 [CHECKOUT] Appel de redirectToCheckout...')
      
      // Redirection vers Stripe Checkout
      const result = await redirectToCheckout()
      
      console.log('🔍 [CHECKOUT] Résultat Stripe:', result)
      
      if (result.error) {
        console.error('❌ [CHECKOUT] Erreur Stripe:', result.error)
        toast.error('Erreur lors de la redirection vers le paiement. Veuillez réessayer.')
      } else {
        console.log('✅ [CHECKOUT] Redirection réussie vers Stripe')
      }
      // Si succès, l'utilisateur est redirigé vers Stripe automatiquement
      
    } catch (error) {
      console.error('❌ [CHECKOUT] Erreur complète:', error)
      console.error('❌ [CHECKOUT] Stack trace:', (error as any).stack)
      toast.error(
        'Échec du démarrage du processus de paiement. Veuillez réessayer plus tard.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const plans = [
    {
      name: "Gratuit",
      description: "Parfait pour découvrir CodeSphere",
      price: "Gratuit",
      features: [
        "Éditeur Monaco avancé",
        "Preview en temps réel",
        "Sauvegarde locale",
        "Support communautaire"
      ],
      limitations: [
        "Pas d'accès au chatbot IA",
        "Fonctionnalités limitées"
      ],
      color: "from-surface-400 to-surface-600",
      popular: false
    },
    {
      name: "Premium",
      description: "Accès complet au chatbot IA",
      price: "15€",
      period: "/mois",
      features: [
        "Tout du plan Gratuit",
        "Assistant IA Premium",
        "Conversations illimitées",
        "Support Markdown complet",
        "Génération de titres automatique",
        "Copie de code intégrée"
      ],
      limitations: [],
      color: "from-primary-500 to-accent-500",
      popular: true
    }
  ]

  const benefits = [
    {
      icon: Bot,
      title: "Assistant IA Premium",
      description: "Chatbot intelligent avec support Markdown, génération de code et conversations illimitées",
      color: "from-primary-500 to-accent-500"
    },
    {
      icon: Zap,
      title: "Interface ChatGPT-like",
      description: "Expérience utilisateur moderne avec animations fluides et design professionnel",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Sauvegarde Sécurisée",
      description: "Vos conversations sont sauvegardées automatiquement dans Firebase",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Code2,
      title: "Support Code Complet",
      description: "Coloration syntaxique, copie de code et rendu Markdown avancé",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Users,
      title: "Collaboration en Temps Réel",
      description: "🚀 Bientôt : Travaillez en équipe avec édition simultanée et chat intégré",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Globe,
      title: "Déploiement Automatique",
      description: "🚀 Bientôt : Déployez vos projets directement vers Vercel, Netlify en un clic",
      color: "from-red-500 to-pink-500"
    }
  ]

  // Afficher un écran de chargement pendant la vérification
  if (subscriptionLoading) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
            Vérification de votre abonnement...
          </h2>
          <p className="text-surface-600 dark:text-surface-400">
            Veuillez patienter pendant que nous vérifions votre statut premium.
          </p>
        </motion.div>
      </div>
    )
  }

  // Afficher un message si l'utilisateur est déjà premium
  if (isPremium) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl mb-8 shadow-2xl shadow-green-500/25"
          >
            <Crown className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-surface-900 dark:text-white">
            🎉 Vous êtes déjà Premium !
          </h1>
          
          <p className="text-xl text-surface-600 dark:text-surface-400 mb-8">
            Félicitations ! Vous avez déjà accès à toutes les fonctionnalités premium de CodeSphere.
          </p>
          
          <motion.button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-primary-500 to-accent-500 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Retour à l'accueil
          </motion.button>
        </motion.div>
      </div>
    )
  }

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
              <Crown className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-surface-900 dark:text-white">
              Passez au Niveau Supérieur
            </h1>
            <p className="text-xl md:text-2xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos offres exclusives et libérez tout le potentiel de CodeSphere. 
              De l'explorateur au premium, choisissez ce qui vous convient le mieux.
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

      {/* Plans Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-surface-900 dark:text-white">
              Choisissez Votre Plan
            </h2>
            <p className="text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Des options flexibles pour tous les niveaux de développement
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
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
                  transition: { 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 25 
                  } 
                }}
                className={`relative bg-white dark:bg-surface-800 rounded-3xl p-8 shadow-xl shadow-surface-200/20 dark:shadow-black/40 border border-surface-200/50 dark:border-surface-700/50 transition-all duration-200 ease-out hover:shadow-2xl hover:shadow-surface-200/30 dark:hover:shadow-black/50 ${
                  plan.popular ? 'ring-2 ring-primary-500/50 shadow-2xl shadow-primary-500/20' : ''
                }`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: 0.5, 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 20 
                    }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      <Star className="inline w-4 h-4 mr-2" />
                      Plus Populaire
                    </div>
                  </motion.div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-3 text-surface-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 mb-6">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-surface-500 dark:text-surface-400 text-lg">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-surface-900 dark:text-white mb-4 text-center">
                    ✅ Inclus :
                  </h4>
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.6 + featureIndex * 0.05, 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 20 
                      }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-surface-700 dark:text-surface-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                  
                  {plan.limitations.length > 0 && (
                    <>
                      <h4 className="font-semibold text-surface-900 dark:text-white mb-4 mt-6 text-center">
                        ❌ Limites :
                      </h4>
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <motion.div
                          key={limitation}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.7 + limitationIndex * 0.05, 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 20 
                          }}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-5 h-5 text-red-500 flex-shrink-0">✗</div>
                          <span className="text-surface-700 dark:text-surface-300 text-sm">{limitation}</span>
                        </motion.div>
                      ))}
                    </>
                  )}
                </div>

                {plan.name === "Premium" ? (
                  <motion.button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ 
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      transition: { type: "spring", stiffness: 400, damping: 20 }
                    }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Traitement...
                      </div>
                    ) : (
                      <>
                        Souscrire Maintenant
                        <ArrowRight className="ml-2 w-5 h-5 inline" />
                      </>
                    )}
                  </motion.button>
                ) : (
                  <div className="text-center">
                    <span className="text-surface-500 dark:text-surface-400 text-sm">
                      {plan.name === "Explorateur" ? "Déjà disponible" : "Bientôt disponible"}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-50 dark:bg-surface-800">
        <div className="max-w-7xl mx-auto">
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
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-surface-900 dark:text-white">
              Avantages Premium
            </h2>
            <p className="text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Découvrez pourquoi CodeSphere Premium est le choix des développeurs professionnels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
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
                  className="bg-white dark:bg-surface-700 rounded-3xl p-8 shadow-xl shadow-surface-200/20 dark:shadow-black/40 border border-surface-200/50 dark:border-surface-600/50 text-center group cursor-pointer transition-all duration-200 ease-out hover:shadow-2xl hover:shadow-surface-200/30 dark:hover:shadow-black/50"
                >
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-200 ease-out`}
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
                  <h3 className="text-xl font-semibold mb-4 text-surface-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Free IDE Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
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
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-surface-900 dark:text-white">
              Commencez Gratuitement Dès Maintenant !
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Notre IDE gratuit vous donne déjà accès à l'éditeur Monaco avancé, 
              la preview en temps réel et la sauvegarde locale. 
              Parfait pour tester CodeSphere !
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              duration: 0.6, 
              delay: 0.2 
            }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/ide'}
              className="btn-secondary px-8 py-4 text-lg font-semibold group"
            >
              <Code2 className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Essayer l'IDE Gratuit
            </motion.button>
            
            <div className="text-surface-500 text-sm">
              Aucune inscription requise • Accès immédiat
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        title="Prêt à Débloquer Tout le Potentiel ?"
        subtitle="Rejoignez CodeSphere Premium et transformez votre expérience de développement"
        buttonText="Commencer Premium"
        buttonIcon={Crown}
        variant="premium"
        onClick={handleCheckout}
      />
    </div>
  )
}

export default PremiumOffer
