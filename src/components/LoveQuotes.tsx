import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const LoveQuotes: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    {
      text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
      author: "Maya Angelou",
      category: "Classic"
    },
    {
      text: "You are my today and all of my tomorrows.",
      author: "Leo Christopher",
      category: "Modern"
    },
    {
      text: "I have found the one whom my soul loves.",
      author: "Song of Solomon 3:4",
      category: "Biblical"
    },
    {
      text: "Every day I fall in love with you more and more, except yesterday, I loved you less than today and tomorrow I will love you more.",
      author: "Unknown",
      category: "Personal"
    },
    {
      text: "You're my favorite notification, my sweetest distraction, and my most beautiful reality.",
      author: "Our Story",
      category: "Personal"
    },
    {
      text: "I love you not only for what you are, but for what I am when I am with you.",
      author: "Elizabeth Barrett Browning",
      category: "Classic"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [quotes.length]);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-dancing text-gray-800 mb-4">
            Love Quotes
          </h2>
          <p className="text-xl text-gray-600 font-poppins">
            Beautiful words about the magic of love
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-100 relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8">
            <motion.button
              onClick={prevQuote}
              className="p-3 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex items-center space-x-2">
              <Quote className="w-8 h-8 text-pink-500" />
              <span className="text-lg font-dancing text-gray-700">
                Quote {currentQuote + 1} of {quotes.length}
              </span>
            </div>

            <motion.button
              onClick={nextQuote}
              className="p-3 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="text-center min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <blockquote className="text-2xl md:text-3xl font-dancing text-gray-800 leading-relaxed italic">
                  "{quotes[currentQuote].text}"
                </blockquote>
                
                <div className="space-y-2">
                  <cite className="text-lg font-poppins text-gray-600 not-italic">
                    — {quotes[currentQuote].author}
                  </cite>
                  <div className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-poppins">
                    {quotes[currentQuote].category}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quote indicator dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {quotes.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentQuote(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentQuote 
                    ? 'bg-pink-500 scale-125' 
                    : 'bg-pink-200 hover:bg-pink-300'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating quote symbols */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-200 text-4xl opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              "
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveQuotes;