import { useState, useEffect } from 'react'
import { useAuth } from '../components/Contexts/AuthContext'
import { firestore } from '../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

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
        const userRef = doc(firestore, 'users', currentUser.uid)
        const userDoc = await getDoc(userRef)
        
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
