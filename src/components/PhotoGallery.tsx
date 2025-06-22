import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const PhotoGallery: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Using Pexels stock photos for demonstration
  const photos = [
    {
      id: 1,
      src: "/firstdate.jpg",
      caption: "From strangers to this moment - our first chater 💕",
      quote: "Every love story is beautiful, but ours is my favorite"
    },
    {
      id: 2,
      src: "/smile.jpg",
      caption: "smiles captured, love reflectd",
      quote: "Walking with you feels like coming home"
    },
    {
      id: 3,
      src: "/soul.jpg",
      caption: "Tow souls, one heart, one frame ✨",
      quote: "In your arms, I found my forever"
    },
    {
      id: 4,
      src: "/yoreye.jpg",
      caption: "in her eyes, he saw his whole world.",
      quote: "You're my favorite part of every day"
    }
    // {
    //   id: 5,
    //   src: "https://images.pexels.com/photos/1024997/pexels-photo-1024997.jpeg?auto=compress&cs=tinysrgb&w=800",
    //   caption: "Beach days and endless laughter 🏖️",
    //   quote: "Life is better when we're together"
    // },
    // {
    //   id: 6,
    //   src: "https://images.pexels.com/photos/1024998/pexels-photo-1024998.jpeg?auto=compress&cs=tinysrgb&w=800",
    //   caption: "Cozy nights in 🏠",
    //   quote: "Home is wherever you are"
    // }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === 0 ? photos.length - 1 : selectedPhoto - 1);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-dancing text-gray-800 mb-4">
            Our Beautiful Memories
          </h2>
          <p className="text-xl text-gray-600 font-poppins">
            Every picture tells a story of our love
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPhoto(index)}
            >
              <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200">
                        <div class="text-center">
                          <div class="text-6xl mb-4">💕</div>
                          <p class="text-gray-600 font-poppins">${photo.caption}</p>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-poppins text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.caption}
                </p>
              </div>

              <motion.button
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-300 ${
                  favorites.has(photo.id) 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-white/80 text-gray-600 hover:bg-pink-500 hover:text-white'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(photo.id);
                }}
              >
                <Heart className={`w-4 h-4 ${favorites.has(photo.id) ? 'fill-current' : ''}`} />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhoto !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                className="relative max-w-4xl max-h-full"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={photos[selectedPhoto].src}
                  alt={photos[selectedPhoto].caption}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <p className="text-white font-poppins text-lg mb-2">
                    {photos[selectedPhoto].caption}
                  </p>
                  <p className="text-pink-300 font-dancing text-xl italic">
                    "{photos[selectedPhoto].quote}"
                  </p>
                </div>

                <button
                  className="absolute top-4 right-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                  onClick={() => setSelectedPhoto(null)}
                >
                  <X className="w-6 h-6" />
                </button>

                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                  onClick={prevPhoto}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                  onClick={nextPhoto}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PhotoGallery;