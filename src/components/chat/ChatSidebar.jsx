import React, { useEffect, useState } from 'react';
import { listSessions, createSession, deleteSession } from '../../services/chatService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const ChatSidebar = ({ participantId, onSelectSession }) => {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);

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
                setSelectedSession(null);
                Swal.fire('Supprimé', 'La discussion a été supprimée avec succès.', 'success');
            } catch (error) {
                console.error(`Erreur lors de la suppression de la session ${sessionId}:`, error);
                Swal.fire('Erreur', 'Impossible de supprimer la discussion.', 'error');
            }
        }
    };

    const handleSelectSession = (session) => {
        setSelectedSession(session);
        onSelectSession(session);
    };

    return (
        <div className="bg-gray-700 text-white p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Discussions</h2>
                <button
                    onClick={handleCreateSession}
                    className="bg-blue-500 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform transform hover:scale-105 flex items-center justify-center"
                >
                    <FontAwesomeIcon
                        icon={faPlus}
                        className="text-xl"
                    />
                </button>
            </div>
            {/* Section avec une hauteur fixe pour la liste des conversations */}
            <div className="h-40 overflow-y-auto">
                <ul className="space-y-1">
                    {sessions.length > 0 ? (
                        sessions.map(session => (
                            <li
                                key={session.id}
                                className={`flex justify-between items-center px-2 py-1 rounded-lg cursor-pointer ${
                                    selectedSession?.id === session.id ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
                                }`}
                                onClick={() => handleSelectSession(session)}
                            >
                                {`Conversation n°${session.id}`}
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="text-red-500 cursor-pointer hover:text-red-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
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
        </div>
    );
};

export default ChatSidebar;
