import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with floating particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-300 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          className="text-6xl md:text-8xl font-dancing text-gray-800 mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Our Love Story
        </motion.h1>

        <motion.div
          className="text-xl md:text-2xl text-gray-600 font-poppins mb-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            A journey of two hearts beating as one
          </motion.span>
        </motion.div>

        <motion.p
          className="text-lg text-gray-500 font-poppins mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Welcome to our magical world where every moment is a celebration of love, 
          laughter, and the beautiful connection that makes our hearts sing together.
        </motion.p>

        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-poppins text-lg shadow-2xl hover:shadow-pink-500/25 transition-all duration-300"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            document.querySelector('#message')?.scrollIntoView({
              behavior: 'smooth'
            });
          }}
        >
          Discover Our Journey
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-gray-400" />
      </motion.div>

      {/* Floating hearts */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400 text-2xl opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            rotate: [0, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          💕
        </motion.div>
      ))}
    </section>
  );
};

export default HeroSection;