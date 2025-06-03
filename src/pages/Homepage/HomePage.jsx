import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Homepage.module.css'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/auth/authSelectors'

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>FIFA Manager 2007</h1>
      <div className={styles.buttonContainer}>
        {!isLoggedIn ? (
          <>
            <Link to="/register" className={styles.button}>Register</Link>
            <Link to="/login" className={styles.button}>Login</Link>
          </>
        ) : (
          <>
            <Link to="/match" className={styles.button}>Match</Link>
            <Link to="/market" className={styles.button}>Market</Link>
          </>
        )}
      </div>
      <p className={styles.subtitle}>Yenilginin tadını çıkar orhaaaaaaaaaağn</p>
    </div>
  )
}
