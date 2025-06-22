import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CursorEffects from './components/CursorEffects';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import MessageSection from './components/MessageSection';
import PhotoGallery from './components/PhotoGallery';
import MusicPlayer from './components/MusicPlayer';
import LoveCalculator from './components/LoveCalculator';
import RomanceGames from './components/RomanceGames';
import AnniversaryCountdown from './components/AnniversaryCountdown';
import ConfessionWall from './components/ConfessionWall';
import LoveQuotes from './components/LoveQuotes';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 overflow-hidden">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <CursorEffects />
          <Navigation />
          <HeroSection />
          <MessageSection />
          <PhotoGallery />
          <LoveCalculator />
          <RomanceGames />
          <AnniversaryCountdown />
          <LoveQuotes />
          <ConfessionWall />
          <Footer />
          <MusicPlayer />
        </motion.div>
      )}
    </div>
  );
}

export default App;