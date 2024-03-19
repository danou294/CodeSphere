import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTab } from '../../features/tabs.js';

export default function SaveButton({ projectId, tabIndex }) {
    const dispatch = useDispatch();

    const handleSave = () => {
        // Logique de sauvegarde à implémenter
        console.log('Sauvegarde du code pour le projet', projectId, 'et l\'onglet', tabIndex);
    };

    return (
        <button onClick={handleSave} className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sauvegarder
        </button>
    );
}
