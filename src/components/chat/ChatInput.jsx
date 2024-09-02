import React, { useState } from 'react';
import { addMessage } from '../../services/chatService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'; // Pour afficher des alertes

const ChatInput = ({ sessionId, onNewMessage }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        if (message.trim()) {
            try {
                const senderId = "user-id"; // Remplacez par la manière d'obtenir l'ID actuel de l'utilisateur
                const response = await addMessage(sessionId, message, senderId, true, 0.7);
                setMessage('');
                onNewMessage(response); // Mettre à jour l'état des messages après envoi
            } catch (error) {
                console.error("Erreur lors de l'envoi du message:", error);
                Swal.fire('Erreur', 'Impossible d\'envoyer le message. Veuillez réessayer.', 'error');
            }
        } else {
            Swal.fire('Erreur', 'Le champ de message ne peut pas être vide.', 'warning');
        }
    };

    return (
        <div className="flex items-center p-4 bg-gray-700 border-t border-gray-600">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 rounded-lg bg-gray-800 text-white border-none outline-none"
                placeholder="Tapez votre message..."
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
                onClick={handleSendMessage}
                className="ml-4 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600"
            >
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
    );
};

export default ChatInput;
