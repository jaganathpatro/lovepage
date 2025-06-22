
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Trophy, RotateCcw, Gamepad2, Zap, Target } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Fun' | 'Quiz' | 'Action';
}

const RomanceGames: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games: Game[] = [
    {
      id: 'impossible-choice',
      title: 'Do You Love Me?',
      description: 'The impossible choice game - try to say no!',
      icon: <Heart className="w-6 h-6" />,
      difficulty: 'Easy',
      category: 'Fun'
    },
    {
      id: 'catch-hearts',
      title: 'Catch My Heart',
      description: 'Catch falling hearts and avoid broken ones!',
      icon: <Target className="w-6 h-6" />,
      difficulty: 'Medium',
      category: 'Action'
    },
    {
      id: 'love-quiz',
      title: 'Love Quiz',
      description: 'Test your romantic knowledge!',
      icon: <Trophy className="w-6 h-6" />,
      difficulty: 'Hard',
      category: 'Quiz'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fun': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'Quiz': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Action': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const ImpossibleChoiceGame = () => {
    const [stage, setStage] = useState(0);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [showFinal, setShowFinal] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [isNoButtonMoving, setIsNoButtonMoving] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [noButtonSize, setNoButtonSize] = useState(1);
    const gameAreaRef = useRef<HTMLDivElement>(null);

    const stages = [
      { yes: "Yes! 💕", no: "No", question: "Do you love me?" },
      { yes: "Of course! 😍", no: "Maybe not...", question: "Are you sure you love me?" },
      { yes: "Absolutely! 🥰", no: "I'm not sure...", question: "Do you really, really love me?" },
      { yes: "Forever! 💖", no: "Definitely not!", question: "Will you love me forever?" },
      { yes: "Always! ✨", no: "Never!", question: "Promise you'll always love me?" }
    ];

    const funnyMessages = [
      "Nice try! The button is playing hard to get! 😏",
      "Oops! It's shy and ran away! 🙈",
      "The button said 'catch me if you can!' 😂",
      "It's doing a little dance! 💃",
      "The button is being dramatic! 🎭",
      "It jumped away like a scared bunny! 🐰",
      "The button is playing hide and seek! 🫣",
      "It's pretending to be a butterfly! 🦋"
    ];

    const moveNoButton = () => {
      if (isNoButtonMoving) return;
      
      setIsNoButtonMoving(true);
      setAttempts(prev => prev + 1);
      
      // Get game area dimensions
      const gameArea = gameAreaRef.current;
      if (!gameArea) return;
      
      const rect = gameArea.getBoundingClientRect();
      const maxX = Math.min(100, rect.width / 8);
      const maxY = Math.min(60, rect.height / 8);
      
      // Generate new position with better distribution
      let newX, newY;
      const angle = Math.random() * 2 * Math.PI;
      const distance = 50 + Math.random() * 50;
      
      newX = Math.cos(angle) * distance;
      newY = Math.sin(angle) * distance;
      
      // Ensure it stays within bounds
      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxY, Math.min(maxY, newY));
      
      setNoButtonPosition({ x: newX, y: newY });
      
      // Make button smaller each time (more frustrating/funny)
      if (attempts > 3) {
        setNoButtonSize(Math.max(0.7, 1 - (attempts - 3) * 0.1));
      }
      
      // Show hint after several attempts
      if (attempts === 4) {
        setShowHint(true);
        setTimeout(() => setShowHint(false), 3000);
      }
      
      // Reset moving state after animation
      setTimeout(() => setIsNoButtonMoving(false), 600);
    };

    const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      moveNoButton();
    };

    const handleYes = () => {
      if (stage < stages.length - 1) {
        setStage(stage + 1);
        setAttempts(0);
        setNoButtonPosition({ x: 0, y: 0 });
        setNoButtonSize(1);
        setShowHint(false);
      } else {
        setShowFinal(true);
      }
    };

    const resetGame = () => {
      setStage(0);
      setShowFinal(false);
      setNoButtonPosition({ x: 0, y: 0 });
      setAttempts(0);
      setIsNoButtonMoving(false);
      setShowHint(false);
      setNoButtonSize(1);
    };

    // Auto-move the no button occasionally for extra playfulness
    useEffect(() => {
      if (showFinal || isNoButtonMoving) return;
      
      const interval = setInterval(() => {
        if (Math.random() < 0.2 && attempts > 0) { // 20% chance every 4 seconds, only after first attempt
          moveNoButton();
        }
      }, 4000);

      return () => clearInterval(interval);
    }, [showFinal, isNoButtonMoving, attempts]);

    if (showFinal) {
      return (
        <motion.div
          className="text-center space-y-8 p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl relative overflow-hidden"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.2 }}
        >
          {/* Celebration background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-rose-400/20"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.2), rgba(244, 63, 94, 0.2))",
                "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(244, 63, 94, 0.2), rgba(236, 72, 153, 0.2))",
                "linear-gradient(225deg, rgba(244, 63, 94, 0.2), rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.2))"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <motion.div
              className="text-8xl mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: 4 
              }}
            >
              🎉
            </motion.div>
            
            <motion.h3 
              className="text-5xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text mb-4"
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity 
              }}
            >
              I knew it! 💕
            </motion.h3>
            
            <div className="space-y-4 mb-8">
              <p className="text-2xl text-gray-700 font-medium">
                You can't resist true love!
              </p>
              <div className="bg-white/70 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-lg text-gray-600">
                  After <span className="font-bold text-pink-600">{attempts}</span> attempts to say no! 😂
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  The heart always wins in the end! ❤️
                </p>
              </div>
            </div>
            
            <motion.button
              onClick={resetGame}
              className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-xl font-semibold shadow-xl"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px rgba(236, 72, 153, 0.4)",
                background: "linear-gradient(45deg, #ec4899, #8b5cf6, #f43f5e)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-6 h-6" />
                <span>Play Again</span>
                <Heart className="w-6 h-6" />
              </div>
            </motion.button>
          </div>
          
          {/* Enhanced celebration particles */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-30, -120],
                  opacity: [1, 0],
                  scale: [0.5, 2],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 4,
                  delay: Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              >
                {['💕', '💖', '💗', '💓', '💝', '🌟', '✨', '🎊', '🎉', '💫'][Math.floor(Math.random() * 10)]}
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    }

    return (
      <div className="text-center space-y-8 p-8 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl relative">
        {/* Progress indicator */}
        <div className="flex justify-center space-x-2 mb-6">
          {stages.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= stage ? 'bg-pink-500 scale-110' : 'bg-pink-200'
              }`}
            />
          ))}
        </div>

        <div className="space-y-6">
          <motion.h3 
            className="text-4xl font-bold text-gray-800"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {stages[stage].question}
          </motion.h3>
          
          <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-lg text-gray-600">
              Stage <span className="font-bold text-pink-600">{stage + 1}</span> of {stages.length}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Attempts to say no: <span className="font-bold text-purple-600">{attempts}</span>
            </div>
          </div>
        </div>
        
        <div 
          ref={gameAreaRef}
          className="relative h-64 flex items-center justify-center overflow-visible bg-gradient-to-br from-pink-100/50 to-purple-100/50 rounded-2xl border-2 border-pink-200/50"
          style={{ minHeight: '250px' }}
        >
          {/* Game instructions */}
          <div className="absolute top-4 left-4 right-4 text-center z-10">
            <p className="text-sm text-gray-600 bg-white/70 rounded-lg px-3 py-2 backdrop-blur-sm">
              💡 Try to click "No" if you can! 😉
            </p>
          </div>

          {/* Yes Button - Always centered and prominent */}
          <motion.button
            onClick={handleYes}
            className="px-12 py-6 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full text-2xl font-bold shadow-2xl z-20 relative"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 25px 50px rgba(236, 72, 153, 0.6)",
              background: "linear-gradient(45deg, #ec4899, #f43f5e)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 15px 35px rgba(236, 72, 153, 0.4)",
                "0 20px 45px rgba(236, 72, 153, 0.6)",
                "0 15px 35px rgba(236, 72, 153, 0.4)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6" />
              <span>{stages[stage].yes}</span>
              <Heart className="w-6 h-6" />
            </div>
          </motion.button>
          
          {/* No Button - Fixed positioning and visibility */}
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full text-lg font-semibold shadow-xl absolute z-30 select-none"
            style={{
              left: `calc(50% + ${noButtonPosition.x}px)`,
              top: `calc(50% + ${noButtonPosition.y}px)`,
              transform: `translate(-50%, -50%) scale(${noButtonSize})`,
              transformOrigin: 'center',
              touchAction: 'none',
              pointerEvents: 'auto'
            }}
            onMouseEnter={moveNoButton}
            onMouseDown={handleNoInteraction}
            onTouchStart={handleNoInteraction}
            onFocus={moveNoButton}
            whileHover={{ 
              scale: noButtonSize * 1.1,
              rotate: [0, -15, 15, 0]
            }}
            animate={{ 
              rotate: isNoButtonMoving ? [0, 360] : 0,
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              rotate: { duration: 0.5, ease: "easeInOut" }
            }}
          >
            <div className="flex items-center space-x-2">
              <span>{stages[stage].no}</span>
              {attempts > 2 && <span className="text-xs">😅</span>}
            </div>
          </motion.button>

          {/* Hint overlay */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-2xl text-center max-w-sm"
                  initial={{ scale: 0, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: 50 }}
                >
                  <div className="text-4xl mb-3">💡</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Pro Tip!</h4>
                  <p className="text-gray-600">
                    The "No" button is getting shy! Maybe it's trying to tell you something... 😉
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Funny message display */}
        <AnimatePresence>
          {attempts > 0 && (
            <motion.div
              className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-4 border border-pink-200"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              key={attempts}
            >
              <p className="text-xl font-bold text-pink-600 mb-2">
                {funnyMessages[Math.min(attempts - 1, funnyMessages.length - 1)]}
              </p>
              <div className="flex justify-center space-x-4 text-sm text-gray-600">
                <span>Attempts: <strong>{attempts}</strong></span>
                <span>•</span>
                <span>Button size: <strong>{Math.round(noButtonSize * 100)}%</strong></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Instructions */}
        <div className="space-y-3 text-sm text-gray-500">
          <p className="flex items-center justify-center space-x-2">
            <span>🖱️</span>
            <span>Desktop: Hover or click the "No" button</span>
          </p>
          <p className="flex items-center justify-center space-x-2">
            <span>📱</span>
            <span>Mobile: Tap the "No" button</span>
          </p>
          <p className="text-xs text-gray-400">
            The more you try to say no, the more elusive it becomes! 💕
          </p>
        </div>
      </div>
    );
  };

  // Enhanced Catch Hearts Game
  const CatchHeartsGame = () => {
    const [score, setScore] = useState(0);
    const [hearts, setHearts] = useState<Array<{id: number, x: number, y: number, type: 'good' | 'bad' | 'golden', speed: number}>>([]);
    const [gameActive, setGameActive] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20);
    const [combo, setCombo] = useState(0);
    const [powerUp, setPowerUp] = useState<string | null>(null);

    const startGame = () => {
      setScore(0);
      setHearts([]);
      setGameActive(true);
      setGameOver(false);
      setTimeLeft(20);
      setCombo(0);
      setPowerUp(null);
      
      const gameTimer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameActive(false);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      const heartInterval = setInterval(() => {
        if (Math.random() < 0.4) {
          const heartType = Math.random() < 0.05 ? 'golden' : Math.random() < 0.8 ? 'good' : 'bad';
          const newHeart = {
            id: Date.now() + Math.random(),
            x: Math.random() * 280,
            y: 0,
            type: heartType,
            speed: 2 + Math.random() * 2
          };
          setHearts(prev => [...prev, newHeart]);
        }
      }, 600);

      setTimeout(() => {
        clearInterval(heartInterval);
        clearInterval(gameTimer);
      }, 20000);

      return () => {
        clearInterval(heartInterval);
        clearInterval(gameTimer);
      };
    };

    const catchHeart = (heartId: number, type: string) => {
      setHearts(prev => prev.filter(h => h.id !== heartId));
      
      if (type === 'good') {
        setScore(prev => prev + (10 * (combo + 1)));
        setCombo(prev => prev + 1);
      } else if (type === 'golden') {
        setScore(prev => prev + (50 * (combo + 1)));
        setCombo(prev => prev + 2);
        setPowerUp('Golden Boost!');
        setTimeout(() => setPowerUp(null), 1000);
      } else if (type === 'bad') {
        setScore(prev => Math.max(0, prev - 20));
        setCombo(0);
      }
    };

    const getScoreMessage = (score: number) => {
      if (score >= 500) return "💕 Legendary Lover! You're unstoppable!";
      if (score >= 300) return "🔥 Heart Hunter! Amazing skills!";
      if (score >= 200) return "⭐ Love Expert! Great job!";
      if (score >= 100) return "💖 Sweet Catcher! Not bad!";
      return "💝 Keep practicing, love grows with time!";
    };

    return (
      <div className="space-y-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
        <div className="flex justify-between items-center bg-white/50 rounded-xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">{score}</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{combo}</div>
            <div className="text-sm text-gray-600">Combo</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{timeLeft}</div>
            <div className="text-sm text-gray-600">Time</div>
          </div>
        </div>

        <AnimatePresence>
          {powerUp && (
            <motion.div
              className="text-center text-xl font-bold text-yellow-600 bg-yellow-100 rounded-lg p-2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              {powerUp}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative w-full h-80 border-4 border-pink-200 rounded-2xl overflow-hidden bg-gradient-to-b from-pink-50 via-purple-50 to-rose-50 shadow-inner">
          {/* Game instructions overlay */}
          {!gameActive && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
              <div className="text-center space-y-4">
                <div className="text-4xl">🎯</div>
                <h4 className="text-xl font-bold text-gray-800">Catch the Hearts!</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>💖 Pink hearts: +10 points</div>
                  <div>💛 Golden hearts: +50 points</div>
                  <div>💔 Broken hearts: -20 points</div>
                  <div>🔥 Build combos for bonus points!</div>
                </div>
              </div>
            </div>
          )}

          {hearts.map(heart => (
            <motion.button
              key={heart.id}
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-transform ${
                heart.type === 'golden' ? 'shadow-lg shadow-yellow-300' : 
                heart.type === 'good' ? 'shadow-lg shadow-pink-300' : 'shadow-lg shadow-gray-300'
              }`}
              style={{ left: heart.x, top: heart.y }}
              animate={{ y: 320 }}
              transition={{ duration: 4 / heart.speed, ease: "linear" }}
              onClick={() => catchHeart(heart.id, heart.type)}
              onAnimationComplete={() => {
                setHearts(prev => prev.filter(h => h.id !== heart.id));
                if (heart.type !== 'bad') {
                  setCombo(0); // Reset combo if heart is missed
                }
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {heart.type === 'golden' ? '💛' : heart.type === 'good' ? '💖' : '💔'}
            </motion.button>
          ))}

          {/* Combo indicator */}
          {combo > 2 && gameActive && (
            <motion.div
              className="absolute top-4 left-4 bg-yellow-400 text-white px-3 py-1 rounded-full font-bold"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {combo}x COMBO!
            </motion.div>
          )}
        </div>

        {!gameActive && (
          <motion.button
            onClick={startGame}
            className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-lg shadow-lg"
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <Gamepad2 className="w-5 h-5" />
              <span>{gameOver ? 'Play Again' : 'Start Game'}</span>
            </div>
          </motion.button>
        )}

        {gameOver && (
          <motion.div
            className="text-center bg-white/70 rounded-xl p-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <div className="text-4xl mb-2">
              {score >= 300 ? '🏆' : score >= 200 ? '⭐' : score >= 100 ? '💖' : '💝'}
            </div>
            <p className="text-lg font-bold text-gray-700">
              {getScoreMessage(score)}
            </p>
            <div className="text-sm text-gray-500 mt-2">
              Final Score: {score} • Best Combo: {combo}
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  
  // Enhanced Love Quiz Game
  const LoveQuizGame = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(15);
    const [streak, setStreak] = useState(0);

    const questions = [
      {
        question: "What's the secret to a lasting relationship?",
        answers: ["Never arguing", "Communication and respect", "Always agreeing", "Expensive gifts"],
        correct: 1,
        explanation: "Communication and respect are the foundation of love! 💕",
        difficulty: "Easy"
      },
      {
        question: "When your partner says 'I'm fine', they usually mean:",
        answers: ["They're actually fine", "Order takeout and hide", "Ask what's really wrong", "Ignore it"],
        correct: 2,
        explanation: "Caring enough to ask shows you truly listen! 💖",
        difficulty: "Medium"
      },
      {
        question: "The best way to show love is:",
        answers: ["Expensive gifts only", "Quality time together", "Social media posts", "Constant texting"],
        correct: 1,
        explanation: "Time is the most precious gift you can give! ⏰💝",
        difficulty: "Easy"
      },
      {
        question: "In a healthy relationship, you should:",
        answers: ["Share everything immediately", "Maintain some independence", "Always be together", "Never disagree"],
        correct: 1,
        explanation: "Balance is key - love grows when both people can be themselves! 🌱",
        difficulty: "Hard"
      },
      {
        question: "The most romantic gesture is:",
        answers: ["Remembering small details", "Grand expensive surprises", "Public declarations", "Matching outfits"],
        correct: 0,
        explanation: "It's the little things that show you truly care and pay attention! 💭💕",
        difficulty: "Medium"
      }
    ];

    useEffect(() => {
      if (selectedAnswer === null && !showResult) {
        const timer = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              handleAnswer(-1); // Time's up
              return 15;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      }
    }, [currentQuestion, selectedAnswer, showResult]);

    const handleAnswer = (answerIndex: number) => {
      setSelectedAnswer(answerIndex);
      
      if (answerIndex === questions[currentQuestion].correct) {
        const timeBonus = Math.floor(timeLeft / 3);
        setScore(score + 10 + timeBonus);
        setStreak(prev => prev + 1);
      } else {
        setStreak(0);
      }
      
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setTimeLeft(15);
        } else {
          setShowResult(true);
        }
      }, 2000);
    };

    const resetQuiz = () => {
      setCurrentQuestion(0);
      setScore(0);
      setShowResult(false);
      setSelectedAnswer(null);
      setTimeLeft(15);
      setStreak(0);
    };

    const getGrade = (score: number, total: number) => {
      const percentage = (score / (total * 10)) * 100;
      if (percentage >= 90) return { grade: 'A+', message: 'Love Genius! 🧠💕' };
      if (percentage >= 80) return { grade: 'A', message: 'Romance Expert! 💖' };
      if (percentage >= 70) return { grade: 'B+', message: 'Love Scholar! 📚💕' };
      if (percentage >= 60) return { grade: 'B', message: 'Good Heart! ❤️' };
      return { grade: 'C+', message: 'Keep Learning About Love! 💝' };
    };

    if (showResult) {
      const result = getGrade(score, questions.length);
      return (
        <motion.div
          className="text-center space-y-6 p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <motion.div
            className="text-8xl"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 0.6, 
              repeat: 2 
            }}
          >
            {result.grade === 'A+' || result.grade === 'A' ? '🏆' : 
             result.grade.startsWith('B') ? '⭐' : '💝'}
          </motion.div>
          
          <div className="space-y-4">
            <motion.div
              className="text-6xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              {result.grade}
            </motion.div>
            
            <h3 className="text-3xl font-bold text-pink-600">
              {result.message}
            </h3>
            
            <div className="bg-white/50 rounded-xl p-4 space-y-2">
              <div className="text-2xl font-bold text-gray-800">{score} points</div>
              <div className="text-sm text-gray-600">
                {currentQuestion + 1} questions • Best streak: {streak}
              </div>
            </div>
          </div>
          
          <motion.button
            onClick={resetQuiz}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-lg shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-2">
              <RotateCcw className="w-5 h-5" />
              <span>Try Again</span>
            </div>
          </motion.button>
        </motion.div>
      );
    }

    return (
      <div className="space-y-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
        <div className="flex justify-between items-center bg-white/50 rounded-xl p-4">
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {currentQuestion + 1}/{questions.length}
            </div>
            <div className="text-sm text-gray-600">Question</div>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-lg font-bold text-pink-600"
              animate={{ scale: timeLeft <= 5 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
            >
              {timeLeft}s
            </motion.div>
            <div className="text-sm text-gray-600">Time</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{score}</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
        </div>

        {streak > 1 && (
          <motion.div
            className="text-center bg-yellow-100 border border-yellow-300 rounded-lg p-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <span className="text-yellow-700 font-bold text-lg">
              🔥 {streak} question streak!
            </span>
          </motion.div>
        )}

        <div className="space-y-4">
          <div className="text-center">
            <div className={`inline-block px-3 py-1 rounded-full text-xs border ${
              questions[currentQuestion].difficulty === 'Easy' ? 'bg-green-100 text-green-700 border-green-200' :
              questions[currentQuestion].difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
              'bg-red-100 text-red-700 border-red-200'
            }`}>
              {questions[currentQuestion].difficulty}
            </div>
            <h3 className="text-xl text-gray-800 mt-4 leading-relaxed">
              {questions[currentQuestion].question}
            </h3>
          </div>

          <div className="space-y-3">
            {questions[currentQuestion].answers.map((answer, index) => (
              <motion.button
                key={index}
                onClick={() => selectedAnswer === null && handleAnswer(index)}
                className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                  selectedAnswer === null
                    ? 'bg-white hover:bg-purple-50 border-purple-200 hover:border-purple-300 hover:shadow-lg'
                    : selectedAnswer === index
                    ? index === questions[currentQuestion].correct
                      ? 'bg-green-100 border-green-400 text-green-800 shadow-lg'
                      : 'bg-red-100 border-red-400 text-red-800 shadow-lg'
                    : index === questions[currentQuestion].correct
                    ? 'bg-green-100 border-green-400 text-green-800 shadow-lg'
                    : 'bg-gray-100 border-gray-300 text-gray-500'
                }`}
                whileHover={selectedAnswer === null ? { scale: 1.02, x: 5 } : {}}
                whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                disabled={selectedAnswer !== null}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    selectedAnswer === null ? 'bg-purple-100 text-purple-600' :
                    selectedAnswer === index && index === questions[currentQuestion].correct ? 'bg-green-500 text-white' :
                    selectedAnswer === index ? 'bg-red-500 text-white' :
                    index === questions[currentQuestion].correct ? 'bg-green-500 text-white' :
                    'bg-gray-300 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{answer}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {selectedAnswer !== null && (
          <motion.div
            className="text-center p-4 bg-pink-50 rounded-xl border border-pink-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-bold text-lg text-pink-600">
              {questions[currentQuestion].explanation}
            </p>
            {selectedAnswer === questions[currentQuestion].correct && (
              <div className="text-sm text-green-600 mt-2">
                +{10 + Math.floor(timeLeft / 3)} points (including time bonus!)
              </div>
            )}
          </motion.div>
        )}

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    );
  };

  const renderGame = () => {
    switch (selectedGame) {
      case 'impossible-choice':
        return <ImpossibleChoiceGame />;
      case 'catch-hearts':
        return <CatchHeartsGame />;
      case 'love-quiz':
        return <LoveQuizGame />;
      default:
        return null;
    }
  };

  return (
    <section id="games" className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Gamepad2 className="w-8 h-8 text-purple-500" />
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800">
              Romance Games
            </h2>
            <Zap className="w-8 h-8 text-pink-500" />
          </motion.div>
          <p className="text-xl text-gray-600">
            Fun games to play together and test your love!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100 cursor-pointer group relative overflow-hidden"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: "0 25px 50px rgba(236, 72, 153, 0.2)"
                  }}
                  onClick={() => setSelectedGame(game.id)}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-pink-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  
                  <div className="relative z-10 text-center space-y-6">
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg group-hover:shadow-xl transition-shadow"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {game.icon}
                    </motion.div>
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {game.description}
                      </p>
                    </div>

                    <div className="flex justify-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getDifficultyColor(game.difficulty)}`}>
                        {game.difficulty}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getCategoryColor(game.category)}`}>
                        {game.category}
                      </span>
                    </div>
                    
                    <motion.div
                      className="text-pink-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      <span>Click to play</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-100"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                    {games.find(g => g.id === selectedGame)?.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800">
                      {games.find(g => g.id === selectedGame)?.title}
                    </h3>
                    <div className="flex space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(games.find(g => g.id === selectedGame)?.difficulty || 'Easy')}`}>
                        {games.find(g => g.id === selectedGame)?.difficulty}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(games.find(g => g.id === selectedGame)?.category || 'Fun')}`}>
                        {games.find(g => g.id === selectedGame)?.category}
                      </span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => setSelectedGame(null)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-full hover:from-gray-300 hover:to-gray-400 transition-all shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Back to Games</span>
                </motion.button>
              </div>
              {renderGame()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating game elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300 text-2xl opacity-20"
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
              {['🎮', '🎯', '🏆', '⭐', '🎊'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RomanceGames;