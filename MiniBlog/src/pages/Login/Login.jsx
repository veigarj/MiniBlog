import styles from './Login.module.css'

import { useAuthentication } from '../../hooks/useAuthentication'


import { useState, useEffect } from 'react'

const Login = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const {login, error: AuthError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault()

    // zera os erros
    setError("")

    // creat user fron inputs
    const user = {
      email,
      password
    }
   
    const res = await login(user);

    console.log(res);
  }

  useEffect(() => {
    if(AuthError) {
      setError(AuthError)
    }
  }, [AuthError])

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <p>Faça o login para acessar o sistema</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input type="email" name='email' required placeholder='E-mail do usuário'
          value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Senha:</span>
          <input type="password" name='password' required placeholder='Senha do usuário' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        
        {/* função de loading */}
        {!loading && <button className='btn'>Entrar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {/* função de erro  */}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Login