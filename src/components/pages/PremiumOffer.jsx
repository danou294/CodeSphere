// PremiumOffer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importez le composant Link

const PremiumOffer = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-10 px-6">
            <div className="max-w-4xl mx-auto text-gray-800">
                <header className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-blue-600">Offres CodeSphere</h1>
                    <p className="mt-4 text-xl text-gray-700">Découvrez nos différentes offres pour libérer tout le potentiel de votre expérience de codage.</p>
                </header>

                {/* Section pour les simples visiteurs */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold">🌐 Explorateur CodeSphere</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Pour ceux qui veulent explorer CodeSphere sans engagement, l'offre Explorateur vous permet de découvrir notre plateforme avec des fonctionnalités de base. Commencez un projet, testez des idées et voyez le résultat en temps réel. Cependant, vous ne pourrez pas enregistrer ou exporter vos projets.
                    </p>
                    <ul className="mt-4 space-y-3 text-gray-700">
                        <li>🚀 <strong>Commencez un Mini Projet :</strong> Expérimentez avec notre éditeur en ligne.</li>
                        <li>🔍 <strong>Visualisez en Temps Réel :</strong> Voyez vos changements en direct.</li>
                        <li>❌ <strong>Pas d'Exportation ou d'Enregistrement :</strong> Idéal pour de simples tests ou démos.</li>
                    </ul>
                </section>

                {/* Section pour les visiteurs connectés */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold">👤 Membre CodeSphere</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Connectez-vous pour débloquer des fonctionnalités supplémentaires. En tant que membre de CodeSphere, vous pouvez enregistrer vos projets, les modifier à tout moment, et exporter le code final. C'est parfait pour les développeurs qui souhaitent gérer leurs projets en toute simplicité.
                    </p>
                    <ul className="mt-4 space-y-3 text-gray-700">
                        <li>💾 <strong>Enregistrez vos Projets :</strong> Reprenez votre travail là où vous l'avez laissé.</li>
                        <li>🛠 <strong>Modifiez à tout Moment :</strong> Apportez des modifications quand vous le souhaitez.</li>
                        <li>📂 <strong>Exportez votre Code :</strong> Téléchargez vos projets en fichiers HTML, CSS et JavaScript.</li>
                    </ul>
                </section>

                {/* Section pour les visiteurs payants */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold">💎 CodeSphere Premium</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Pour ceux qui veulent tirer le meilleur parti de CodeSphere, notre offre Premium est la solution. En plus de toutes les fonctionnalités standard, les membres Premium bénéficient de l'accès à notre assistant de codage alimenté par OpenAI, qui vous aide à écrire du code plus efficacement et à résoudre les problèmes en temps réel. Un investissement idéal pour les développeurs sérieux et les équipes de développement.
                    </p>
                    <ul className="mt-4 space-y-3 text-gray-700">
                        <li>🤖 <strong>Assistant de Codage AI :</strong> Obtenez de l'aide en temps réel avec notre bot OpenAI.</li>
                        <li>🔐 <strong>Support Prioritaire :</strong> Accédez à une assistance prioritaire pour toutes vos questions.</li>
                        <li>📈 <strong>Accès à des Ressources Avancées :</strong> Guides exclusifs, templates premium et plus encore.</li>
                    </ul>
                    <p className="mt-4 text-2xl font-semibold text-blue-600">15€ mensuel</p>
                    <Link to="/en-construction" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300">
                        Souscrire à CodeSphere Premium
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default PremiumOffer;
