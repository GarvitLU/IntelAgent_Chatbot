import { motion } from "framer-motion";

// Component for animating text word by word instead of character by character
const SplitText = ({ text, className }) => {
  // Split text into words
  const words = text.split(" ");
  
  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          // Initial hidden state
          initial={{ opacity: 0, y: 50 }}
          // Animation to visible state
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.3,
              delay: index * 0.05 // Slightly longer delay between words
            }
          }}
          className="inline-block"
          style={{ marginRight: "0.25em", marginBottom: "0.15em" }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default SplitText;
