import React, { useEffect, useState } from 'react';
import { listSessions, createSession, deleteSession } from '../../services/chatService';
import ChatListItem from './ChatListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const ChatSidebar = ({ participantId, onSelectSession }) => {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null); // Ajout d'un état pour la session sélectionnée

    useEffect(() => {
        const fetchSessions = async () => {
            if (!participantId) {
                console.error("Participant ID non défini.");
                return;
            }

            try {
                const sessionsData = await listSessions(participantId);
                setSessions(sessionsData);
            } catch (error) {
                console.error("Erreur lors de la récupération des sessions:", error);
                setSessions([]);
            }
        };

        fetchSessions();
    }, [participantId]);

    const handleCreateSession = async () => {
        try {
            const newSession = await createSession(participantId);
            setSessions(prevSessions => [...prevSessions, newSession]);
        } catch (error) {
            console.error("Erreur lors de la création de la session:", error);
        }
    };

    const handleDeleteSession = async (sessionId) => {
        const result = await Swal.fire({
            title: 'Confirmer la suppression',
            text: "Cette action est irréversible. Voulez-vous continuer ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
        });

        if (result.isConfirmed) {
            try {
                await deleteSession(sessionId);
                setSessions(prevSessions => prevSessions.filter(session => session.id !== sessionId));
                setSelectedSession(null); // Réinitialiser la session sélectionnée si elle est supprimée
                Swal.fire('Supprimé', 'La discussion a été supprimée avec succès.', 'success');
            } catch (error) {
                console.error(`Erreur lors de la suppression de la session ${sessionId}:`, error);
                Swal.fire('Erreur', 'Impossible de supprimer la discussion.', 'error');
            }
        }
    };

    const handleSelectSession = (session) => {
        setSelectedSession(session); // Mettre à jour la session sélectionnée
        onSelectSession(session); // Appeler la fonction de rappel pour gérer la sélection de la session
    };

    return (
        <div className="bg-gray-700 text-white p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Discussions</h2>
                <button onClick={handleCreateSession} className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <ul className="flex-1 overflow-y-auto space-y-2">
                {sessions.length > 0 ? (
                    sessions.map(session => (
                        <li
                            key={session.id}
                            className={`flex justify-between items-center p-2 rounded-lg cursor-pointer ${selectedSession?.id === session.id ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'}`}
                            onClick={() => handleSelectSession(session)}
                        >
                            {`Conversation n°${session.id}`}
                            <FontAwesomeIcon 
                                icon={faTrash} 
                                className="text-red-500 cursor-pointer hover:text-red-700" 
                                onClick={(e) => {
                                    e.stopPropagation(); // Empêche la sélection de la session lors de la suppression
                                    handleDeleteSession(session.id);
                                }}
                            />
                        </li>
                    ))
                ) : (
                    <p className="text-gray-300">Aucune discussion disponible.</p>
                )}
            </ul>
        </div>
    );
};

export default ChatSidebar;
