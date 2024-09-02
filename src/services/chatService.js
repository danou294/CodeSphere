import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log('API_BASE_URL:', API_BASE_URL);

// Fonction pour loguer les détails d'une requête
const logRequestDetails = (method, url, paramsOrData = {}) => {
    console.log(`Sending ${method.toUpperCase()} request to: ${url}`);
    console.log('Parameters/Data:', paramsOrData);
};

// Fonction pour loguer les détails d'une réponse
const logResponseDetails = (response) => {
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
};

// Fonction pour loguer les erreurs
const logErrorDetails = (error) => {
    if (error.response) {
        console.error('HTTP Error Response:', error.response.status);
        console.error('Response data:', error.response.data);
    } else if (error.request) {
        console.error('No response received. Request details:', error.request);
    } else {
        console.error('Error:', error.message);
    }
    console.error('Error config:', error.config);
};

// Lister toutes les sessions de chat pour un utilisateur spécifique
export const listSessions = async (participantId) => {
    const url = `${API_BASE_URL}/sessions/`;
    const params = { participant_id: participantId };
    logRequestDetails('get', url, params);

    try {
        const response = await axios.get(url, { params });
        logResponseDetails(response);
        return response.data.sessions;
    } catch (error) {
        logErrorDetails(error);
        throw error;
    }
};

// Créer une nouvelle session de chat
export const createSession = async (participantId) => {
    const url = `${API_BASE_URL}/sessions/create/`;
    const data = { participant_id: participantId };
    logRequestDetails('post', url, data);

    try {
        const response = await axios.post(url, data);
        logResponseDetails(response);
        return response.data.session;
    } catch (error) {
        logErrorDetails(error);
        throw error;
    }
};

// Supprimer une session de chat
export const deleteSession = async (sessionId) => {
    const url = `${API_BASE_URL}/sessions/${sessionId}/delete/`;
    logRequestDetails('delete', url);

    try {
        const response = await axios.delete(url);
        logResponseDetails(response);
        return response.data;
    } catch (error) {
        logErrorDetails(error);
        throw error;
    }
};

// Ajouter un message à une session de chat
export const addMessage = async (sessionId, content, senderId, isFromUser = true, temperature = 0.7) => {
    const url = `${API_BASE_URL}/sessions/${sessionId}/messages/add/`;
    const data = { content, sender_id: senderId, is_from_user: isFromUser, temperature };
    logRequestDetails('post', url, data);

    try {
        const response = await axios.post(url, data);
        logResponseDetails(response);
        return response.data.messages;
    } catch (error) {
        logErrorDetails(error);
        throw error;
    }
};

// Récupérer tous les messages d'une session de chat
export const getMessages = async (sessionId) => {
    const url = `${API_BASE_URL}/sessions/${sessionId}/messages/`;
    logRequestDetails('get', url);

    try {
        const response = await axios.get(url);
        logResponseDetails(response);
        return response.data.messages;
    } catch (error) {
        logErrorDetails(error);
        throw error;
    }
};

// Supprimer un message spécifique
export const deleteMessage = async (messageId) => {
    const url = `${API_BASE_URL}/messages/${messageId}/delete/`;
    logRequestDetails('delete', url);

    try {
        const response = await axios.delete(url);
        logResponseDetails(response);
        return response.data;
    } catch (error) {
        logErrorDetails(error);
        throw error;
    }
};
