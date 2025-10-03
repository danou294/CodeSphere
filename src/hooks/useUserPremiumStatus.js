import { useState, useEffect } from 'react'
import { useAuth } from '../components/Contexts/AuthContext'
import { firestore } from '../firebaseConfig'

export const useUserPremiumStatus = () => {
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
        const userRef = firestore.collection('users').doc(currentUser.uid)
        const userDoc = await userRef.get()
        
        if (userDoc.exists()) {
          const userData = userDoc.data()
          const hasPaid = userData.hasPaidForChatbot || false
          setIsPremium(hasPaid)
        } else {
          setIsPremium(false)
        }
      } catch (error) {
        console.error('❌ [PREMIUM STATUS] Erreur vérification statut premium:', error)
        setIsPremium(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkPremiumStatus()
  }, [currentUser])

  return { isPremium, isLoading }
}
