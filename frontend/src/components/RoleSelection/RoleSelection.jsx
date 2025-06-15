import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./RoleSelection.module.css";

const RoleSelection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedRole, setSelectedRole] = useState("");
    const [error, setError] = useState(null);

    // Check if this is an OAuth signup flow
    const isOAuth = location.state?.isOAuth;
    const oauthData = location.state?.oauthData;

    const handleOAuthSignup = async (role) => {
        try {
            const response = await fetch(
                "http://localhost:8000/auth/oauth-signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...oauthData,
                        role: role,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                // Store user data in localStorage
                localStorage.setItem("user", JSON.stringify(data.user));
                // Navigate to home page
                navigate("/");
            } else {
                setError(data.error || "Failed to complete signup");
            }
        } catch (err) {
            setError(err.message);
            console.error("OAuth signup error:", err);
        }
    };

    const handleRegularRoleSelection = async (role) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                throw new Error("User not found");
            }

            const response = await fetch(
                "http://localhost:8000/auth/update-role",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firebaseUID: user.firebaseUID,
                        role: role,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                // Update user data in localStorage with the new role
                const updatedUser = { ...user, role };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                // Navigate to home page
                navigate("/");
            } else {
                setError(data.error || "Failed to update role");
            }
        } catch (err) {
            setError(err.message);
            console.error("Role selection error:", err);
        }
    };

    const handleRoleSelection = async (role) => {
        if (isOAuth && oauthData) {
            await handleOAuthSignup(role);
        } else {
            await handleRegularRoleSelection(role);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Select Your Role</h2>
                <p className={styles.description}>
                    {isOAuth
                        ? "Please choose your role to complete signup"
                        : "Please choose whether you are a candidate or recruiter"}
                </p>

                <div className={styles.roleOptions}>
                    <button
                        className={`${styles.roleButton} ${
                            selectedRole === "candidate" ? styles.selected : ""
                        }`}
                        onClick={() => setSelectedRole("candidate")}
                    >
                        Candidate
                    </button>
                    <button
                        className={`${styles.roleButton} ${
                            selectedRole === "recruiter" ? styles.selected : ""
                        }`}
                        onClick={() => setSelectedRole("recruiter")}
                    >
                        Recruiter
                    </button>
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <button
                    className={styles.continueButton}
                    onClick={() => handleRoleSelection(selectedRole)}
                    disabled={!selectedRole}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default RoleSelection;
