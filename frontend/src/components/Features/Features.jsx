import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BlurText from "../animations/BlurText";
import FadeInView from "../animations/FadeInView";
import GSAPReveal from "../animations/GSAPReveal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Features.module.css";

// Use the react svg as a placeholder for all icons
import reactSvg from "../../assets/react.svg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const featuresRef = useRef(null);
    const featureRefs = useRef([]);

    // Set up animations when component mounts
    useEffect(() => {
        if (featuresRef.current) {
            // Stagger animation for feature items
            featureRefs.current.forEach((feature, index) => {
                if (!feature) return;

                const direction = index % 2 === 0 ? 1 : -1;

                gsap.fromTo(
                    feature,
                    {
                        x: 50 * direction,
                        opacity: 0,
                        transformOrigin:
                            index % 2 === 0 ? "left center" : "right center",
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: feature,
                            start: "top 80%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse",
                        },
                        ease: "power3.out",
                    }
                );
            });
        }
    }, []);

    return (
        <section ref={featuresRef} className={styles.features}>
            {/* Background */}
            <div className={styles.featuresBackground}></div>

            <div className={styles.container}>
                <GSAPReveal from={{ y: 50, opacity: 0 }} duration={1}>
                    <div className={styles.headerSection}>
                        <div className={styles.sectionTag}>
                            LEARNING PLATFORM
                        </div>
                        <h2 className={styles.sectionTitle}>
                            <BlurText
                                text="The Best Learning Platform. Period."
                                delay={80}
                                animateBy="words"
                                direction="top"
                            />
                        </h2>
                    </div>
                </GSAPReveal>

                <div className={styles.featuresList}>
                    {/* Feature 1 */}
                    <div
                        ref={(el) => (featureRefs.current[0] = el)}
                        className={styles.featureItem}
                    >
                        <div className={styles.featureContent}>
                            <div className={styles.featureTag}>
                                AGENCY FOUNDATIONS
                            </div>
                            <h3 className={styles.featureTitle}>
                                Learn the Agency
                                <br />
                                3.0 Model.
                            </h3>
                            <p className={styles.featureDescription}>
                                Learn how to set your agency up for success.
                                Basically everything you need to get up and
                                running...
                            </p>
                        </div>
                        <FadeInView
                            delay={0.2}
                            direction="up"
                            className={styles.featureImageWrapper}
                        >
                            <div className={styles.featureImage}>
                                <img
                                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                    alt="Agency Foundations"
                                />
                            </div>
                        </FadeInView>
                    </div>

                    {/* Feature 2 */}
                    <div
                        ref={(el) => (featureRefs.current[1] = el)}
                        className={styles.featureItem}
                    >
                        <div className={styles.featureContent}>
                            <div className={styles.featureTag}>
                                SYSTEMS & PROCESSES
                            </div>
                            <h3 className={styles.featureTitle}>
                                Automate for Maximum
                                <br />
                                Growth
                            </h3>
                            <p className={styles.featureDescription}>
                                Learn how to implement systems to automate your
                                agency and provide your clients with a
                                world-class client experience with my own
                                business partner, Pierre.
                            </p>
                        </div>
                        <FadeInView
                            delay={0.2}
                            direction="up"
                            className={styles.featureImageWrapper}
                        >
                            <div className={styles.featureImage}>
                                <img
                                    src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                    alt="Systems & Processes"
                                />
                            </div>
                        </FadeInView>
                    </div>

                    {/* Feature 3 */}
                    <div
                        ref={(el) => (featureRefs.current[2] = el)}
                        className={styles.featureItem}
                    >
                        <div className={styles.featureContent}>
                            <div className={styles.featureTag}>
                                MASTER THE ART OF SALES
                            </div>
                            <h3 className={styles.featureTitle}>
                                Learn the Art of Sales &<br />
                                Close High-Ticket Clients
                            </h3>
                            <p className={styles.featureDescription}>
                                Discover the proven sales methodology that has
                                generated millions in revenue for agencies
                                worldwide.
                            </p>
                        </div>
                        <FadeInView
                            delay={0.2}
                            direction="up"
                            className={styles.featureImageWrapper}
                        >
                            <div className={styles.featureImage}>
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
                                    alt="Sales Mastery"
                                />
                            </div>
                        </FadeInView>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
