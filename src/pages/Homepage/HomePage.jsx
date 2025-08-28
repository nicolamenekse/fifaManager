import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Homepage.module.css'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/auth/authSelectors'

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Sayfa yüklendiğinde animasyon için
    const timer2 = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      clearInterval(timer);
      clearTimeout(timer2);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.homeContainer}>
      {/* Background Video/Image Overlay */}
      <div className={styles.backgroundOverlay}></div>
      
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <div className={styles.fifaLogo}>
            <span className={styles.fifaText}>FIFA</span>
            <span className={styles.managerText}>MANAGER</span>
            <span className={styles.yearText}>2007</span>
          </div>
        </div>
        
        <div className={styles.timeSection}>
          <div className={styles.timeDisplay}>
            <div className={styles.time}>{formatTime(currentTime)}</div>
            <div className={styles.date}>{formatDate(currentTime)}</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`${styles.mainContent} ${isLoaded ? styles.loaded : ''}`}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.mainTitle}>
            <span className={styles.welcomeText}>Hoş Geldiniz</span>
            <span className={styles.gameTitle}>FIFA Manager 2007</span>
            <span className={styles.tagline}>Futbol Dünyasının Efendisi Olun</span>
          </h1>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚽</div>
            <h3>Maç Yönetimi</h3>
            <p>Takımınızı yönetin, stratejiler geliştirin</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💰</div>
            <h3>Transfer Pazarı</h3>
            <p>En iyi oyuncuları transfer edin</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏆</div>
            <h3>Başarılar</h3>
            <p>Kupaları kazanın, efsane olun</p>
          </div>
        </div>

        <div className={styles.actionSection}>
          {!isLoggedIn ? (
            <div className={styles.authButtons}>
              <Link to="/register" className={`${styles.button} ${styles.registerBtn}`}>
                <span className={styles.buttonIcon}>📝</span>
                <span className={styles.buttonText}>Kayıt Ol</span>
              </Link>
              <Link to="/login" className={`${styles.button} ${styles.loginBtn}`}>
                <span className={styles.buttonIcon}>🔑</span>
                <span className={styles.buttonText}>Giriş Yap</span>
              </Link>
            </div>
          ) : (
            <div className={styles.gameButtons}>
              <Link to="/match" className={`${styles.button} ${styles.matchBtn}`}>
                <span className={styles.buttonIcon}>⚽</span>
                <span className={styles.buttonText}>Maça Başla</span>
              </Link>
              <Link to="/market" className={`${styles.button} ${styles.marketBtn}`}>
                <span className={styles.buttonIcon}>🛒</span>
                <span className={styles.buttonText}>Transfer Pazarı</span>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2024 FIFA Manager 2007 - Futbol Yönetim Simülasyonu</p>
          <div className={styles.footerLinks}>
            <span>Yardım</span>
            <span>Hakkında</span>
            <span>İletişim</span>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <div className={styles.floatingElements}>
        <div className={styles.floatingBall}>⚽</div>
        <div className={styles.floatingBall}>⚽</div>
        <div className={styles.floatingBall}>⚽</div>
      </div>
    </div>
  )
}
