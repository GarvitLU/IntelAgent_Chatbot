import { motion } from 'framer-motion';
import SplitText from './SplitText';
import '../styles/Hero.css';
import { useEffect, useRef, useState } from 'react';
import ShinyText from './ShinyText';

const Hero = () => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Play video when it comes into view
            if (videoRef.current) {
              videoRef.current.play().catch(error => {
                console.log("Autoplay prevented:", error);
              });
            }
          } else {
            // Pause video when it's out of view
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the video is visible
        rootMargin: '0px'
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-black pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      
      <div className="relative z-10 px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            <SplitText 
              text="The Future of Customer Interaction" 
              className="text-white"
            />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10"
          >
            Create, automate and personalize customer interactions at enterprise standards with IntelAgent's proprietary AI technology.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl max-w-3xl mx-auto mb-10"
          >
            <ShinyText text="Powered by Lisa" speed={3} />
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="#contact"
            className="bg-purple-600 text-white text-lg px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition duration-300 ease-in-out inline-flex items-center justify-center"
          >
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          viewport={{ once: true }}
          className="mt-20 video-container"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            See IntelAgent in Action
          </h2>
          <motion.div 
            initial={{ opacity: 0, scale: 1 }}
            whileInView={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ amount: 0.5 }}
            className="relative w-full overflow-hidden rounded-xl shadow-2xl border border-gray-700 bg-black"
            style={{ paddingTop: '56.25%' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
              playsInline
              muted
              loop
            >
              <source src="/video/Lisa ai render.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 