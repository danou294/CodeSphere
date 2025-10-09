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
        // Récupérer les données utilisateur depuis Firebase
        const userRef = firestore.collection('users').doc(currentUser.uid)
        const userDoc = await userRef.get()
        
        if (userDoc.exists) {
          const userData = userDoc.data()
          const hasPaid = userData.hasPaidForChatbot || false
          
          setIsPremium(hasPaid)
          
          // Si l'utilisateur n'est pas premium, vérifier s'il y a un session_id dans l'URL
          if (!hasPaid) {
            const urlParams = new URLSearchParams(window.location.search)
            const sessionId = urlParams.get('session_id')
            const success = urlParams.get('success')
            
            if (success === 'true' && sessionId) {
              // Mettre à jour le statut premium dans Firebase
              await userRef.update({
                hasPaidForChatbot: true,
                premiumStatus: 'active',
                stripeSessionId: sessionId,
                premiumActivatedAt: firebase.firestore.FieldValue.serverTimestamp()
              })
              
              setIsPremium(true)
              
              // Nettoyer l'URL
              const newUrl = window.location.pathname
              window.history.replaceState({}, document.title, newUrl)
            }
          }
        } else {
          // Créer le document utilisateur s'il n'existe pas
          const userData = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            hasPaidForChatbot: false,
            premiumStatus: 'inactive',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLoginAt: firebase.firestore.FieldValue.serverTimestamp()
          }
          
          try {
            await userRef.set(userData)
            setIsPremium(false)
            
            // Vérifier s'il y a un session_id dans l'URL après création
            const urlParams = new URLSearchParams(window.location.search)
            const sessionId = urlParams.get('session_id')
            const success = urlParams.get('success')
            
            if (success === 'true' && sessionId) {
              await userRef.update({
                hasPaidForChatbot: true,
                premiumStatus: 'active',
                stripeSessionId: sessionId,
                premiumActivatedAt: firebase.firestore.FieldValue.serverTimestamp()
              })
              
              setIsPremium(true)
              
              // Nettoyer l'URL
              const newUrl = window.location.pathname
              window.history.replaceState({}, document.title, newUrl)
            }
          } catch (createError) {
            console.error('❌ [PREMIUM CHECK] Erreur création document utilisateur:', createError)
            setIsPremium(false)
          }
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