import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, MessageCircleHeart as MessageHeart } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface Message {
  id: number;
  text: string;
  author: string;
  timestamp: Date;
  hearts: number;
}

const ConfessionWall: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Love is not about how many days, months, or years you have been together. It's about how much you love each other every single day.",
      author: "Anonymous",
      timestamp: new Date('2024-01-15'),
      hearts: 24
    },
    {
      id: 2,
      text: "You make my heart skip a beat and my soul feel complete. Thank you for being my everything.",
      author: "Sarah M.",
      timestamp: new Date('2024-01-20'),
      hearts: 18
    },
    {
      id: 3,
      text: "In a world full of temporary things, you are a perpetual feeling. I love you endlessly.",
      author: "John D.",
      timestamp: new Date('2024-01-25'),
      hearts: 31
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [likedMessages, setLikedMessages] = useState<Set<number>>(new Set());

  const submitMessage = () => {
    if (!newMessage.trim() || !authorName.trim()) return;
    
    const message: Message = {
      id: Date.now(),
      text: newMessage.trim(),
      author: authorName.trim(),
      timestamp: new Date(),
      hearts: 0
    };
    
    setMessages(prev => [message, ...prev]);
    setNewMessage('');
    setAuthorName('');
  };

  const likeMessage = (messageId: number) => {
    if (likedMessages.has(messageId)) return;
    
    setLikedMessages(prev => new Set([...prev, messageId]));
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, hearts: msg.hearts + 1 }
          : msg
      )
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-dancing text-gray-800 mb-4">
            Confession Wall
          </h2>
          <p className="text-xl text-gray-600 font-poppins">
            Share your love and read beautiful messages from others
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Message Submission Form */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-pink-100 mb-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <MessageHeart className="w-6 h-6 text-pink-500" />
            <h3 className="text-2xl font-dancing text-gray-800">Share Your Love</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-poppins text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors bg-white/80 font-poppins"
                placeholder="Enter your name..."
                maxLength={50}
              />
            </div>
            
            <div>
              <label className="block text-sm font-poppins text-gray-700 mb-2">
                Your Love Message
              </label>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors bg-white/80 font-poppins resize-none"
                placeholder="Share your thoughts about love..."
                rows={4}
                maxLength={300}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {newMessage.length}/300
              </div>
            </div>
            
            <motion.button
              onClick={submitMessage}
              disabled={!newMessage.trim() || !authorName.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-poppins text-lg shadow-lg hover:shadow-pink-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-5 h-5" />
              <span>Share Love</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Messages Wall */}
        <div className="space-y-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <div className="space-y-4">
                  <p className="text-lg font-poppins text-gray-700 leading-relaxed">
                    "{message.text}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="font-dancing text-lg text-pink-600">
                        — {message.author}
                      </span>
                      <span className="text-sm text-gray-500 font-poppins">
                        {formatDate(message.timestamp)}
                      </span>
                    </div>
                    
                    <motion.button
                      onClick={() => likeMessage(message.id)}
                      disabled={likedMessages.has(message.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all ${
                        likedMessages.has(message.id)
                          ? 'bg-pink-100 text-pink-600 cursor-not-allowed'
                          : 'bg-white/80 text-gray-600 hover:bg-pink-100 hover:text-pink-600'
                      }`}
                      whileHover={!likedMessages.has(message.id) ? { scale: 1.05 } : {}}
                      whileTap={!likedMessages.has(message.id) ? { scale: 0.95 } : {}}
                    >
                      <Heart 
                        className={`w-4 h-4 ${
                          likedMessages.has(message.id) ? 'fill-current' : ''
                        }`} 
                      />
                      <span className="text-sm font-poppins">{message.hearts}</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Floating love elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300 text-xl opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            >
              {['💌', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConfessionWall;