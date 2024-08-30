// projectStore.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Définir l'état initial pour les projets
const initialState = {
    htmlCode: '',
    cssCode: '',
    jsCode: '',
    previewVisible: false, // Par défaut, la prévisualisation est désactivée
    // Ajoutez d'autres propriétés si nécessaire
};

// Créer le slice pour le projet
const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        // Action pour mettre à jour le code
        updateCode: (state, action) => {
            const { lang, value } = action.payload;
            if (lang === 'html') {
                state.html = value;
            } else if (lang === 'css') {
                state.css = value;
            } else if (lang === 'javascript') {
                state.javascript = value;
            }
        },
        // Action pour afficher ou masquer la prévisualisation
        setPreviewVisible: (state, action) => {
            state.previewVisible = action.payload;
        },
        // Action pour basculer la prévisualisation
        togglePreview: (state) => {
            state.previewVisible = !state.previewVisible;
        },
        // Ajoutez d'autres actions si nécessaire
        setInitialCode: (state, action) => {
            const { html, css, javascript } = action.payload;
            state.htmlCode = html;
            state.cssCode = css;
            state.jsCode = javascript;
        }
    },
});

// Configuration du store
export const { updateCode, setPreviewVisible, togglePreview, setInitialCode } = projectSlice.actions;

// Création et exportation du store
export function createProjectStore(initialData) {
    const store = configureStore({
        reducer: {
            project: projectSlice.reducer,
        },
        preloadedState: {
            project: {
                ...initialState,
                html: initialData.html,
                css: initialData.css,
                javascript: initialData.javascript,
            },
        },
    });

    return { store, actions: projectSlice.actions };
}

export default projectSlice.reducer;
