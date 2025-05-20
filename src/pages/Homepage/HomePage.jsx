import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Homepage.module.css'

export default function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>FIFA Manager 2007</h1>
      <div className={styles.buttonContainer}>
        <Link to="/register" className={styles.button}>Register</Link>
        <Link to="/login" className={styles.button}>Login</Link>
      </div>
      <p className={styles.subtitle}>Take control of your dream team</p>
    </div>
  )
}
