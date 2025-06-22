import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-pink-400 via-purple-500 to-rose-400 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center">
        <motion.div
          className="relative mb-8"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity }
          }}
        >
          <Heart className="w-20 h-20 text-white fill-current drop-shadow-2xl" />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-white/30"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-6xl font-dancing text-white mb-4 drop-shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading Our Love Story...
        </motion.h1>
        
        <motion.div
          className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: 256 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-white to-pink-200 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 1 }}
          />
        </motion.div>
        
        <motion.p
          className="text-white/80 text-lg mt-4 font-poppins"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Preparing something magical for you...
        </motion.p>
      </div>
      
      {/* Floating hearts */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <Heart className="w-4 h-4 text-white/50 fill-current" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default LoadingScreen;