import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const LoveCalculator: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) return;
    
    setIsCalculating(true);
    
    // Simulate calculation delay for dramatic effect
    setTimeout(() => {
      // Create a "realistic" but fun calculation based on names
      const combined = (name1 + name2).toLowerCase();
      let score = 0;
      
      // Add points for various letter combinations and patterns
      for (let i = 0; i < combined.length; i++) {
        score += combined.charCodeAt(i);
      }
      
      // Ensure it's a reasonable percentage (60-100% for positivity)
      const percentage = Math.min(100, Math.max(60, (score % 41) + 60));
      
      setResult(percentage);
      setIsCalculating(false);
      
      if (percentage >= 90) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }, 2000);
  };

  const getResultMessage = (percentage: number) => {
    if (percentage >= 95) return "Absolutely Perfect! You're soulmates! 💕✨";
    if (percentage >= 90) return "Incredible match! True love detected! 💖";
    if (percentage >= 80) return "Amazing compatibility! You're meant to be! 💗";
    if (percentage >= 70) return "Great connection! Love is in the air! 💓";
    return "Sweet potential! Love grows stronger every day! 💕";
  };

  const getResultColor = (percentage: number) => {
    if (percentage >= 90) return "from-pink-500 to-red-500";
    if (percentage >= 80) return "from-pink-400 to-purple-500";
    if (percentage >= 70) return "from-purple-400 to-pink-400";
    return "from-rose-400 to-pink-400";
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-white via-rose-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-dancing text-gray-800 mb-4">
            Love Calculator
          </h2>
          <p className="text-xl text-gray-600 font-poppins">
            Discover the magical connection between two hearts
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-100"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="space-y-2"
                initial={{ x: -50, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <label className="block text-lg font-poppins text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors bg-white/80 font-poppins"
                  placeholder="Enter first name..."
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ x: 50, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <label className="block text-lg font-poppins text-gray-700">
                  Second Name
                </label>
                <input
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors bg-white/80 font-poppins"
                  placeholder="Enter second name..."
                />
              </motion.div>
            </div>

            <motion.div
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.button
                onClick={calculateLove}
                disabled={!name1.trim() || !name2.trim() || isCalculating}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-poppins text-lg shadow-lg hover:shadow-pink-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCalculating ? (
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Heart className="w-5 h-5" />
                    </motion.div>
                    <span>Calculating Love...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Calculate Love</span>
                  </div>
                )}
              </motion.button>
            </motion.div>

            {/* Results */}
            {result !== null && !isCalculating && (
              <motion.div
                className="text-center space-y-6"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <div className="relative">
                  <motion.div
                    className={`text-6xl md:text-8xl font-bold bg-gradient-to-r ${getResultColor(result)} bg-clip-text text-transparent`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
                  >
                    {result}%
                  </motion.div>
                  
                  {result >= 90 && (
                    <motion.div
                      className="absolute -inset-4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-8 h-8 text-yellow-400 absolute top-0 left-0" />
                      <Sparkles className="w-6 h-6 text-pink-400 absolute top-0 right-0" />
                      <Sparkles className="w-7 h-7 text-purple-400 absolute bottom-0 left-0" />
                      <Sparkles className="w-5 h-5 text-rose-400 absolute bottom-0 right-0" />
                    </motion.div>
                  )}
                </div>

                <motion.p
                  className="text-xl md:text-2xl font-dancing text-gray-700"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {getResultMessage(result)}
                </motion.p>

                <motion.div
                  className="flex justify-center space-x-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <Heart 
                        className={`w-6 h-6 ${
                          result >= (i + 1) * 20 
                            ? 'text-pink-500 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Celebration Animation */}
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none z-30">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  y: -100,
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 1,
                }}
              >
                {['💕', '💖', '💗', '💓', '💝', '🌟', '✨'][Math.floor(Math.random() * 7)]}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LoveCalculator;