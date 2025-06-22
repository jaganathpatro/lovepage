import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  y: number;
}

const CursorEffects: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add heart trail
      const newHeart: Heart = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      
      setHearts(prev => [...prev, newHeart]);
      
      // Remove heart after animation
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, 1000);
    };

    const handleClick = (e: MouseEvent) => {
      // Create burst of hearts on click
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const burstHeart: Heart = {
            id: Date.now() + Math.random(),
            x: e.clientX + (Math.random() - 0.5) * 50,
            y: e.clientY + (Math.random() - 0.5) * 50,
          };
          setHearts(prev => [...prev, burstHeart]);
          
          setTimeout(() => {
            setHearts(prev => prev.filter(heart => heart.id !== burstHeart.id));
          }, 1500);
        }, i * 100);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-500"
            style={{ left: heart.x - 8, top: heart.y - 8 }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1, 0.8, 0],
              y: heart.y - 50,
              opacity: [1, 1, 0.5, 0],
              rotate: [0, 15, -15, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Custom cursor */}
      <motion.div
        className="absolute w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
      >
        <div className="w-full h-full rounded-full bg-pink-400 opacity-80" />
      </motion.div>
    </div>
  );
};

export default CursorEffects;