// ConnectedSaveButton.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify'; // Importer toast pour les notifications
import { ClipLoader } from 'react-spinners'; // Importer le spinner de react-spinners

export default function ConnectedSaveButton() {
    const [isSaving, setIsSaving] = useState(false);
    const projectData = useSelector(state => state.project);
    const { projectId } = useParams();

    const handleSave = async () => {
        setIsSaving(true);

        if (!projectId) {
            toast.error('Erreur : ID de projet non valide.');
            setIsSaving(false);
            return;
        }

        try {
            const projectRef = doc(firestore, 'projects', projectId);
            await updateDoc(projectRef, {
                html: projectData.html,
                css: projectData.css,
                javascript: projectData.javascript,
                updatedAt: new Date(),
            });

            toast.success('Projet sauvegardé avec succès !'); // Notification de succès
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du projet :", error);
            toast.error('Erreur lors de la sauvegarde. Veuillez réessayer.'); // Notification d'erreur
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full mt-4">
            <button
                onClick={handleSave}
                className="flex items-center w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                disabled={isSaving}
            >
                {isSaving ? (
                    <ClipLoader color="#ffffff" size={20} className="mr-2" /> // Utilisation du spinner de react-spinners
                ) : (
                    <FontAwesomeIcon icon={faSave} className="w-5 h-5 mr-2" />
                )}
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
        </div>
    );
}
