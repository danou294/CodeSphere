// Tabs.jsx
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import ButtonTab from "./ButtonTab.jsx";
import CodeTab from "./CodeTab.jsx";
import Preview from "./Preview.jsx";
import PreviewButton from "./PreviewButton.jsx";

export default function Tabs() {
    const [selectedProject, setSelectedProject] = useState(null); // Nouvelle variable d'état pour stocker le projet sélectionné
    const previewData = useSelector(state => state.preview);

    // Fonction pour mettre à jour le projet sélectionné
    const handleProjectSelect = (project) => {
        setSelectedProject(project);
    };

    return (
        <div className="flex flex-grow">
            <div className="w-48 flex-shrink-0 p-4 bg-gray-700">
                {/* Boutons de tabulation */}
                {selectedProject && (
                    <>
                        <ButtonTab
                            id={selectedProject.id}
                            toggleTab={handleProjectSelect}
                            buttonContent="HTML"
                            lang="html"
                            isActive={true}
                        />
                        <ButtonTab
                            id={selectedProject.id}
                            toggleTab={handleProjectSelect}
                            buttonContent="CSS"
                            lang="css"
                            isActive={false}
                        />
                        <ButtonTab
                            id={selectedProject.id}
                            toggleTab={handleProjectSelect}
                            buttonContent="JavaScript"
                            lang="javascript"
                            isActive={false}
                        />
                    </>
                )}
                <PreviewButton />
            </div>
            <div className="flex-grow relative p-4">
                {/* Contenu des onglets */}
                <h2 className="text-gray-800 text-lg font-semibold mb-4">Content</h2>
                {selectedProject && (
                    <CodeTab
                        id={selectedProject.id}
                        code={selectedProject[selectedProject.lang]}
                        lang={selectedProject.lang}
                    />
                )}
                {previewData.preview && <Preview />}
            </div>
        </div>
    );
}
