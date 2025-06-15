import React, { useRef } from "react";
import styles from "./Testimonials.module.css";
import { AnimatedTestimonials } from "../animations/AnimatedTestimonials";

const Testimonials = () => {
    const headerRef = useRef(null);

    // Testimonial data reformatted for the AnimatedTestimonials component
    const testimonials = [
        {
            quote: "QREDIFIQ completely transformed my job search. The AI matching algorithm connected me with the perfect company, and the skill suggestions helped me improve my resume significantly.",
            name: "John Doe",
            designation: "Software Engineer at Google",
            src: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            quote: "As a career-switcher, I was struggling to find opportunities. QREDIFIQ not only helped me find relevant positions but also guided me on how to present my transferable skills effectively.",
            name: "Sarah Johnson",
            designation: "Product Manager at Amazon",
            src: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            quote: "From a recruiter's perspective, QREDIFIQ helps us find the perfect candidates quickly. The AI filtering saves us hours of manual screening, and the quality of matches is consistently excellent.",
            name: "Michael Chen",
            designation: "HR Director at Microsoft",
            src: "https://randomuser.me/api/portraits/men/67.jpg",
        },
        {
            quote: "The platform's intuitive design made job hunting actually enjoyable. I landed my dream role in just three weeks, and the interview preparation tools gave me incredible confidence.",
            name: "Emily Williams",
            designation: "UX Designer at Adobe",
            src: "https://randomuser.me/api/portraits/women/28.jpg",
        },
        {
            quote: "QREDIFIQ understood my specialized skills better than any other platform. The AI recommendations were spot-on, and I appreciated the salary insights that helped me negotiate better.",
            name: "David Rodriguez",
            designation: "Data Scientist at Netflix",
            src: "https://randomuser.me/api/portraits/men/45.jpg",
        },
        {
            quote: "The personalized career roadmap feature helped me plan my next career moves strategically. Six months after using QREDIFIQ, I secured a promotion that I didn't think was possible.",
            name: "Lisa Patel",
            designation: "Marketing Director at Spotify",
            src: "https://randomuser.me/api/portraits/women/63.jpg",
        },
    ];

    return (
        <section className={styles.testimonials}>
            <div className={styles.container}>
                <div ref={headerRef} className={styles.headerSection}>
                    <div className={styles.sectionTag}>TESTIMONIALS</div>
                    <h2 className={styles.sectionTitle}>
                        What People Say About Us
                    </h2>
                </div>

                <div className={styles.testimonialDisplay}>
                    <div className={styles.testimonialContent}>
                        <AnimatedTestimonials
                            testimonials={testimonials}
                            autoplay={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
