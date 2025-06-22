import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Our Story', href: '#hero' },
    { name: 'Love Letter', href: '#message' },
    { name: 'Memories', href: '#gallery' },
    { name: 'Love Calculator', href: '#calculator' },
    { name: 'Games', href: '#games' },
    { name: 'Anniversary', href: '#anniversary' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/10 backdrop-blur-md border-b border-white/20' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="w-8 h-8 text-pink-500 fill-current" />
            <span className="text-xl font-dancing text-gray-800">Gelha</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-pink-600 font-poppins transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(item.href)?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-pink-600"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className={`md:hidden bg-white/95 backdrop-blur-md border-b border-pink-200 ${
          isOpen ? 'block' : 'hidden'
        }`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="block px-3 py-2 text-gray-700 hover:text-pink-600 font-poppins"
              whileHover={{ x: 10 }}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                document.querySelector(item.href)?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;