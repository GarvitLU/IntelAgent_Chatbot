import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section
      id="about"
      className="py-20 bg-dark-translucent text-white relative overflow-hidden backdrop-blur-md"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.05) 0%, transparent 50%)',
        }}
      ></div>
      {/* Animated Abstract Background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{
          scale: [1, 1.05, 1], // Subtle pulse
          opacity: [0.6, 0.8, 0.6], // Subtle fade
          rotate: [0, 5, 0], // Gentle rotation
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)', // Main glow
          filter: 'blur(30px)', // Soft blur for ethereal effect
        }}
      />
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-8 text-white"
          >
            About IntelAgent
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed"
          >
            IntelAgent is at the forefront of AI-powered customer interaction, built upon the revolutionary Lisa technology.
            We are dedicated to transforming how businesses connect with their customers through intelligent automation and personalized experiences.
            Simply provide a document covering your business information, and watch the magic unfold as our chatbot answers any type of question you have!
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 leading-relaxed"
          >
            Our mission is to empower businesses of all sizes to achieve unparalleled efficiency, enhance customer satisfaction, and unlock new growth opportunities with cutting-edge AI solutions.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 