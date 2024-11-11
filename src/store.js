import { configureStore } from '@reduxjs/toolkit'
import tabs from './features/tabs'
import preview from './features/preview'
import customTabsReducer from './features/customTabs.js'
import userTabsReducer from './features/userTabs.js'

export const store = configureStore({
  reducer: {
    tabs,
    preview,
    customTabs: customTabsReducer,
    userTabs: userTabsReducer,
  },
})
