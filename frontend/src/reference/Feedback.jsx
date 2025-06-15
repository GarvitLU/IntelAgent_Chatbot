import { useState } from 'react';
import Usage from '../components/Usage';
import SplitText from '../components/SplitText';
import Logo from '../components/Logo';
import styles from './Feedback.module.css';

const Feedback = () => {
  return (
    // Main container with gradient background
    <div className={styles.container}>
      {/* Pattern overlay for visual depth */}
      <div className={styles.patternOverlay} />
      
      {/* Glow effect for ambient lighting */}
      <div className={styles.glowEffect} />
      
      {/* Main content wrapper */}
      <div className={styles.content}>
        {/* Header section with logo and title */}
        <div className={styles.headerSection}>
          {/* Logo container */}
          <div className={styles.logoContainer}>
            <img 
              src="/Logo.png"
              alt="Q Logo"
              className={styles.logo}
            />
          </div>
          
          {/* Animated title text */}
          <SplitText 
            text="Where Talent Meets Opportunity" 
            className={styles.title}
          />
        </div>
        <Usage />
      </div>
    </div>
  );
};

export default Feedback;
