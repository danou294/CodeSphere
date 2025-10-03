import api from "./http";

export const createSession = (participantId, title = "New Session") =>
  api.post("/sessions/create/", { participant_id: participantId, title }).then(r => r.data);

export const createConversationWithMessage = (participantId, content, senderId, temperature = 0.7) => {
  console.log('📡 [CHAT SERVICE] createConversationWithMessage appelé avec:', { 
    participantId, 
    content: content.substring(0, 50) + '...', 
    senderId, 
    temperature 
  })
  return api.post("/conversations/create/", { 
    participant_id: participantId, 
    content, 
    sender_id: senderId, 
    temperature 
  })
    .then(r => {
      console.log('✅ [CHAT SERVICE] Réponse createConversationWithMessage:', r.data)
      return r.data
    })
    .catch(error => {
      console.error('❌ [CHAT SERVICE] Erreur createConversationWithMessage:', error.response?.data || error.message)
      throw error
    })
};

export const listSessions = (participantId) =>
  api.get("/sessions/", { params: { participant_id: participantId } }).then(r => r.data);

export const deleteSession = (sessionId) =>
  api.delete(`/sessions/${sessionId}/delete/`).then(r => r.data);

export const addMessage = (sessionId, content, senderId) => {
  console.log('📡 [CHAT SERVICE] addMessage appelé avec:', { sessionId, content: content.substring(0, 50) + '...', senderId })
  return api.post(`/sessions/${sessionId}/messages/add/`, { content, sender_id: senderId })
    .then(r => {
      console.log('✅ [CHAT SERVICE] Réponse addMessage:', r.data)
      return r.data
    })
    .catch(error => {
      console.error('❌ [CHAT SERVICE] Erreur addMessage:', error.response?.data || error.message)
      throw error
    })
};

export const listMessages = (sessionId) => {
  console.log('📡 [CHAT SERVICE] listMessages appelé pour session:', sessionId)
  return api.get(`/sessions/${sessionId}/messages/`)
    .then(r => {
      console.log('✅ [CHAT SERVICE] Réponse listMessages:', r.data)
      return r.data
    })
    .catch(error => {
      console.error('❌ [CHAT SERVICE] Erreur listMessages:', error.response?.data || error.message)
      throw error
    })
};

export const deleteMessage = (messageId) =>
  api.delete(`/messages/${messageId}/delete/`).then(r => r.data);

// Fonctions de compatibilité avec l'ancien code
export const getMessages = listMessages;
