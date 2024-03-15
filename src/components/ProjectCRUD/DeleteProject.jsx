import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

const DeleteProject = ({ projectId, onDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        console.log('Suppression du projet avec l\'ID :', projectId);
        try {
            console.log('Avant suppression du projet');
            await deleteDoc(doc(firestore, 'projects', projectId));
            console.log('Après suppression du projet');
            onDelete(projectId);
            navigate('/projectlist');
        } catch (error) {
            console.error('Erreur lors de la suppression du projet : ', error);
        }
    };

    return (
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Supprimer
        </button>
    );
};

export default DeleteProject;
