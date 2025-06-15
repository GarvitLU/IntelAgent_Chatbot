import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Companies.module.css";

// Use the react svg as a placeholder for all logos
import reactSvg from "../../assets/react.svg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Companies = () => {
    const headerRef = useRef(null);
    const logosRef = useRef(null);
    const statsRef = useRef(null);

    // Sample stats
    const stats = [
        { number: "300K+", label: "Companies Hiring" },
        { number: "10K+", label: "New Startups" },
        { number: "21M+", label: "Active Students" },
    ];

    useEffect(() => {
        if (headerRef.current) {
            gsap.fromTo(
                headerRef.current,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none none",
                    },
                    ease: "power3.out",
                }
            );
        }

        if (logosRef.current) {
            gsap.fromTo(
                logosRef.current.children,
                {
                    y: 30,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: logosRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                    ease: "power2.out",
                }
            );
        }

        if (statsRef.current) {
            gsap.fromTo(
                statsRef.current.children,
                {
                    y: 30,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                    ease: "power2.out",
                }
            );
        }
    }, []);

    return (
        <section className={styles.companies}>
            <div className={styles.container}>
                <div ref={headerRef} className={styles.headerSection}>
                    <div className={styles.sectionTag}>TRUSTED PARTNERS</div>
                    <h2 className={styles.sectionTitle}>Companies Hiring</h2>
                </div>

                <div ref={logosRef} className={styles.logosContainer}>
                    <div className={styles.companyLogo}>
                        <img src={reactSvg} alt="Puma" />
                    </div>
                    <div className={styles.companyLogo}>
                        <img src={reactSvg} alt="Sony" />
                    </div>
                    <div className={styles.companyLogo}>
                        <img src={reactSvg} alt="Boat" />
                    </div>
                    <div className={styles.companyLogo}>
                        <img src={reactSvg} alt="Dunzo" />
                    </div>
                </div>

                <div ref={statsRef} className={styles.statsContainer}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <h3 className={styles.statNumber}>{stat.number}</h3>
                            <p className={styles.statLabel}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Companies;
