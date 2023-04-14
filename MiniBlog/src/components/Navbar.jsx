import styles from './Navbar.module.css'

import { NavLink, Link } from 'react-router-dom'

import { useAuthentication } from '../hooks/useAuthentication'
import { useAuthValue } from '../context/AuthContext'

const Navbar = () => {
  const {user} = useAuthValue();
  const {logout} = useAuthentication();
 


  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </Link>
      <ul className={styles.links_list}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
       {!user &&  (
       <>
       <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Cadastro</NavLink>
        </li>
       </>
        )}
        {user && (
           <>
           <li>
              <NavLink to="/post/create">Novo Poste</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
           </>
        )}
        <li>
        <NavLink to="/about">Sobre</NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar