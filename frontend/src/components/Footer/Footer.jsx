import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerGrid}>
                    <div className={styles.footerBrand}>
                        <div className={styles.footerLogo}>
                            <div className={styles.logoIcon}>Q</div>
                            <div className={styles.logoText}>
                                QREDIF
                                <span className={styles.aiHighlight}>AI</span>
                            </div>
                        </div>
                        <p className={styles.tagline}>
                            Where Top Talent Meets Dream Jobs - Seamlessly.
                        </p>
                        <div className={styles.socialLinks}>
                            <a
                                href="#"
                                className={styles.socialLink}
                                aria-label="LinkedIn"
                            >
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a
                                href="#"
                                className={styles.socialLink}
                                aria-label="Twitter"
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a
                                href="#"
                                className={styles.socialLink}
                                aria-label="Instagram"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>

                    <div className={styles.footerLinks}>
                        <h3 className={styles.footerHeading}>Quick Links</h3>
                        <ul className={styles.linksList}>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/jobs">Jobs</Link>
                            </li>
                            <li>
                                <Link to="/companies">Companies</Link>
                            </li>
                            <li>
                                <Link to="/about">About Us</Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.footerLinks}>
                        <h3 className={styles.footerHeading}>For Candidates</h3>
                        <ul className={styles.linksList}>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/profile">My Profile</Link>
                            </li>
                            <li>
                                <Link to="/saved-jobs">Saved Jobs</Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.footerLinks}>
                        <h3 className={styles.footerHeading}>For Recruiters</h3>
                        <ul className={styles.linksList}>
                            <li>
                                <Link to="/recruiter-login">
                                    Recruiter Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/post-job">Post a Job</Link>
                            </li>
                            <li>
                                <Link to="/pricing">Pricing</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        &copy; {currentYear} QREDIF
                        <span className={styles.aiHighlight}>AI</span>. All
                        rights reserved.
                    </p>
                    <div className={styles.footerBottomLinks}>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
