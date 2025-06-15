import { motion } from "framer-motion";
import SplitText from "./SplitText";

const CompletionMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="completion-message"
    >
      <div className="completion-content">
        <motion.div
          className="check-circle"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2
          }}
        >
          <motion.svg
            viewBox="0 0 24 24"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            <motion.path
              fill="none"
              stroke="#9063E8"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>
        <SplitText text="Thank You!" className="completion-title" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Your information has been successfully submitted.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default CompletionMessage; 