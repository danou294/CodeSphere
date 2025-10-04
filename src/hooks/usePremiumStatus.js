import { useState, useEffect } from 'react'
import { useAuth } from '../components/Contexts/AuthContext'
import { firestore } from '../firebaseConfig'
import firebase from 'firebase/app'

export const usePremiumStatus = () => {
  const { currentUser } = useAuth()
  const [isPremium, setIsPremium] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkPremiumStatus = async () => {
      if (!currentUser) {
        setIsLoading(false)
        return
      }

      try {
        console.log('🔍 [PREMIUM CHECK] Vérification statut premium pour:', currentUser.uid)
        
        // Récupérer les données utilisateur depuis Firebase
        const userRef = firestore.collection('users').doc(currentUser.uid)
        const userDoc = await userRef.get()
        
        if (userDoc.exists) {
          const userData = userDoc.data()
          const hasPaid = userData.hasPaidForChatbot || false
          
          console.log('🔍 [PREMIUM CHECK] Statut Firebase:', { hasPaid, userData })
          
          setIsPremium(hasPaid)
          
          // Si l'utilisateur n'est pas premium, vérifier s'il y a un session_id dans l'URL
          if (!hasPaid) {
            const urlParams = new URLSearchParams(window.location.search)
            const sessionId = urlParams.get('session_id')
            const success = urlParams.get('success')
            
            if (success === 'true' && sessionId) {
              console.log('🔍 [PREMIUM CHECK] Paiement détecté, mise à jour du statut...')
              
              // Mettre à jour le statut premium dans Firebase
              await userRef.update({
                hasPaidForChatbot: true,
                premiumStatus: 'active',
                stripeSessionId: sessionId,
                premiumActivatedAt: firebase.firestore.FieldValue.serverTimestamp()
              })
              
              console.log('✅ [PREMIUM CHECK] Statut premium mis à jour avec succès')
              setIsPremium(true)
              
              // Nettoyer l'URL
              const newUrl = window.location.pathname
              window.history.replaceState({}, document.title, newUrl)
            }
          }
        } else {
          console.warn('⚠️ [PREMIUM CHECK] Utilisateur non trouvé dans Firebase')
          setIsPremium(false)
        }
      } catch (error) {
        console.error('❌ [PREMIUM CHECK] Erreur vérification statut premium:', error)
        setIsPremium(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkPremiumStatus()
  }, [currentUser])

  return { isPremium, isLoading }
}
