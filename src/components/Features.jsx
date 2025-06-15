import { motion } from 'framer-motion';
// Remove unused icon imports since we are using images
// import {
//   ChatBubbleLeftRightIcon,
//   CpuChipIcon,
//   ArrowPathIcon,
//   SparklesIcon,
//   ClockIcon,
//   ChartBarIcon,
// } from '@heroicons/react/24/outline';

const features = [
  {
    image: 'https://img.freepik.com/premium-photo/ai-chat-bot-communicate-answer-question-busines-generative-ai_760510-535.jpg',
    title: 'Tailored AI Chatbots',
    description:
      'Craft intelligent chatbots that understand your brand voice and customer needs. From FAQs to complex inquiries, our bots are customized for your unique business.',
    imagePosition: 'left',
  },
  {
    image: 'https://iotworldmagazine.com/wp-content/uploads/2025/03/List-of-10-Best-AI-Agents-Examples-for-Startups-and-Solopreneurs-in-Every-Industry-in-2025.jpeg',
    title: 'Powerful AI Agents',
    description:
      'Leverage advanced AI agents that go beyond simple chatbots, capable of understanding context, making decisions, and automating complex tasks to deliver intelligent interactions.',
    imagePosition: 'right',
  },
  {
    image: 'https://epaouydin3q.exactdn.com/wp-content/uploads/2024/02/Continual-Learning-in-Generative-AI-1024x585.jpg?strip=all&lossy=1&ssl=1',
    title: 'Continuous Learning and Improvement',
    description:
      'IntelAgent constantly learns from every interaction, improving its responses and capabilities over time to provide increasingly accurate and effective support.',
    imagePosition: 'left',
  },
  {
    image: 'https://images.prismic.io//intuzwebsite/53daf5ca-751e-4564-bb48-783955769208_Banner%402x.png?w=2400&q=80&auto=format,compress&fm=png8 420w, https://images.prismic.io//intuzwebsite/53daf5ca-751e-4564-bb48-783955769208_Banner%402x.png?w=2400&q=80&auto=format,compress&fm=png8 640w, https://images.prismic.io//intuzwebsite/53daf5ca-751e-4564-bb48-783955769208_Banner%402x.png?w=2400&q=80&auto=format,compress&fm=png8 750w, https://images.prismic.io//intuzwebsite/53daf5ca-751e-4564-bb48-783955769208_Banner%402x.png?w=2400&q=80&auto=format,compress&fm=png8 828w, https://images.prismic.io//intuzwebsite/53daf5ca-751e-4564-bb48-783955769208_Banner%402x.png?w=2400&q=80&auto=format,compress&fm=png8 1080w, https://images.prismic.io//intuzwebsite/53daf5ca-751e-4564-bb48-783955769208_Banner%402x.png?w=2400&q=80&auto=format,compress&fm=png8 1200w',
    title: 'Effortless Integration',
    description:
      'IntelAgent seamlessly integrates with your existing CRM, helpdesk, and business tools, ensuring a smooth transition and maximized efficiency.',
    imagePosition: 'right',
  },
 
  {
    image: 'https://bluespacetech.com/wp-content/uploads/2024/02/AI-chatbord.png',
    title: 'Always On, 24/7',
    description:
      'Provide instant support and engagement around the clock. Your IntelAgent is always available, ensuring no customer query goes unanswered, day or night.',
    imagePosition: 'left',
  },
  {
    image: 'https://media.licdn.com/dms/image/v2/D5612AQGp1MWLcFI1tA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1709340912699?e=1755734400&v=beta&t=GxzhnbFeYAiTdm-ZubiNZWnyIK3z60zEHkMRrpGQC58',
    title: 'Scalable Solutions',
    description:
      'Whether you have ten customers or ten million, IntelAgent scales effortlessly to meet your demands, ensuring consistent performance and reliability as your business grows.',
    imagePosition: 'right',
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-20">
          What IntelAgent Offers
        </h2>
        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the section is visible
              className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {feature.imagePosition === 'left' && (
                <div className="md:w-1/2 flex justify-center items-center">
                  <motion.div
                    className="feature-image-box"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(139, 92, 246, 0.7)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                    />
                  </motion.div>
                </div>
              )}
              {feature.imagePosition === 'right' && (
                <div className="md:w-1/2 flex justify-center items-center">
                  <motion.div
                    className="feature-image-box"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(139, 92, 246, 0.7)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                    />
                  </motion.div>
                </div>
              )}
              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 