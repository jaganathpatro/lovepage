import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, SkipForward, SkipBack } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Romantic playlist (using placeholder audio files - in real implementation, use actual audio files)
  const playlist = [
  { title: "Tum Hi Ho", artist: "Arijit Singh", src: "/tum-hi-ho.mp3" },
  { title: "Kal Ho Naa Ho", artist: "Sonu Nigam", src: "/kal-ho-naa-ho.mp3" },
  { title: "Tera Ban Jaunga", artist: "Akhil Sachdeva", src: "/tera-ban-jaunga.mp3" }
 ];


  useEffect(() => {
    // Show music player after a few seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  if (audioRef.current && isPlaying) {
    audioRef.current.load(); // Reload the new source
    audioRef.current.play();
  }
  }, [currentTrack]);


  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Since we don't have actual audio files, we'll simulate playing
        setIsMuted(false);
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-24 right-8 z-40 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-pink-200 p-4 max-w-sm"
          initial={{ scale: 0, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 100 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Music className="w-5 h-5 text-pink-500" />
              <span className="font-dancing text-lg text-gray-800">Romantic Vibes</span>
            </div>
            <motion.button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ×
            </motion.button>
          </div>

          {/* Track Info */}
          <div className="text-center mb-4">
            <h4 className="font-poppins text-sm font-semibold text-gray-800">
              {playlist[currentTrack].title}
            </h4>
            <p className="font-poppins text-xs text-gray-500">
              {playlist[currentTrack].artist}
            </p>
          </div>

          {/* Visualizer */}
          <div className="flex justify-center items-end space-x-1 mb-4 h-12">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-pink-500 to-purple-500 rounded-full"
                animate={isPlaying && !isMuted ? {
                  height: [8, 20 + Math.random() * 20, 8],
                } : { height: 8 }}
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: isPlaying && !isMuted ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <motion.button
              onClick={prevTrack}
              className="p-2 text-gray-600 hover:text-pink-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkipBack className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={togglePlay}
              className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </motion.button>

            <motion.button
              onClick={nextTrack}
              className="p-2 text-gray-600 hover:text-pink-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkipForward className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={toggleMute}
              className="text-gray-600 hover:text-pink-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </motion.button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer volume-slider"
            />
          </div>

          {/* Floating notes animation */}
          {isPlaying && !isMuted && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-pink-400 text-sm opacity-60"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    bottom: '20%',
                  }}
                  animate={{
                    y: [-10, -40],
                    opacity: [0.6, 0],
                    scale: [0.8, 1.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  ♪
                </motion.div>
              ))}
            </div>
          )}

          {/* Hidden audio element for future implementation */}
          <audio
          ref={audioRef}
          loop
          muted={isMuted}
          volume={volume}
          src={playlist[currentTrack].src}
          onEnded={nextTrack} // Optional: auto-play next track when one ends
          />

          
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MusicPlayer;