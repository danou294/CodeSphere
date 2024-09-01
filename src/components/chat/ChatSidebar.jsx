import React, { useEffect, useState } from 'react';
import { listSessions, createSession, deleteSession } from '../../services/chatService'; // Importez les fonctions du service
import ChatListItem from './ChatListItem';

const ChatSidebar = ({ participantId, onSelectSession }) => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const sessionsData = await listSessions(participantId); // Passer l'ID de l'utilisateur
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
        try {
            await deleteSession(sessionId);
            setSessions(prevSessions => prevSessions.filter(session => session.id !== sessionId));
        } catch (error) {
            console.error(`Erreur lors de la suppression de la session ${sessionId}:`, error);
        }
    };

    const handleSelectSession = (sessionId) => {
        onSelectSession(sessionId); // Appeler la fonction de rappel pour gérer la sélection de la session
    };

    return (
        <div className="flex-none w-1/4 bg-gray-100 p-4 border-r border-gray-200">
            <button onClick={handleCreateSession} className="mb-4 bg-green-500 text-white p-2 rounded">+ New Chat</button>
            <ul>
                {sessions.map(session => (
                    <ChatListItem
                        key={session.id}
                        session={session}
                        onDelete={() => handleDeleteSession(session.id)}
                        onSelect={() => handleSelectSession(session.id)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ChatSidebar;
