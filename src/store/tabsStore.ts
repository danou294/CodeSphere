import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Tab {
  id: string
  title: string
  type: 'html' | 'css' | 'js'
  content: string
  isActive: boolean
}

interface TabsState {
  tabs: Tab[]
  activeTabId: string | null
  addTab: (tab: Omit<Tab, 'id' | 'isActive'>) => void
  removeTab: (id: string) => void
  setActiveTab: (id: string) => void
  updateTabContent: (id: string, content: string) => void
  updateTabTitle: (id: string, title: string) => void
  resetTabs: () => void
}

const defaultTabs: Tab[] = [
  {
    id: 'html',
    title: 'HTML',
    type: 'html',
    content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mon Projet</title>\n</head>\n<body>\n  <h1>Bienvenue sur CodeSphere !</h1>\n  <p>Commencez à coder dès maintenant.</p>\n</body>\n</html>',
    isActive: true
  },
  {
    id: 'css',
    title: 'CSS',
    type: 'css',
    content: 'body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  min-height: 100vh;\n}\n\nh1 {\n  text-align: center;\n  margin-bottom: 20px;\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n}\n\np {\n  text-align: center;\n  font-size: 18px;\n}',
    isActive: false
  },
  {
    id: 'js',
    title: 'JavaScript',
    type: 'js',
    isActive: false
  }
]

export const useTabsStore = create<TabsState>()(
  devtools(
    (set, _get) => ({
      tabs: defaultTabs,
      activeTabId: 'html',

      addTab: (tab) => {
        const newTab: Tab = {
          ...tab,
          id: `tab-${Date.now()}`,
          isActive: false
        }
        set((state) => ({
          tabs: [...state.tabs, newTab]
        }))
      },

      removeTab: (id) => {
        set((state) => {
          const newTabs = state.tabs.filter(tab => tab.id !== id)
          const newActiveTabId = state.activeTabId === id 
            ? (newTabs[0]?.id || null)
            : state.activeTabId

          return {
            tabs: newTabs,
            activeTabId: newActiveTabId
          }
        })
      },

      setActiveTab: (id) => {
        set((state) => ({
          tabs: state.tabs.map(tab => ({
            ...tab,
            isActive: tab.id === id
          })),
          activeTabId: id
        }))
      },

      updateTabContent: (id, content) => {
        set((state) => ({
          tabs: state.tabs.map(tab =>
            tab.id === id ? { ...tab, content } : tab
          )
        }))
      },

      updateTabTitle: (id, title) => {
        set((state) => ({
          tabs: state.tabs.map(tab =>
            tab.id === id ? { ...tab, title } : tab
          )
        }))
      },

      resetTabs: () => {
        set({
          tabs: defaultTabs,
          activeTabId: 'html'
        })
      }
    }),
    {
      name: 'tabs-store'
    }
  )
)
