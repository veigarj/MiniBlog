import {db} from '../firebase/config'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  const auth = getAuth()

  // Cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  function checkIfIsCancelled() {
    if(cancelled) {
      return
    }
  }


  const createUser = async (data) => {
    checkIfIsCancelled

    setLoading(true)

    try {
      const {user} = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      // atualização do user com o nome enviado
      await updateProfile(user, {
        displayName: data.displayName
      })

    } catch (error) {
      console.log(error.message)
      console.log(typeof error.message)

      let systemErrorMessage

      if(error.message)
      
    }
    setLoading(false)
  }
  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
  }
}