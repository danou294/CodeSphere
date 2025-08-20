import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import QueryString from 'query-string'
import { useAuth } from '../Contexts/AuthContext'
import { toast } from 'react-toastify'
import { redirectToCheckout } from '../../services/stripeService'
import { getMySubscription } from '../../services/userService'

const PremiumOffer = () => {
  const { currentUser } = useAuth()
  const location = useLocation()
  const [subscriptionStatus, setSubscriptionStatus] = useState(null)

  useEffect(() => {
    // Vérifie si c'est un retour de redirection de Checkout
    const values = QueryString.parse(location.search)

    if (values.success) {
      toast.success('Paiement réussi! Vous avez maintenant accès au chatbot.')
      // Vérifier le statut de l'abonnement depuis le backend
      checkSubscriptionStatus()
    }

    if (values.canceled) {
      toast.info(
        'Paiement annulé. Vous pouvez continuer à explorer les offres.'
      )
    }

    // Vérifier le statut actuel de l'abonnement
    if (currentUser) {
      checkSubscriptionStatus()
    }
  }, [location.search, currentUser])

  const checkSubscriptionStatus = async () => {
    try {
      const subscription = await getMySubscription()
      setSubscriptionStatus(subscription)
    } catch (error) {
      console.error('Erreur lors de la vérification du statut:', error)
    }
  }

  const handleCheckout = async () => {
    if (!currentUser) {
      toast.warning("Veuillez vous connecter pour souscrire à l'offre premium.")
      return
    }

    // Vérifier si l'utilisateur a déjà un abonnement actif
    if (subscriptionStatus?.active) {
      toast.info("Vous avez déjà un abonnement premium actif.")
      return
    }

    try {
      await redirectToCheckout()
    } catch (error) {
      console.error('Failed to start the checkout process:', error)
      toast.error(
        'Échec du démarrage du processus de paiement. Veuillez réessayer plus tard.'
      )
    }
  }

  // Si l'utilisateur a déjà un abonnement actif
  if (subscriptionStatus?.active) {
    return (
      <div className="bg-gray-100 min-h-screen py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <h2 className="text-2xl font-bold mb-2">🎉 Félicitations !</h2>
            <p>Vous avez déjà un abonnement CodeSphere Premium actif.</p>
            <p className="text-sm mt-2">
              Statut: {subscriptionStatus.status} | 
              Expire le: {new Date(subscriptionStatus.current_period_end * 1000).toLocaleDateString()}
            </p>
          </div>
          <p className="text-gray-600">
            Profitez de toutes les fonctionnalités premium de CodeSphere !
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto text-gray-800">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold text-blue-600">
            Découvrez Nos Offres Exclusives
          </h1>
          <p className="mt-4 text-xl text-gray-700">
            Libérez tout le potentiel de CodeSphere avec l'offre qui vous
            convient le mieux. Que vous soyez débutant ou professionnel, nous
            avons quelque chose pour vous.
          </p>
        </header>

        {/* Section Explorateur CodeSphere */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            🌐 Explorateur CodeSphere
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Idéal pour les curieux et les novices, l'Explorateur CodeSphere vous
            permet de découvrir les bases de notre plateforme. Commencez des
            projets simples, testez vos idées et voyez les résultats
            instantanément. Cependant, notez que les options d'enregistrement et
            d'exportation ne sont pas disponibles.
          </p>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              🚀 <strong>Commencez un Mini Projet :</strong> Utilisez notre
              éditeur en ligne pour explorer.
            </li>
            <li>
              🔍 <strong>Visualisez en Temps Réel :</strong> Observez
              instantanément les changements que vous apportez.
            </li>
            <li>
              ❌ <strong>Pas d'Exportation :</strong> Parfait pour des essais
              rapides et des démonstrations.
            </li>
          </ul>
        </section>

        {/* Section Membre CodeSphere */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            👤 Membre CodeSphere
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Pour les utilisateurs réguliers qui souhaitent un peu plus de
            flexibilité, l'offre Membre CodeSphere vous permet d'enregistrer, de
            modifier et d'exporter vos projets. Reprenez vos travaux à tout
            moment et sauvegardez vos progrès.
          </p>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              💾 <strong>Enregistrez vos Projets :</strong> Sauvegardez votre
              travail et reprenez là où vous vous êtes arrêté.
            </li>
            <li>
              🛠 <strong>Modifiez à tout Moment :</strong> Faites des
              ajustements quand vous en avez besoin.
            </li>
            <li>
              📂 <strong>Exportez votre Code :</strong> Téléchargez vos projets
              sous forme de fichiers HTML, CSS et JavaScript.
            </li>
          </ul>
        </section>

        {/* Section CodeSphere Premium */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            💎 CodeSphere Premium
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Pour ceux qui cherchent à pousser leur créativité plus loin,
            CodeSphere Premium est fait pour vous. Profitez d'outils avancés,
            d'un accès prioritaire à notre assistant de codage AI, et d'un
            support premium. C'est l'expérience ultime pour développer vos
            projets avec efficacité.
          </p>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              🤖 <strong>Assistant de Codage AI :</strong> Bénéficiez d'une
              assistance en temps réel avec notre bot OpenAI.
            </li>
            <li>
              🔐 <strong>Support Prioritaire :</strong> Obtenez une aide rapide
              pour toutes vos questions techniques.
            </li>
            <li>
              📈 <strong>Accès à des Ressources Avancées :</strong> Accédez à
              des guides exclusifs, des templates premium et bien plus encore.
            </li>
          </ul>
          <p className="mt-4 text-2xl font-semibold text-blue-600">
            15€ par mois
          </p>
          <button
            onClick={handleCheckout}
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Souscrire à CodeSphere Premium
          </button>
        </section>
      </div>
    </div>
  )
}

export default PremiumOffer
