import './App.css'
import {BrowserRouter, Router, Route, Navigate, Routes} from 'react-router-dom'

// context
import { AuthProvider } from '../src/context/AuthContext'

// mapeia a auth do user
import { onAuthStateChanged } from 'firebase/auth'

// hooks
import { useEffect, useState } from 'react'
import { useAuthentication } from './hooks/useAuthentication'


// pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'


function App() {
  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  // map se user esta autenticado
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth]);

  if(loadingUser){
    return <div>Carregando...</div>
  }

  return (
    <div className="App">
     <AuthProvider value={{user}}>
     <BrowserRouter>
      <Navbar/>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
      <Footer />
      </BrowserRouter>
     </AuthProvider>
    </div>
  )
}

export default App
