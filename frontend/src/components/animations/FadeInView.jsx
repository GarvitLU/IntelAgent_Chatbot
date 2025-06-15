import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FadeInView = ({
    children,
    delay = 0,
    direction = "up",
    duration = 0.8,
    className = "",
    threshold = 0.2,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold });

    // Define animation variants
    const getVariants = () => {
        const baseVariants = {
            hidden: {
                opacity: 0,
            },
            visible: {
                opacity: 1,
                transition: {
                    duration,
                    delay,
                    ease: [0.22, 1, 0.36, 1],
                },
            },
        };

        // Add direction-based transform
        if (direction === "up") {
            baseVariants.hidden.y = 40;
            baseVariants.visible.y = 0;
        } else if (direction === "down") {
            baseVariants.hidden.y = -40;
            baseVariants.visible.y = 0;
        } else if (direction === "left") {
            baseVariants.hidden.x = 40;
            baseVariants.visible.x = 0;
        } else if (direction === "right") {
            baseVariants.hidden.x = -40;
            baseVariants.visible.x = 0;
        } else if (direction === "scale") {
            baseVariants.hidden.scale = 0.9;
            baseVariants.visible.scale = 1;
        }

        return baseVariants;
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={getVariants()}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default FadeInView;
