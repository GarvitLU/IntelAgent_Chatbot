import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EmailVerificationSuccess.module.css";

const EmailVerificationSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to role selection after 3 seconds
        const timer = setTimeout(() => {
            navigate("/role-selection");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={styles["verification-success-container"]}>
            <div className={styles["verification-card"]}>
                <div className={styles["success-icon"]}>
                    <i className="fas fa-check-circle"></i>
                </div>
                <h1>Email Verified Successfully!</h1>
                <p>
                    Your email has been verified. You will be redirected to
                    select your role in a moment.
                </p>
            </div>
        </div>
    );
};

export default EmailVerificationSuccess;
