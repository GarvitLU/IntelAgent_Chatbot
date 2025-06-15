import React, { useState, useEffect } from "react";
import styles from "./EmailVerificationPrompt.module.css";

const EmailVerificationPrompt = ({ email, onVerificationComplete }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [uid, setUid] = useState(null);

    useEffect(() => {
        // Get user data from localStorage to get the UID
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const user = JSON.parse(userData);
                if (user.firebaseUID) {
                    setUid(user.firebaseUID);
                }
            } catch (err) {
                console.error("Error parsing user data:", err);
            }
        }
    }, []);

    const handleResendVerification = async () => {
        if (!email || !uid) {
            setError("User information is missing");
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            console.log("Sending request with:", { email, uid }); // Debug log

            const response = await fetch(
                "http://localhost:8000/auth/resend-verification",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, uid }),
                }
            );

            const data = await response.json();
            console.log("Response:", response.status, data); // Debug log

            if (response.ok) {
                setSuccessMessage(data.message);
            } else {
                setError(data.error || "Failed to send verification email");
            }
        } catch (err) {
            console.error("Error details:", err); // Debug log
            setError("Failed to send verification email. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Debug log
    console.log("EmailVerificationPrompt rendered with:", { email, uid });

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Email Verification Required</h2>

                <p className={styles.message}>
                    Please verify your email address to access all features.
                </p>

                <p className={styles.email}>
                    A verification link has been sent to:{" "}
                    <strong>{email}</strong>
                </p>

                <button
                    onClick={handleResendVerification}
                    disabled={isLoading || !uid}
                    className={styles.button}
                >
                    {isLoading ? "Sending..." : "Resend Verification Email"}
                </button>

                {error && <p className={styles.error}>{error}</p>}

                {successMessage && (
                    <p className={styles.success}>{successMessage}</p>
                )}
            </div>
        </div>
    );
};

export default EmailVerificationPrompt;
