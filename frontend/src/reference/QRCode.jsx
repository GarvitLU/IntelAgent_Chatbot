import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import styles from "./QRCode.module.css";

const QRCode = () => {
    // Use environment variable for the feedback URL
    const feedbackUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin;

    return (
        <div className={styles.container}>
            {/* Pattern overlay for visual effect */}
            <div className={styles.patternOverlay}></div>
            
            {/* Glow effect */}
            <div className={styles.glowEffect}></div>
            
            <div className={styles.qrContainer}>
                <div className={styles.decorativeCorner1} />
                <div className={styles.decorativeCorner2} />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.qrCard}>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={styles.iconWrapper}>
                                <svg className={styles.qrIcon} viewBox="0 0 24 24">
                                    <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 17h2v2h-2zM19 19h2v2h-2zM15 19h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z"/>
                                </svg>
                            </div>
                            <h1 className={styles.title}>
                                Scan for Feedback
                            </h1>
                        </motion.div>

                        <div className={styles.qrWrapper}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <QRCodeSVG
                                    value={feedbackUrl}
                                    size={256}
                                    level={"H"}
                                    includeMargin={true}
                                    className={styles.qrCode}
                                    bgColor="transparent"
                                    fgColor="#9063e8"
                                />
                            </motion.div>
                        </div>

                        <p className={styles.instruction}>
                            We value your opinion. Scan to share your thoughts with us.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default QRCode;