import React from 'react';

const Presentation = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-10 px-6">
            <div className="max-w-4xl mx-auto text-gray-800">
                <header className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-blue-600">Bienvenue sur CodeSphere</h1>
                    <p className="mt-4 text-xl text-gray-700">La plateforme de codage en ligne ultime pour tous les développeurs.</p>
                </header>

                {/* Section Introduction */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold">Introduction à CodeSphere</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        CodeSphere est plus qu'un simple éditeur de code en ligne. C'est une plateforme innovante qui permet aux développeurs de tous niveaux de créer, éditer et prévisualiser des projets en <strong>HTML</strong>, <strong>CSS</strong>, et <strong>JavaScript</strong> en temps réel. Que vous soyez un étudiant, un professionnel ou un passionné de technologie, CodeSphere rend le développement web accessible, intuitif et efficace.
                    </p>
                </section>

                {/* Section L'Histoire de CodeSphere */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold">L'Histoire de CodeSphere</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        CodeSphere a été créé par un jeune étudiant passionné de développement web dans le cadre de sa formation de développeur fullstack. Frustré par les limites des éditeurs de code traditionnels et les configurations complexes des environnements de développement, il a imaginé une solution qui rendrait le codage plus accessible à tous. CodeSphere est né de ce désir de simplifier le processus de développement, en offrant un outil puissant et facile à utiliser, accessible directement depuis un navigateur.
                    </p>
                </section>

                {/* Section Utilisations Innovantes */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold">Utilisations Innovantes</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Avec CodeSphere, les possibilités sont infinies. Voici quelques-unes des façons dont vous pouvez utiliser notre plateforme :
                    </p>
                    <ul className="mt-4 space-y-3 text-gray-700">
                        <li>🎵 <strong>Création de Playlists de Code :</strong> Organisez et partagez des collections de projets et d'exemples de code.</li>
                        <li>💼 <strong>Katas pour Entreprises :</strong> Développez des exercices pratiques et des défis de codage pour les équipes, sans besoin d'installer un IDE complexe.</li>
                        <li>📂 <strong>Exportation de Code :</strong> Exportez facilement vos projets sous forme de fichiers HTML, CSS et JavaScript pour un déploiement rapide.</li>
                        <li>💻 <strong>Prototypage Rapide :</strong> Testez des idées et prototypes en temps réel sans quitter votre navigateur.</li>
                    </ul>
                </section>

                {/* Section Qui Sommes-Nous ? */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold">Qui Sommes-Nous ?</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Nous sommes une équipe de passionnés de technologie dédiés à rendre le développement web accessible à tous. Basés sur l'innovation, la simplicité et l'efficacité, nous croyons que chaque développeur mérite des outils qui inspirent la créativité et facilitent le processus de développement. Chez CodeSphere, notre mission est de transformer la manière dont les gens codent et collaborent en ligne.
                    </p>
                </section>

                {/* Section Fonctionnalités Clés */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold">Fonctionnalités Clés</h2>
                    <ul className="mt-4 space-y-3 text-gray-700">
                        <li>🚀 <strong>Édition en Temps Réel :</strong> Voyez vos changements instantanément avec notre éditeur en direct.</li>
                        <li>💡 <strong>Interface Intuitive :</strong> Notre design moderne et épuré rend le codage plus agréable et plus facile.</li>
                        <li>🔄 <strong>Gestion des Versions :</strong> Gardez une trace de toutes les modifications et revenez aux versions précédentes en un clic.</li>
                        <li>🌐 <strong>Accessibilité :</strong> Codez de n'importe où, sur n'importe quel appareil avec une simple connexion Internet.</li>
                    </ul>
                </section>

                {/* Section Opportunités Futures */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold">Opportunités Futures</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Chez CodeSphere, nous regardons toujours vers l'avenir. Voici quelques-unes des fonctionnalités passionnantes que nous prévoyons de lancer bientôt :
                    </p>
                    <ul className="mt-4 space-y-3 text-gray-700">
                        <li>🤝 <strong>Collaboration en Temps Réel :</strong> Travaillez en équipe sur le même projet, simultanément.</li>
                        <li>📊 <strong>Analyses et Statistiques :</strong> Obtenez des insights sur vos projets et performances de codage.</li>
                        <li>🛠 <strong>Intégrations API :</strong> Connectez CodeSphere à d'autres outils et services que vous utilisez.</li>
                        <li>🤖 <strong>Assistant de Codage AI :</strong> Laissez notre bot AI vous aider à écrire du code plus efficacement.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Presentation;
