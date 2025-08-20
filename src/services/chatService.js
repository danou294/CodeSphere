import api from "./http";

export const createSession = (title = "New Session") =>
  api.post("/sessions/create/", { title }).then(r => r.data);

export const listSessions = () =>
  api.get("/sessions/").then(r => r.data);

export const deleteSession = (sessionId) =>
  api.delete(`/sessions/${sessionId}/delete/`).then(r => r.data);

export const addMessage = (sessionId, content) =>
  api.post(`/sessions/${sessionId}/messages/add/`, { content }).then(r => r.data);

export const listMessages = (sessionId) =>
  api.get(`/sessions/${sessionId}/messages/`).then(r => r.data);

export const deleteMessage = (messageId) =>
  api.delete(`/messages/${messageId}/delete/`).then(r => r.data);

// Fonctions de compatibilité avec l'ancien code
export const getMessages = listMessages;
