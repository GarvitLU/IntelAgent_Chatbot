import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const GSAPReveal = ({
    children,
    className = "",
    delay = 0,
    duration = 1.2,
    from = { y: 75, opacity: 0 },
    scrub = false,
    stagger = 0.1,
    start = "top 85%",
    markers = false,
    type = "fromTo", // fromTo, to, from
}) => {
    const element = useRef(null);

    useEffect(() => {
        const el = element.current;
        let ctx;

        // Create animation within a GSAP context
        const createAnimation = () => {
            // Create a context to be able to revert
            ctx = gsap.context(() => {
                const childElements = el.querySelectorAll(".gsap-item");

                if (childElements.length === 0) {
                    // If no children with gsap-item class, animate the whole element
                    let anim;

                    if (type === "fromTo") {
                        anim = gsap.fromTo(
                            el,
                            { ...from },
                            {
                                y: 0,
                                opacity: 1,
                                duration,
                                delay,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: el,
                                    start,
                                    scrub,
                                    markers,
                                },
                            }
                        );
                    } else if (type === "from") {
                        anim = gsap.from(el, {
                            ...from,
                            duration,
                            delay,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: el,
                                start,
                                scrub,
                                markers,
                            },
                        });
                    } else if (type === "to") {
                        anim = gsap.to(el, {
                            y: 0,
                            opacity: 1,
                            duration,
                            delay,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: el,
                                start,
                                scrub,
                                markers,
                            },
                        });
                    }
                } else {
                    // Animate each child with stagger
                    let anim;

                    if (type === "fromTo") {
                        anim = gsap.fromTo(
                            childElements,
                            { ...from },
                            {
                                y: 0,
                                opacity: 1,
                                duration,
                                stagger,
                                delay,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: el,
                                    start,
                                    scrub,
                                    markers,
                                },
                            }
                        );
                    } else if (type === "from") {
                        anim = gsap.from(childElements, {
                            ...from,
                            duration,
                            stagger,
                            delay,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: el,
                                start,
                                scrub,
                                markers,
                            },
                        });
                    } else if (type === "to") {
                        anim = gsap.to(childElements, {
                            y: 0,
                            opacity: 1,
                            duration,
                            stagger,
                            delay,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: el,
                                start,
                                scrub,
                                markers,
                            },
                        });
                    }
                }
            }, element);
        };

        createAnimation();

        // Cleanup function for unmount
        return () => {
            if (ctx) {
                ctx.revert(); // This will clean up all GSAP animations created in this context
            }
        };
    }, [delay, duration, from, scrub, stagger, start, markers, type]);

    return (
        <div ref={element} className={className}>
            {children}
        </div>
    );
};

export default GSAPReveal;
