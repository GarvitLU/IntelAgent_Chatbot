import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BlurText from "../animations/BlurText";
import GSAPReveal from "../animations/GSAPReveal";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const Hero = () => {
    const particlesRef = useRef(null);

    useEffect(() => {
        // Create particles dynamically
        if (particlesRef.current) {
            const particlesContainer = particlesRef.current;

            // Clear any existing particles
            particlesContainer.innerHTML = "";

            // Create 15 random particles
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement("div");
                particle.className = styles.particle;

                // Random size between 40px and 200px
                const size = Math.floor(Math.random() * 160) + 40;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;

                // Random position
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.left = `${Math.random() * 100}%`;

                // Random opacity
                const opacity = (Math.random() * 0.3).toFixed(2);
                particle.style.opacity = opacity;

                // Random animation delay
                particle.style.animationDelay = `${Math.random() * 10}s`;

                particlesContainer.appendChild(particle);
            }
        }
    }, []);

    return (
        <section className={styles.hero}>
            {/* Background with particles */}
            <div className={styles.gradientOverlay}></div>
            <div ref={particlesRef} className={styles.particles}></div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        <BlurText
                            text="Where Top Talent"
                            delay={80}
                            animateBy="words"
                            direction="top"
                            className={styles.titleLine}
                        />
                        <br />
                        <BlurText
                            text="Meets Dream Jobs"
                            delay={100}
                            animateBy="words"
                            direction="top"
                            className={styles.titleLine}
                        />
                    </h1>
                    <BlurText
                        text="Seamlessly connecting professionals with their ideal opportunities."
                        delay={120}
                        animateBy="words"
                        direction="top"
                        className={styles.subtitle}
                    />
                    <GSAPReveal
                        delay={0.5}
                        duration={0.8}
                        from={{ y: 30, opacity: 0 }}
                    >
                        <div className={styles.cta}>
                            <Link to="/signup" className={styles.primaryBtn}>
                                Get Started
                                <span className={styles.btnArrow}>→</span>
                            </Link>
                        </div>
                    </GSAPReveal>
                </div>

                {/* Video placeholder with simpler animation */}
                <motion.div
                    className={styles.videoWrapper}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.7,
                        ease: "easeOut",
                    }}
                >
                    <div className={styles.videoPlaceholder}>
                        <div className={styles.playButton}>
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8 5V19L19 12L8 5Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
