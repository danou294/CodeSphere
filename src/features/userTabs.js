// src/features/userTabs.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tabs: [], // Liste des onglets chargés
    currentTab: null, // Onglet actuellement actif
    isDirty: false, // Indicateur pour savoir si des modifications ont été apportées sans être sauvegardées
};

export const userTabsSlice = createSlice({
    name: 'userTabs',
    initialState,
    reducers: {
        setTabs: (state, action) => {
            state.tabs = action.payload;
        },
        updateTab: (state, action) => {
            const tab = state.tabs.find(obj => obj.id === action.payload.id);
            if (tab) {
                tab.code = action.payload.value;
                state.isDirty = true; // Marquer comme modifié
            }
        },
        setCurrentTab: (state, action) => {
            state.currentTab = action.payload;
        },
        saveChanges: (state) => {
            state.isDirty = false; // Réinitialiser le statut de modification après la sauvegarde
        }
    },
});

export const { setTabs, updateTab, setCurrentTab, saveChanges } = userTabsSlice.actions;
export default userTabsSlice.reducer;
