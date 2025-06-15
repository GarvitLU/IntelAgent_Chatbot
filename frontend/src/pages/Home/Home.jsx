import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailVerificationPrompt from "../../components/EmailVerificationPrompt/EmailVerificationPrompt";
import { checkVerificationStatus } from "../../api/auth";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import Jobs from "../../components/Jobs/Jobs";
import Companies from "../../components/Companies/Companies";
import Testimonials from "../../components/Testimonials/Testimonials";
import Faqs from "../../components/Faqs/Faqs";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showVerificationPrompt, setShowVerificationPrompt] = useState(false);
    const [isCheckingVerification, setIsCheckingVerification] = useState(false);

    // Function to check verification status from the server
    const verifyUser = async (uid) => {
        if (isCheckingVerification) return;

        setIsCheckingVerification(true);
        try {
            const isVerified = await checkVerificationStatus(uid);

            if (isVerified) {
                // Get current user data from localStorage to preserve all fields
                const currentUser = JSON.parse(localStorage.getItem("user"));

                if (currentUser) {
                    // Update local user data while preserving existing fields
                    const updatedUser = {
                        ...currentUser,
                        verified: true,
                    };
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    setUser(updatedUser);
                    setShowVerificationPrompt(false);
                }
            }
        } catch (error) {
            console.error("Error checking verification status:", error);
        } finally {
            setIsCheckingVerification(false);
        }
    };

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            // If no user data, don't navigate away but show public home page
            setUser(null);
            return;
        }

        try {
            const parsedUser = JSON.parse(userData);
            console.log("Loaded user data:", parsedUser);

            // Validate required user data
            if (!parsedUser || !parsedUser.email || !parsedUser.firebaseUID) {
                console.error("Invalid user data:", parsedUser);
                localStorage.removeItem("user");
                setUser(null);
                return;
            }

            setUser(parsedUser);

            // Show verification prompt if user is not verified
            if (!parsedUser.verified) {
                setShowVerificationPrompt(true);
                // Check verification status from server
                verifyUser(parsedUser.firebaseUID);
            } else {
                setShowVerificationPrompt(false);
            }
        } catch (err) {
            console.error("Error parsing user data:", err);
            localStorage.removeItem("user");
            setUser(null);
        }
    }, [navigate]);

    // Set up polling to check verification status periodically
    useEffect(() => {
        if (user && !user.verified) {
            const interval = setInterval(() => {
                verifyUser(user.firebaseUID);
            }, 5000); // Check every 5 seconds

            return () => clearInterval(interval);
        }
    }, [user]);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "user") {
                if (!event.newValue) {
                    setUser(null);
                    return;
                }

                try {
                    const updatedUser = JSON.parse(event.newValue);
                    console.log("Storage updated user data:", updatedUser);

                    if (
                        !updatedUser ||
                        !updatedUser.email ||
                        !updatedUser.firebaseUID
                    ) {
                        console.error(
                            "Invalid updated user data:",
                            updatedUser
                        );
                        setUser(null);
                        return;
                    }

                    setUser(updatedUser);
                    setShowVerificationPrompt(!updatedUser.verified);
                } catch (err) {
                    console.error("Error handling storage change:", err);
                    setUser(null);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    const handleVerificationComplete = () => {
        if (!user) return;
        // Check verification status immediately after user indicates completion
        verifyUser(user.firebaseUID);
    };

    return (
        <div className={styles.pageContainer}>
            {showVerificationPrompt && (
                <EmailVerificationPrompt
                    email={user.email}
                    onVerificationComplete={handleVerificationComplete}
                />
            )}

            <Navbar user={user} onLogout={handleLogout} />

            <main className={styles.mainContent}>
                <Hero />
                <Features />
                <Jobs />
                <Companies />
                <Testimonials />
                <Faqs />
            </main>

            <Footer />
        </div>
    );
};

export default Home;
