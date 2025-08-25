import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIState {
  // Sidebar
  isSidebarOpen: boolean
  sidebarWidth: number
  
  // Panels
  isPreviewPanelOpen: boolean
  isSettingsPanelOpen: boolean
  
  // IDE Settings
  editorTheme: 'vs-dark' | 'vs-light'
  editorFontSize: number
  showLineNumbers: boolean
  showMinimap: boolean
  wordWrap: 'on' | 'off' | 'wordWrapColumn' | 'bounded'
  
  // Actions
  toggleSidebar: () => void
  setSidebarWidth: (width: number) => void
  togglePreviewPanel: () => void
  toggleSettingsPanel: () => void
  setEditorTheme: (theme: 'vs-dark' | 'vs-light') => void
  setEditorFontSize: (size: number) => void
  setShowLineNumbers: (show: boolean) => void
  setShowMinimap: (show: boolean) => void
  setWordWrap: (wrap: 'on' | 'off' | 'wordWrapColumn' | 'bounded') => void
  resetUISettings: () => void
}

const defaultUISettings = {
  isSidebarOpen: true,
  sidebarWidth: 250,
  isPreviewPanelOpen: true,
  isSettingsPanelOpen: false,
  editorTheme: 'vs-dark' as const,
  editorFontSize: 14,
  showLineNumbers: true,
  showMinimap: false,
  wordWrap: 'on' as const
}

export const useUIStore = create<UIState>()(
  devtools(
    (set, get) => ({
      ...defaultUISettings,

      toggleSidebar: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
      },

      setSidebarWidth: (width: number) => {
        set({ sidebarWidth: Math.max(200, Math.min(400, width)) })
      },

      togglePreviewPanel: () => {
        set((state) => ({ isPreviewPanelOpen: !state.isPreviewPanelOpen }))
      },

      toggleSettingsPanel: () => {
        set((state) => ({ isSettingsPanelOpen: !state.isSettingsPanelOpen }))
      },

      setEditorTheme: (theme: 'vs-dark' | 'vs-light') => {
        set({ editorTheme: theme })
      },

      setEditorFontSize: (size: number) => {
        set({ editorFontSize: Math.max(10, Math.min(24, size)) })
      },

      setShowLineNumbers: (show: boolean) => {
        set({ showLineNumbers: show })
      },

      setShowMinimap: (show: boolean) => {
        set({ showMinimap: show })
      },

      setWordWrap: (wrap: 'on' | 'off' | 'wordWrapColumn' | 'bounded') => {
        set({ wordWrap: wrap })
      },

      resetUISettings: () => {
        set(defaultUISettings)
      }
    }),
    {
      name: 'ui-store'
    }
  )
)
