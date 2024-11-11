import React from 'react'

const ContactPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-12">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Restons en Contact !
        </h2>
        <p className="text-gray-600 mb-4">
          Nous sommes toujours ouverts à de nouvelles opportunités de
          collaboration et à explorer des propositions intéressantes. Que vous
          ayez une idée de projet, une question, ou une suggestion, n'hésitez
          pas à nous contacter. Nous sommes prêts à discuter et à trouver des
          solutions ensemble !
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Collaborations :</strong> Nous apprécions les collaborations
          créatives et innovantes. Si vous avez une idée de projet, un
          partenariat potentiel ou toute autre proposition, nous serions ravis
          d'en discuter. Parlons de comment nous pouvons travailler ensemble
          pour créer quelque chose de formidable !
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Résiliation de Services :</strong> Pour toute demande de
          résiliation de services, veuillez envoyer un e-mail à
          <a href="mailto:contact@codesphere.fr" className="text-indigo-500">
            {' '}
            contact@codesphere.fr
          </a>
          . Assurez-vous d'inclure tous les détails nécessaires pour traiter
          votre demande rapidement et efficacement.
        </p>
        <p className="text-gray-600">
          Nous répondons généralement sous 48 heures. Merci de votre patience !
        </p>
      </div>
    </div>
  )
}

export default ContactPage
