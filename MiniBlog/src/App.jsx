import './App.css'

import {BrowserRouter, Router, Route, Navigate, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'

function App() {
  

  return (
    <div className="App">
      <h1>MiniBlog</h1>
      <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />}  />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  )
}

export default App
