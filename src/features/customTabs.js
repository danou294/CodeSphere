// src/features/customTabs.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = []; // Assurez-vous que l'état initial est un tableau vide

export const customTabsSlice = createSlice({
    name: 'customTabs',
    initialState,
    reducers: {
        setTabs: (state, action) => {
            console.log("setTabs action payload:", action.payload); // Log pour vérifier les données reçues
            return action.payload; // Remplacer l'état actuel par les données fournies
        },
        updateTab: (state, action) => {
            const tab = state.find(obj => obj.id === action.payload.id);
            if (tab) {
                console.log("Updating tab:", tab.id, "with new code:", action.payload.value); // Log pour le débogage
                tab.code = action.payload.value;
            }
        },
        updateCode: (state, action) => {
            const tab = state.find(obj => obj.id === action.payload.id);
            if (tab) {
                console.log("Updating code for tab:", tab.id, "with new code:", action.payload.value); // Log pour le débogage
                tab.code = action.payload.value;
            }
        },
    },
});

export const { setTabs, updateTab, updateCode } = customTabsSlice.actions;
export default customTabsSlice.reducer;
