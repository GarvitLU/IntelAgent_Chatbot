import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section
      id="contact"
      className="section-padding bg-dark-translucent text-white backdrop-blur-md relative overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.05) 0%, transparent 50%)',
        }}
      ></div>
      <div className="relative z-10 container max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
        >
          Book a Demo
        </motion.h2>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-xl shadow-lg"
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-300 text-lg font-medium mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-accent-text"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-300 text-lg font-medium mb-2"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-accent-text"
              placeholder="john.doe@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-300 text-lg font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-accent-text"
              placeholder="Tell us about your needs..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="gradient-button w-full text-white text-lg px-6 py-3 rounded-lg font-bold shadow-lg hover:scale-105 transition duration-300 ease-in-out"
          >
            Book a Demo
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact; 