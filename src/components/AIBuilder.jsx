import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiFile, FiMessageSquare } from 'react-icons/fi';

const AIBuilder = () => {
  const [isTyping, setIsTyping] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const demoMessages = [
    "Hello! I'm your AI assistant. I've analyzed your document and I'm ready to help!",
    "I can answer questions about your uploaded content.",
    "Feel free to ask me anything about the document!",
    "I'm here to make your document interaction easier and more efficient."
  ];

  useEffect(() => {
    let timeout;
    const currentText = demoMessages[currentMessageIndex];

    if (isTyping) {
      if (currentMessage === currentText) {
        timeout = setTimeout(() => {
          setIsTyping(false);
          setIsDeleting(true);
        }, 2000);
      } else {
        timeout = setTimeout(() => {
          setCurrentMessage(currentText.slice(0, currentMessage.length + 1));
        }, 50);
      }
    } else if (isDeleting) {
      if (currentMessage === '') {
        setIsDeleting(false);
        setIsTyping(true);
        setCurrentMessageIndex((prev) => (prev + 1) % demoMessages.length);
      } else {
        timeout = setTimeout(() => {
          setCurrentMessage(currentMessage.slice(0, -1));
        }, 30);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentMessage, isTyping, isDeleting, currentMessageIndex, demoMessages]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <section
      id="ai-builder"
      className="py-20 bg-dark-translucent text-white relative overflow-hidden backdrop-blur-md"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.05) 0%, transparent 50%)',
        }}
      ></div>
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Document AI Assistant
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Upload your document and interact with our AI-powered assistant
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Document Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700"
          >
            <div className="text-center">
              <FiUpload className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-2xl font-semibold mb-4 text-white">Upload Your Document</h3>
              <p className="text-gray-400 mb-6">
                Upload a PDF or DOC file to get started with our AI assistant
              </p>
              <div className="relative">
            <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
            />
            <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors"
            >
                  <FiFile className="mr-2" />
                  Choose File
            </label>
                {selectedFile && (
                  <p className="mt-4 text-sm text-gray-400">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Chatbot Demo Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700 min-h-[400px] flex flex-col"
          >
            <div className="flex items-center mb-6">
              <FiMessageSquare className="w-6 h-6 text-purple-500 mr-3" />
              <h3 className="text-2xl font-semibold text-white">AI Assistant</h3>
            </div>
            <div className="flex-1 bg-gray-900/50 rounded-lg p-6 mb-4 overflow-y-auto">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">AI</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-300 break-words">
                    {currentMessage}
                    <span className="inline-block w-2 h-4 bg-purple-500 ml-1 animate-pulse"></span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
                placeholder="Type your message..."
                className="flex-1 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            />
          <button
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                disabled
          >
                Send
          </button>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIBuilder; 