import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Assurez-vous que cette URL est correcte

// Lister toutes les sessions de chat pour un utilisateur spécifique
export const listSessions = async (participantId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sessions/`, {
            params: { participant_id: participantId }
        });
        return response.data.sessions;
    } catch (error) {
        console.error('Erreur lors de la récupération des sessions:', error);
        throw error;
    }
};

// Créer une nouvelle session de chat
export const createSession = async (participantId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/sessions/create/`, {
            participant_id: participantId
        });
        return response.data.session;
    } catch (error) {
        console.error('Erreur lors de la création de la session:', error);
        throw error;
    }
};

// Supprimer une session de chat
export const deleteSession = async (sessionId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/sessions/${sessionId}/`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression de la session:', error);
        throw error;
    }
};

// Ajouter un message à une session de chat
export const addMessage = async (sessionId, content, senderId, isFromUser = true, temperature = 0.7) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/sessions/${sessionId}/messages/add/`, {
            content, sender_id: senderId, is_from_user: isFromUser, temperature
        });
        return response.data.messages; // Retourne les messages mis à jour
    } catch (error) {
        console.error('Erreur lors de l\'ajout du message:', error);
        throw error;
    }
};

// Récupérer tous les messages d'une session de chat
export const getMessages = async (sessionId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sessions/${sessionId}/messages/`);
        return response.data.messages;
    } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
        throw error;
    }
};

// Supprimer un message spécifique
export const deleteMessage = async (messageId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/messages/${messageId}/`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression du message:', error);
        throw error;
    }
};
