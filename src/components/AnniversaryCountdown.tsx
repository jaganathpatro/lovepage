import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Gift, Sparkles } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const AnniversaryCountdown: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set anniversary date to next Valentine's Day or a future date
  const getNextAnniversary = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let anniversaryDate = new Date(currentYear, 9, 8); // February 14th
    
    // If this year's Valentine's Day has passed, use next year's
    if (anniversaryDate < now) {
      anniversaryDate = new Date(currentYear + 1, 1, 14);
    }
    
    return anniversaryDate;
  };

  const anniversaryDate = getNextAnniversary();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = anniversaryDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update immediately
    updateCountdown();
    
    // Then update every second
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [anniversaryDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, color: 'from-pink-500 to-rose-500', icon: '📅' },
    { label: 'Hours', value: timeLeft.hours, color: 'from-purple-500 to-pink-500', icon: '⏰' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'from-indigo-500 to-purple-500', icon: '⏱️' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'from-rose-500 to-pink-500', icon: '⚡' }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="anniversary" className="py-20 bg-gradient-to-br from-white via-pink-50 to-purple-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h2 className="text-5xl md:text-6xl font-dancing text-gray-800">
              Anniversary Countdown
            </h2>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </motion.div>
          <p className="text-xl text-gray-600 font-poppins">
            Counting down to our special celebration
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-100 relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              >
                💕
              </motion.div>
            ))}
          </div>

          <div className="text-center mb-12 relative z-10">
            <motion.div
              className="inline-flex items-center space-x-3 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Calendar className="w-8 h-8 text-pink-500" />
              <span className="text-2xl font-dancing text-gray-800">
                Next Celebration: {formatDate(anniversaryDate)}
              </span>
              <Gift className="w-8 h-8 text-purple-500" />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 relative z-10">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                className="text-center"
                initial={{ y: 30, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <motion.div
                  className={`relative w-24 h-24 md:w-32 md:h-32 mx-auto rounded-2xl bg-gradient-to-br ${unit.color} flex flex-col items-center justify-center shadow-lg overflow-hidden`}
                  animate={{ 
                    scale: unit.label === 'Seconds' ? [1, 1.05, 1] : 1,
                    boxShadow: unit.label === 'Seconds' ? [
                      "0 10px 25px rgba(236, 72, 153, 0.3)",
                      "0 15px 35px rgba(236, 72, 153, 0.5)",
                      "0 10px 25px rgba(236, 72, 153, 0.3)"
                    ] : "0 10px 25px rgba(236, 72, 153, 0.3)"
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: unit.label === 'Seconds' ? Infinity : 0 
                  }}
                >
                  {/* Animated background glow */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-2xl"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />
                  
                  <div className="text-lg mb-1">{unit.icon}</div>
                  <motion.span
                    className="text-2xl md:text-4xl font-bold text-white relative z-10"
                    key={unit.value}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {unit.value.toString().padStart(2, '0')}
                  </motion.span>
                </motion.div>
                <p className="text-lg font-poppins text-gray-700 mt-3 font-semibold">{unit.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center space-y-4 relative z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.p
              className="text-xl font-dancing text-gray-700 mb-4"
              animate={{ 
                color: ["#374151", "#ec4899", "#8b5cf6", "#374151"]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity 
              }}
            >
              "Every day with you is a celebration, but anniversaries are extra special! 💕"
            </motion.p>
            
            <div className="flex justify-center items-center space-x-2">
              <Heart className="w-5 h-5 text-pink-500 fill-current animate-pulse" />
              <span className="font-poppins text-gray-600">
                Making every moment count until our celebration
              </span>
              <Heart className="w-5 h-5 text-pink-500 fill-current animate-pulse" />
            </div>

            {/* Progress bar showing time until anniversary */}
            <div className="mt-6">
              <div className="w-full bg-pink-100 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "75%" }} // This would be calculated based on actual time
                  transition={{ duration: 2, delay: 1.5 }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2 font-poppins">
                Time until our special day
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating celebration elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300 text-2xl opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              {['🎉', '✨', '💖', '🌟', '💕'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnniversaryCountdown;