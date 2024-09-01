import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatSidebar from './ChatSidebar';

const ChatPanel = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (message) => {
        // Ajouter le message de l'utilisateur à la conversation
        setMessages([...messages, { role: 'user', content: message }]);
        // Envoyer le message à l'API et ajouter la réponse à la conversation (à implémenter)
    };

    return (
        <div
            className={`fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg transform ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300`}
        >
            <div className="h-full flex flex-col">
                <div className="flex-none bg-gray-200 p-4">
                    <button onClick={onClose} className="text-red-500">Fermer</button>
                </div>
                <ChatSidebar />
                <div className="flex-1 p-4 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`p-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                            <span>{msg.content}</span>
                        </div>
                    ))}
                </div>
                <ChatInput onSend={handleSendMessage} />
            </div>
        </div>
    );
};

export default ChatPanel;
