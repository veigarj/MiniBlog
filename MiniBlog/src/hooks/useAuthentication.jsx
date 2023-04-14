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

// creat user
  const createUser = async (data) => {
    checkIfIsCancelled

    setLoading(true)
    setError(null)

    try {
      const {user} = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      // atualiza user com o nome enviado
      await updateProfile(user, {
        displayName: data.displayName
      })

      setLoading(false)

    } catch (error) {
      console.log(error.message)
      console.log(typeof error.message)

      // definição de erros
      let systemErrorMessage

      if(error.message.includes("Password")) {
        systemErrorMessage = "A  senha deve conter pelo menos 6 caracteres"
      } else if(error.message.includes('email-already')) {
        systemErrorMessage = "Esse email já está em uso"
      } else {
        systemErrorMessage = "Ocorreu um erro ao tentar cadastrar"
      }
      setLoading(false)
      // imprime o erro
      setError(systemErrorMessage)
    }
    
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