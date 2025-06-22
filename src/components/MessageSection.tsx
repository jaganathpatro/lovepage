import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const MessageSection: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.2 });

  const loveLetterText = [
    "My Dearest Love,",
    "",
    "From the moment our eyes first met, I knew that you were someone extraordinary. Your smile lit up the entire room and made my heart skip a beat in ways I never thought possible.",
    "",
    "Every day with you feels like a beautiful dream that I never want to wake up from. You bring joy to my simplest moments and magic to my ordinary days.",
    "",
    "Your laughter is my favorite melody, your touch is my greatest comfort, and your love is my most precious treasure. You've shown me what it truly means to be cherished and understood.",
    "",
    "Thank you for being my partner in all of life's adventures, my safe harbor in every storm, and my greatest source of happiness.",
    "",
    "I love you more than words could ever express, and I promise to love you more with each passing day.",
    "",
    "Forever and always yours,",
    "💕"
  ];

  return (
    <section id="message" className="py-20 bg-gradient-to-br from-white via-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-dancing text-gray-800 mb-4">
            A Letter From My Heart
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-100"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-4">
            {loveLetterText.map((paragraph, index) => (
              <motion.p
                key={index}
                className={`${
                  index === 0 || index === loveLetterText.length - 2
                    ? 'font-dancing text-2xl text-pink-600'
                    : paragraph === ''
                    ? 'h-2'
                    : 'font-poppins text-lg text-gray-700 leading-relaxed'
                } ${index === loveLetterText.length - 1 ? 'text-center text-3xl' : ''}`}
                initial={{ x: -50, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Floating romantic elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300 text-xl opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              {['💖', '💝', '💕', '💗', '💓'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MessageSection;