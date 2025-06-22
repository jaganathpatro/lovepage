import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-900 via-purple-900 to-rose-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-6">
          <motion.div
            className="flex justify-center items-center space-x-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-8 h-8 text-pink-400 fill-current" />
            <h3 className="text-2xl font-dancing">Love Stories</h3>
            <Heart className="w-8 h-8 text-pink-400 fill-current" />
          </motion.div>

          <motion.p
            className="text-lg font-poppins text-pink-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Every love story is beautiful, but yours is our favorite. 
            Thank you for letting us be part of your journey.
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="https://bjaganathpatro.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <Code className="w-5 h-5 text-pink-300" />
              <span className="font-poppins text-pink-100">Developer Portfolio</span>
              <ExternalLink className="w-4 h-4 text-pink-300 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>

          <motion.div
            className="pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-pink-200 font-poppins">
              Made with <Heart className="w-4 h-4 inline text-pink-400 fill-current mx-1" /> 
              for all the lovers in the world
            </p>
            <p className="text-sm text-pink-300 mt-2 font-poppins">
             © 2025 Made with 💕 by B.jaganath patro.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;