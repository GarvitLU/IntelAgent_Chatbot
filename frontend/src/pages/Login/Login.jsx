import React, { useState, useEffect } from "react";
import { signInWithGoogle, signInWithLinkedIn } from "../../config/firebase";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [signInData, setSignInData] = useState({
        email: "",
        password: "",
    });
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

    // Check if user is already logged in
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            navigate("/");
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignInInputChange = (e) => {
        const { name, value } = e.target;
        setSignInData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(
                    "A verification email has been sent. Please check your inbox!"
                );
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                }); // Reset form
                // Switch to sign in after 3 seconds
                setTimeout(() => {
                    setIsActive(false);
                    setSuccessMessage(null);
                }, 3000);
            } else {
                setError(data.error || "Signup failed");
            }
        } catch (err) {
            setError(err.message);
            console.error("Signup error:", err);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch("http://localhost:8000/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signInData),
            });

            const data = await response.json();
            console.log("Sign in response:", data); // Debug log

            if (response.ok) {
                // Validate user data before storing
                if (!data.user || !data.user.email || !data.user.firebaseUID) {
                    throw new Error("Invalid user data received from server");
                }

                // Store user data in localStorage
                localStorage.setItem("user", JSON.stringify(data.user));

                // Check if user has a role
                if (!data.user.role) {
                    // If no role is set, navigate to role selection
                    navigate("/role-selection");
                } else {
                    // If email is not verified, show message
                    if (!data.user.emailVerified) {
                        setSuccessMessage(
                            "Please verify your email to access all features"
                        );
                        // Navigate after a short delay to show the message
                        setTimeout(() => navigate("/"), 1500);
                    } else {
                        // Navigate to home if email is verified
                        navigate("/");
                    }
                }
            } else {
                // Show user-friendly error message
                if (
                    data.error.includes("auth/invalid-credential") ||
                    data.error.includes("auth/user-not-found") ||
                    data.error.includes("auth/wrong-password")
                ) {
                    setError("Invalid email or password");
                } else {
                    setError(data.error || "Sign in failed");
                }
            }
        } catch (err) {
            console.error("Sign in error:", err);
            setError(err.message || "Network error. Please try again.");
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch(
                "http://localhost:8000/auth/forgot-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: forgotPasswordEmail }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                // Close the modal after 3 seconds on success
                setTimeout(() => {
                    setShowForgotPassword(false);
                    setForgotPasswordEmail("");
                    setSuccessMessage(null);
                }, 3000);
            } else {
                // Show user-friendly error message
                setError(
                    data.message ||
                        "Failed to send reset email. Please try again."
                );
            }
        } catch (err) {
            console.error("Forgot password error:", err);
            setError(
                "Network error. Please check your connection and try again."
            );
        }
    };

    const handleOAuthSignIn = async (provider) => {
        try {
            const idToken =
                provider === "google"
                    ? await signInWithGoogle()
                    : await signInWithLinkedIn();

            console.log("ID Token:", idToken);

            // First try to sign in
            let response = await fetch(
                "http://localhost:8000/auth/oauth-signin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idToken,
                        provider,
                    }),
                }
            );

            let data = await response.json();
            console.log("Backend signin response:", data);

            // If user doesn't exist, redirect to role selection and then signup
            if (response.status === 404 && data.shouldSignUp) {
                // Navigate to role selection
                navigate("/role-selection", {
                    state: {
                        isOAuth: true,
                        oauthData: {
                            idToken,
                            provider,
                        },
                    },
                });
                return;
            }

            if (response.ok) {
                console.log("Login successful!");
                // Store user data in localStorage
                localStorage.setItem("user", JSON.stringify(data.user));

                // Check if user has a role
                if (!data.user.role) {
                    // If no role is set, navigate to role selection
                    navigate("/role-selection");
                } else {
                    // Navigate to home if role is set
                    navigate("/");
                }
            } else {
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError(err.message);
            console.error("Login error:", err);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.background}>
            <div
                className={`${styles.container} ${
                    isActive ? styles.active : ""
                }`}
            >
                <div
                    className={`${styles["form-container"]} ${styles["sign-up"]}`}
                    style={{
                        opacity: isActive ? 1 : 0,
                        zIndex: isActive ? 5 : 1,
                        pointerEvents: isActive ? "auto" : "none",
                    }}
                >
                    <form className={styles.form} onSubmit={handleSignUp}>
                        <h1 className={styles.title}>Create Account</h1>
                        <div className={styles["social-icons"]}>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleOAuthSignIn("google");
                                }}
                            >
                                <i className="fab fa-google"></i>
                            </a>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleOAuthSignIn("linkedin");
                                }}
                            >
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span className={styles.span}>
                            or use your email for registration
                        </span>
                        <input
                            className={styles.input}
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            className={styles.input}
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            className={styles.input}
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <div className={styles["password-input-container"]}>
                            <input
                                className={styles.input}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type="button"
                                className={styles["password-toggle"]}
                                onClick={togglePasswordVisibility}
                            >
                                <i
                                    className={`fas ${
                                        showPassword ? "fa-eye-slash" : "fa-eye"
                                    }`}
                                ></i>
                            </button>
                        </div>
                        <button className={styles.button} type="submit">
                            Sign Up
                        </button>
                        {error && <div className={styles.error}>{error}</div>}
                        {successMessage && (
                            <div className={styles["success-message"]}>
                                {successMessage}
                            </div>
                        )}
                    </form>
                </div>
                <div
                    className={`${styles["form-container"]} ${styles["sign-in"]}`}
                    style={{
                        opacity: isActive ? 0 : 1,
                        zIndex: isActive ? 1 : 2,
                        pointerEvents: isActive ? "none" : "auto",
                    }}
                >
                    <form className={styles.form} onSubmit={handleSignIn}>
                        <h1 className={styles.title}>Sign in</h1>
                        <div className={styles["social-icons"]}>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleOAuthSignIn("google");
                                }}
                            >
                                <i className="fab fa-google"></i>
                            </a>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleOAuthSignIn("linkedin");
                                }}
                            >
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span className={styles.span}>or use your account</span>
                        <input
                            className={styles.input}
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signInData.email}
                            onChange={handleSignInInputChange}
                            required
                        />
                        <div className={styles["password-input-container"]}>
                            <input
                                className={styles.input}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={signInData.password}
                                onChange={handleSignInInputChange}
                                required
                            />
                            <button
                                type="button"
                                className={styles["password-toggle"]}
                                onClick={togglePasswordVisibility}
                            >
                                <i
                                    className={`fas ${
                                        showPassword ? "fa-eye-slash" : "fa-eye"
                                    }`}
                                ></i>
                            </button>
                        </div>
                        <a
                            href="#"
                            className={styles.link}
                            onClick={(e) => {
                                e.preventDefault();
                                setShowForgotPassword(true);
                            }}
                        >
                            Forgot your password?
                        </a>
                        <button className={styles.button} type="submit">
                            Sign In
                        </button>
                        {error && <div className={styles.error}>{error}</div>}
                        {successMessage && (
                            <div className={styles["success-message"]}>
                                {successMessage}
                            </div>
                        )}
                    </form>
                </div>
                <div className={styles["toggle-container"]}>
                    <div className={styles.toggle}>
                        <div
                            className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}
                        >
                            <h1>Welcome Back!</h1>
                            <p>
                                Enter your personal details to use all site
                                features
                            </p>
                            <button
                                className={`${styles.button} ${styles.ghost}`}
                                onClick={() => setIsActive(false)}
                            >
                                Sign In
                            </button>
                        </div>
                        <div
                            className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}
                        >
                            <h1>Hello, Friend!</h1>
                            <p>
                                Enter your personal details to start your
                                journey with us
                            </p>
                            <button
                                className={`${styles.button} ${styles.ghost}`}
                                onClick={() => setIsActive(true)}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>

                {showForgotPassword && (
                    <div className={styles["forgot-password-modal"]}>
                        <div className={styles["forgot-password-content"]}>
                            <h2>Reset Your Password</h2>
                            <p>
                                Please enter your email address. We'll send you
                                a link to reset your password.
                            </p>
                            <form onSubmit={handleForgotPassword}>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={forgotPasswordEmail}
                                    onChange={(e) =>
                                        setForgotPasswordEmail(e.target.value)
                                    }
                                    required
                                />
                                <button type="submit">Send Reset Link</button>
                                <button
                                    type="button"
                                    className={styles["cancel-button"]}
                                    onClick={() => setShowForgotPassword(false)}
                                >
                                    Cancel
                                </button>
                                {error && (
                                    <div className={styles.error}>{error}</div>
                                )}
                                {successMessage && (
                                    <div className={styles["success-message"]}>
                                        {successMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
