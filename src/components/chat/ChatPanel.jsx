import React, { useState, useEffect } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatInput from './ChatInput';
import { listSessions, getMessages } from '../../services/chatService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import de l'icône de fermeture

const ChatPanel = ({ participantId, onClose }) => { // Ajout de onClose pour gérer la fermeture du chat
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [messages, setMessages] = useState([]);

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

    useEffect(() => {
        if (selectedSession) {
            const fetchMessages = async () => {
                try {
                    const messagesData = await getMessages(selectedSession.id);
                    setMessages(messagesData);
                } catch (error) {
                    console.error("Erreur lors de la récupération des messages:", error);
                }
            };
            fetchMessages();
        }
    }, [selectedSession]);

    const handleSelectSession = (session) => {
        setSelectedSession(session);
        setMessages([]); // Réinitialiser les messages lors du changement de session
    };

    return (
        <div className="flex flex-col h-full bg-gray-800 text-white">
            {/* Barre supérieure avec bouton de fermeture */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-lg font-bold">Chat</h2>
                <button onClick={onClose} className="text-white hover:text-gray-400">
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
            </div>
            <ChatSidebar 
                sessions={sessions} 
                selectedSession={selectedSession} 
                onSelectSession={handleSelectSession} 
                participantId={participantId} 
            />
            <div className="flex flex-col h-full">
                {/* Conteneur des messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-2">
                    {messages.length > 0 ? (
                        messages.map((message, index) => (
                            <div key={index} className={`p-2 rounded-lg ${message.is_from_user ? 'bg-blue-600' : 'bg-gray-600'}`}>
                                {message.content}
                            </div>
                        ))
                    ) : selectedSession ? (
                        <p className="text-gray-400">Aucun message dans cette discussion.</p>
                    ) : (
                        <p className="text-gray-400">Veuillez sélectionner une discussion.</p>
                    )}
                </div>
                {/* Input pour envoyer de nouveaux messages */}
                {selectedSession && <ChatInput sessionId={selectedSession.id} onNewMessage={setMessages} />}
            </div>
        </div>
    );
};

export default ChatPanel;
