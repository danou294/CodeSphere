import { useEffect } from 'react'
import { auth } from '../firebaseConfig'

/**
 * Hook pour gérer la persistance de session Firebase
 * Évite les déconnexions automatiques en rafraîchissant les tokens
 */
export const useSessionPersistence = () => {
  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        try {
          // Rafraîchir le token toutes les 50 minutes (avant expiration à 1h)
          const tokenResult = await user.getIdToken(true)
          
          // Programmer le prochain rafraîchissement
          setTimeout(async () => {
            try {
              await user.getIdToken(true)
            } catch (error) {
              console.error('❌ Erreur rafraîchissement automatique:', error)
            }
          }, 50 * 60 * 1000) // 50 minutes
          
        } catch (error) {
          console.error('❌ Erreur lors du rafraîchissement du token:', error)
        }
      }
    })

    return unsubscribe
  }, [])
}
