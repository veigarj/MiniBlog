import styles from './Navbar.module.css'

import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </Link>
      <ul className={styles.links_list}>
        <li>
          <NavLink to="/" className={styles.links}>Home</NavLink>
        </li>
        <li>
        <NavLink to="/about">Sobre</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar