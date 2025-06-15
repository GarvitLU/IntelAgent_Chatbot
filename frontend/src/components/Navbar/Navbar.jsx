import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = ({ user, onLogout }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    <div className={styles.logoIcon}>Q</div>
                    <div className={styles.logoText}>Qredifai</div>
                </Link>

                {/* Mobile menu toggle */}
                <div
                    className={`${styles.mobileMenuToggle} ${
                        mobileMenuOpen ? styles.open : ""
                    }`}
                    onClick={toggleMobileMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* Nav links and user actions */}
                <div
                    className={`${styles.navContainer} ${
                        mobileMenuOpen ? styles.open : ""
                    }`}
                >
                    <div className={styles.navLinks}>
                        <Link
                            to="/"
                            className={
                                location.pathname === "/"
                                    ? styles.activeLink
                                    : styles.navLink
                            }
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            className={
                                location.pathname === "/jobs"
                                    ? styles.activeLink
                                    : styles.navLink
                            }
                        >
                            Jobs
                        </Link>
                        <Link
                            to="/companies"
                            className={
                                location.pathname === "/companies"
                                    ? styles.activeLink
                                    : styles.navLink
                            }
                        >
                            Companies
                        </Link>
                        <Link
                            to="/about"
                            className={
                                location.pathname === "/about"
                                    ? styles.activeLink
                                    : styles.navLink
                            }
                        >
                            About
                        </Link>
                    </div>

                    <div className={styles.navActions}>
                        {user ? (
                            <>
                                <Link
                                    to="/profile"
                                    className={styles.profileLink}
                                >
                                    {user.profilePicture ? (
                                        <img
                                            src={user.profilePicture}
                                            alt={`${user.firstName} ${user.lastName}`}
                                            className={styles.profilePic}
                                        />
                                    ) : (
                                        <div className={styles.profileInitials}>
                                            {user.firstName?.[0]}
                                            {user.lastName?.[0]}
                                        </div>
                                    )}
                                    <span className={styles.profileName}>
                                        {user.firstName} {user.lastName}
                                    </span>
                                </Link>
                                <button
                                    onClick={onLogout}
                                    className={styles.logoutBtn}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={styles.loginBtn}>
                                    Login
                                </Link>
                                <Link to="/signup" className={styles.signupBtn}>
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
