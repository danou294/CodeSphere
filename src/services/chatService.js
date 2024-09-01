import axios from 'axios';

const API_BASE_URL = 'http:localhost:8000'; 

if (!API_BASE_URL) {
    console.error("REACT_APP_API_BASE_URL n'est pas défini. Assurez-vous que le fichier .env est configuré correctement.");
}

// Créer une nouvelle session de chat
export const createSession = async (participantId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/sessions/create/`, { participant_id: participantId });
        return response.data.session; // Retourne l'objet session créé
    } catch (error) {
        console.error('Erreur lors de la création de la session:', error);
        throw error;
    }
};

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

// Supprimer une session de chat
export const deleteSession = async (sessionId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/sessions/${sessionId}/delete/`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la suppression de la session ${sessionId}:`, error);
        throw error;
    }
};
