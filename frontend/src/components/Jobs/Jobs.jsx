import React, {
    useRef,
    useState,
    useEffect,
    createContext,
    useContext,
} from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
} from "react-icons/io5";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Jobs.module.css"; // Import the CSS module

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Create context for the carousel
const JobCarouselContext = createContext({
    onCardClose: () => {},
    currentIndex: 0,
});

const Jobs = () => {
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const headerRef = useRef(null);

    // Sample job data (would typically come from an API)
    const jobListings = [
        {
            id: 1,
            title: "Senior Full Stack Engineer",
            company: "TechCorp",
            location: "Remote",
            salary: "$120K - $150K",
            type: "Full-time",
            tags: ["React", "Node.js", "MongoDB"],
            postedDate: "2 days ago",
            applicants: 45,
            deadline: "2 weeks",
            logo: "https://via.placeholder.com/150",
            maxApplicants: 50,
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=3270&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "Product Manager",
            company: "InnovateCo",
            location: "New York, NY",
            salary: "$110K - $135K",
            type: "Full-time",
            tags: ["Agile", "Product Strategy", "UI/UX"],
            postedDate: "1 week ago",
            applicants: 32,
            deadline: "3 weeks",
            logo: "https://via.placeholder.com/150",
            maxApplicants: 40,
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=3270&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "UX/UI Designer",
            company: "DesignHub",
            location: "San Francisco, CA",
            salary: "$95K - $120K",
            type: "Full-time",
            tags: ["Figma", "Adobe XD", "Wireframing"],
            postedDate: "3 days ago",
            applicants: 28,
            deadline: "1 week",
            logo: "https://via.placeholder.com/150",
            maxApplicants: 30,
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=3164&auto=format&fit=crop",
        },
        {
            id: 4,
            title: "Data Scientist",
            company: "DataTech",
            location: "Boston, MA",
            salary: "$125K - $160K",
            type: "Full-time",
            tags: ["Python", "Machine Learning", "SQL"],
            postedDate: "Just now",
            applicants: 15,
            deadline: "4 weeks",
            logo: "https://via.placeholder.com/150",
            maxApplicants: 20,
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=3270&auto=format&fit=crop",
        },
        {
            id: 5,
            title: "DevOps Engineer",
            company: "CloudInfra",
            location: "Remote",
            salary: "$130K - $155K",
            type: "Full-time",
            tags: ["AWS", "Docker", "Kubernetes"],
            postedDate: "5 days ago",
            applicants: 22,
            deadline: "2 weeks",
            logo: "https://via.placeholder.com/150",
            maxApplicants: 25,
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=3270&auto=format&fit=crop",
        },
        {
            id: 6,
            title: "Marketing Specialist",
            company: "GrowthCo",
            location: "Chicago, IL",
            salary: "$80K - $95K",
            type: "Full-time",
            tags: ["SEO", "Content Marketing", "Analytics"],
            postedDate: "1 day ago",
            applicants: 38,
            deadline: "3 weeks",
            logo: "https://via.placeholder.com/150",
            maxApplicants: 35,
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=3270&auto=format&fit=crop",
        },
    ];

    // Set up animations when component mounts
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
                        toggleActions: "play none none none", // Only play once
                    },
                    ease: "power3.out",
                }
            );
        }
    }, []);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const handleCardClose = (index) => {
        if (carouselRef.current) {
            const cardWidth = window.innerWidth < 768 ? 230 : 384;
            const gap = window.innerWidth < 768 ? 16 : 32;
            const scrollPosition = (cardWidth + gap) * (index + 1);
            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            });
            setActiveIndex(index);
        }
    };

    // Generate card components
    const jobCards = jobListings.map((job, index) => (
        <JobCard key={job.id} job={job} index={index} />
    ));

    return (
        <section className={styles.jobs}>
            {/* Background decorations */}
            <div
                className={`${styles.backgroundDecoration} ${styles.top}`}
            ></div>
            <div
                className={`${styles.backgroundDecoration} ${styles.bottom}`}
            ></div>

            <div className={styles.container}>
                <div ref={headerRef} className={styles.headerSection}>
                    <div className={styles.sectionTag}>
                        CAREER OPPORTUNITIES
                    </div>
                    <h2 className={styles.sectionTitle}>
                        Top Internships & Jobs
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Discover the best opportunities to launch your career
                    </p>
                </div>

                <JobCarouselContext.Provider
                    value={{
                        onCardClose: handleCardClose,
                        currentIndex: activeIndex,
                    }}
                >
                    <div className={styles.carouselWrapper}>
                        <div
                            className={styles.carouselScroll}
                            ref={carouselRef}
                            onScroll={checkScrollability}
                        >
                            <div className={styles.carouselTrack}>
                                {jobCards}
                            </div>
                        </div>
                        <div className={styles.carouselControls}>
                            <button
                                onClick={scrollLeft}
                                className={styles.carouselBtn}
                                aria-label="Previous jobs"
                                disabled={!canScrollLeft}
                            >
                                <IoChevronBackOutline size={20} />
                            </button>
                            <button
                                onClick={scrollRight}
                                className={styles.carouselBtn}
                                aria-label="Next jobs"
                                disabled={!canScrollRight}
                            >
                                <IoChevronForwardOutline size={20} />
                            </button>
                        </div>
                    </div>
                </JobCarouselContext.Provider>

                <div className={styles.viewAllContainer}>
                    <Link to="/jobs" className={styles.viewAllButton}>
                        View All Jobs
                    </Link>
                </div>
            </div>
        </section>
    );
};

// Job Card Component
const JobCard = ({ job, index }) => {
    const [open, setOpen] = useState(false);
    const { onCardClose } = useContext(JobCarouselContext);
    const cardRef = useRef(null);

    // Handle outside clicks to close card
    useEffect(() => {
        function handleOutsideClick(event) {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                handleClose();
            }
        }

        function handleEscKey(event) {
            if (event.key === "Escape") {
                handleClose();
            }
        }

        if (open) {
            document.body.style.overflow = "hidden";
            document.addEventListener("mousedown", handleOutsideClick);
            window.addEventListener("keydown", handleEscKey);
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            window.removeEventListener("keydown", handleEscKey);
        };
    }, [open]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        onCardClose(index);
    };

    return (
        <>
            <AnimatePresence>
                {open && (
                    <div className={styles.modalOverlay}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.modalBackdrop}
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            ref={cardRef}
                            layoutId={`job-card-${job.id}`}
                            className={styles.modalContent}
                        >
                            <button
                                className={styles.closeBtn}
                                onClick={handleClose}
                            >
                                <IoCloseOutline size={24} />
                            </button>

                            <motion.div
                                layoutId={`company-${job.id}`}
                                className={styles.modalCompany}
                            >
                                {job.company}
                            </motion.div>

                            <motion.h2
                                layoutId={`title-${job.id}`}
                                className={styles.modalTitle}
                            >
                                {job.title}
                            </motion.h2>

                            <div className={styles.modalDetails}>
                                <div className={styles.modalSection}>
                                    <h3 className={styles.modalSectionTitle}>
                                        Job Details
                                    </h3>
                                    <div className={styles.modalLocation}>
                                        <span>Location:</span> {job.location}
                                    </div>
                                    <div className={styles.modalSalary}>
                                        <span>Salary:</span> {job.salary}
                                    </div>
                                    <div className={styles.modalType}>
                                        <span>Type:</span> {job.type}
                                    </div>
                                </div>

                                <div className={styles.modalSection}>
                                    <h3 className={styles.modalSectionTitle}>
                                        Required Skills
                                    </h3>
                                    <div className={styles.modalTags}>
                                        {job.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className={styles.modalTag}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.modalSection}>
                                    <h3 className={styles.modalSectionTitle}>
                                        Timeline
                                    </h3>
                                    <p>Posted: {job.postedDate}</p>
                                    <p>Application Deadline: {job.deadline}</p>

                                    <div className={styles.applicationProgress}>
                                        <div className={styles.progressHeader}>
                                            <span>Applications</span>
                                            <span>
                                                {job.applicants}/
                                                {job.maxApplicants}
                                            </span>
                                        </div>
                                        <div className={styles.progressBar}>
                                            <div
                                                className={styles.progressFill}
                                                style={{
                                                    width: `${
                                                        (job.applicants /
                                                            job.maxApplicants) *
                                                        100
                                                    }%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to={`/jobs/${job.id}`}
                                    className={styles.applyButton}
                                >
                                    Apply Now
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                layoutId={`job-card-${job.id}`}
                onClick={handleOpen}
                className={styles.jobCardWrapper}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        delay: 0.1 * index,
                        ease: "easeOut",
                    },
                }}
            >
                <div className={styles.cardGradientOverlay} />

                <div className={styles.cardContent}>
                    <motion.div
                        layoutId={`company-${job.id}`}
                        className={styles.cardCompanyTag}
                    >
                        {job.company}
                    </motion.div>
                    <motion.h3
                        layoutId={`title-${job.id}`}
                        className={styles.cardTitle}
                    >
                        {job.title}
                    </motion.h3>
                </div>

                <div className={styles.jobTypeTag}>{job.type}</div>

                <img
                    src={job.image}
                    alt={`${job.company} - ${job.title}`}
                    className={styles.cardBackgroundImage}
                />
            </motion.button>
        </>
    );
};

export default Jobs;
