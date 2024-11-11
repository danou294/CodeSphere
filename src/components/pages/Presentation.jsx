// Presentation.jsx
import React from 'react'

const Presentation = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto text-gray-800">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold text-blue-600">
            À Propos de CodeSphere
          </h1>
          <p className="mt-4 text-xl text-gray-700">
            Découvrez l'histoire et la vision derrière notre plateforme de
            codage innovante.
          </p>
        </header>

        {/* Section Introduction */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            Introduction à CodeSphere
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            CodeSphere est une plateforme de codage en ligne conçue pour offrir
            une expérience de développement fluide et intuitive. Accessible à
            tous, elle permet de créer, modifier et prévisualiser des projets en{' '}
            <strong>HTML</strong>, <strong>CSS</strong>, et{' '}
            <strong>JavaScript</strong> en temps réel. Que vous soyez un
            étudiant, un développeur professionnel, ou simplement passionné de
            technologie, CodeSphere vous fournit les outils nécessaires pour
            transformer vos idées en réalité.
          </p>
        </section>

        {/* Section L'Histoire de CodeSphere */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            L'Histoire de CodeSphere
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Créé par un jeune étudiant passionné dans le cadre d'une formation
            de développeur fullstack, CodeSphere est né du désir de simplifier
            l'expérience de développement. Lassé par les configurations
            complexes des IDE traditionnels, il a voulu créer un environnement
            de codage accessible à tous, directement depuis un navigateur, sans
            compromis sur les fonctionnalités.
          </p>
        </section>

        {/* Section Utilisations Innovantes */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            Utilisations Innovantes
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            CodeSphere offre des possibilités d'utilisation diversifiées :
          </p>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              🎵 <strong>Création de Playlists de Code :</strong> Organisez et
              partagez des collections de projets et d'exemples de code.
            </li>
            <li>
              💼 <strong>Katas pour Entreprises :</strong> Facilitez la
              formation et le développement des compétences avec des exercices
              pratiques, sans nécessiter d'installations complexes.
            </li>
            <li>
              📂 <strong>Exportation de Code :</strong> Exportez facilement vos
              projets pour les utiliser dans d'autres environnements ou pour un
              déploiement rapide.
            </li>
            <li>
              💻 <strong>Prototypage Rapide :</strong> Testez des idées et des
              prototypes directement en ligne, en quelques clics.
            </li>
          </ul>
        </section>

        {/* Section Qui Sommes-Nous ? */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            Qui Sommes-Nous ?
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            CodeSphere est le fruit d'une équipe de passionnés de technologie.
            Notre mission est de rendre le développement web accessible à tous,
            en offrant des outils qui inspirent la créativité et facilitent le
            développement. Nous croyons en l'innovation, la simplicité et
            l'efficacité, et nous nous engageons à offrir une expérience de
            codage en ligne inégalée.
          </p>
        </section>

        {/* Section Fonctionnalités Clés */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            Fonctionnalités Clés
          </h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              🚀 <strong>Édition en Temps Réel :</strong> Prévisualisez vos
              changements instantanément.
            </li>
            <li>
              💡 <strong>Interface Intuitive :</strong> Profitez d'une interface
              propre et facile à utiliser.
            </li>
            <li>
              🔄 <strong>Gestion des Versions :</strong> Restez maître de votre
              historique de développement.
            </li>
            <li>
              🌐 <strong>Accessibilité :</strong> Codez de n'importe où, sur
              n'importe quel appareil connecté à Internet.
            </li>
          </ul>
        </section>

        {/* Section Opportunités Futures */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-600">
            Opportunités Futures
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Toujours en quête d'amélioration, nous planifions de lancer :
          </p>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              🤝 <strong>Collaboration en Temps Réel :</strong> Travaillez en
              équipe, partout dans le monde.
            </li>
            <li>
              📊 <strong>Analyses et Statistiques :</strong> Suivez votre
              progression et vos performances de codage.
            </li>
            <li>
              🛠 <strong>Intégrations API :</strong> Connectez CodeSphere à vos
              outils préférés pour une productivité accrue.
            </li>
            <li>
              🤖 <strong>Assistant de Codage AI :</strong> Un assistant
              personnel pour optimiser votre écriture de code.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Presentation
