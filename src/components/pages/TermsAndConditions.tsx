
import { useNavigate } from 'react-router-dom' // Utiliser useNavigate pour les redirections internes

const TermsAndConditions = () => {
  const navigate = useNavigate() // Hook pour la navigation

  const handleContactClick = () => {
    navigate('/contact') // Redirection vers la page de contact
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto text-gray-800">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold text-blue-600">
            Conditions Générales d'Utilisation
          </h1>
          <p className="mt-4 text-xl text-gray-700">
            Merci de lire attentivement ces conditions avant d'utiliser notre
            service.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            1. Acceptation des Conditions
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            En vous inscrivant sur notre plateforme et en utilisant nos
            services, vous acceptez expressément de respecter et d'être lié par
            les présentes conditions générales d'utilisation. Si vous n'acceptez
            pas ces conditions, veuillez ne pas utiliser notre site.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            2. Collecte des Données Personnelles
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Nous collectons les données personnelles suivantes lors de votre
            inscription : prénom, nom, adresse email, adresse postale, date de
            naissance, et sexe. Ces informations sont utilisées pour gérer votre
            compte utilisateur, faciliter la facturation, et améliorer nos
            services.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Nous utilisons également des cookies et des technologies de suivi
            pour améliorer votre expérience sur notre site, notamment via
            Firebase et Google Analytics.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            3. Utilisation des Données
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Les données collectées sont utilisées principalement pour la gestion
            de votre compte utilisateur et pour le traitement des paiements via
            Stripe. Vos informations ne sont jamais vendues à des tiers. Nous
            partageons uniquement vos données avec des services tiers tels que
            Firebase pour l'authentification et la gestion des utilisateurs, et
            Stripe pour le traitement des paiements.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            4. Consentement
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            En vous inscrivant, vous consentez à la collecte et à l'utilisation
            de vos données personnelles comme décrit dans ces conditions. Vous
            pouvez retirer votre consentement à tout moment en nous contactant
            via notre{' '}
            <span
              onClick={handleContactClick}
              className="text-blue-600 underline cursor-pointer"
            >
              page de contact
            </span>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            5. Droits des Utilisateurs
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Vous avez le droit d'accéder, de rectifier, ou de supprimer vos
            données personnelles. Pour exercer ces droits, veuillez nous
            contacter par email ou téléphone via notre{' '}
            <span
              onClick={handleContactClick}
              className="text-blue-600 underline cursor-pointer"
            >
              page de contact
            </span>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            6. Sécurité des Données
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Nous prenons la sécurité de vos données au sérieux et utilisons des
            mesures de sécurité raisonnables pour protéger vos informations
            personnelles. En cas de violation de données, nous vous notifierons
            par email dans les plus brefs délais.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            7. Conservation des Données
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Vos données personnelles sont conservées pour une durée
            indéterminée, jusqu'à ce que vous demandiez leur suppression.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            8. Modifications des Conditions
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Nous nous réservons le droit de modifier ces conditions à tout
            moment. Les modifications seront publiées sur cette page. Votre
            utilisation continue de notre service après la publication de toute
            modification constitue une acceptation de ces modifications.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            9. Abonnements Payants et Résiliation
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Nous proposons des abonnements payants qui vous donnent accès à des
            fonctionnalités premium. Le paiement est effectué via Stripe, et vos
            informations de paiement ne sont jamais stockées par nos soins.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Pour toute demande de résiliation de votre abonnement, veuillez nous
            contacter via notre{' '}
            <span
              onClick={handleContactClick}
              className="text-blue-600 underline cursor-pointer"
            >
              page de contact
            </span>
            . Actuellement, la résiliation se fait uniquement par email et est
            traitée sous 24 heures.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">10. Contact</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Si vous avez des questions ou des préoccupations concernant ces
            conditions générales d'utilisation, veuillez nous contacter via
            notre{' '}
            <span
              onClick={handleContactClick}
              className="text-blue-600 underline cursor-pointer"
            >
              page de contact
            </span>
            .
          </p>
        </section>
      </div>
    </div>
  )
}

export default TermsAndConditions
