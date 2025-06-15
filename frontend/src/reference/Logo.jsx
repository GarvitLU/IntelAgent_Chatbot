import styles from './Logo.module.css';

const Logo = () => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={styles.logo}
  >
    <circle 
      cx="50" 
      cy="50" 
      r="40" 
      stroke="url(#gradient)" 
      strokeWidth="3" 
      fill="none"
    />
    <defs>
      <linearGradient 
        id="gradient" 
        x1="0" 
        y1="0" 
        x2="100" 
        y2="100"
      >
        <stop offset="0%" stopColor="#fff" />
        <stop offset="100%" stopColor="#9063E8" />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo; 