
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onNext: () => void;
}

interface Question {
  q: string;
  options: string[];
  answer: number;
}

const Quiz: React.FC<Props> = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState<null | 'correct' | 'wrong'>(null);
  const [isFinished, setIsFinished] = useState(false);

  const questions: Question[] = [
    {
      q: "When did we hold hands for the first time… even if you were shocked?",
      options: ["14 March", "22nd October 2024", "1st November 2024", "29th October 2024"],
      answer: 1
    },
    {
      q: "Our first video call happened on...",
      options: ["23rd October", "29th October 2024", "1st November", "Diwali Night"],
      answer: 1
    },
    {
      q: "The day that changed everything for us?",
      options: ["1st November 2024", "10th November", "Diwali", "22nd October"],
      answer: 0
    },
    {
      q: "When did we first feel our souls connecting deeply?",
      options: ["20th October", "23rd October 2024", "1st November", "10th November"],
      answer: 1
    },
    {
      q: "Kikiji's first big surprise for me happened on...",
      options: ["Diwali", "1st Nov", "10th November 2024", "Today"],
      answer: 2
    }
  ];

  const penalties = [
    { title: "Penalty noted…", desc: "You owe me five kisses. Slow ones. No rushing." },
    { title: "Penalty upgrade.", desc: "One full minute. Just you… me… and no distance between us." },
    { title: "Penalty: No Escape.", desc: "You don’t get to look away when I pull you closer." },
    { title: "At this point… You belong right here.", desc: "Ear-to-ear smiles. Breath-to-breath silence. No escape 😌" }
  ];

  const praises = [
    "Good girl… you remember 😌",
    "See? You know me too well.",
    "That smile tells me everything.",
    "Correct. My heart is safe with you.",
    "Perfect memory… just like your smile."
  ];

  const handleAnswer = (idx: number) => {
    if (showFeedback) return;

    if (idx === questions[currentIndex].answer) {
      setShowFeedback('correct');
    } else {
      setShowFeedback('wrong');
      setWrongCount(prev => prev + 1);
    }

    // Smoother transition to next step - Increased timeout for reading
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setShowFeedback(null);
      } else {
        setIsFinished(true);
      }
    }, 4500); 
  };

  const currentPenalty = penalties[Math.min(wrongCount - 1, penalties.length - 1)];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#0d0002] px-6 text-center relative overflow-hidden touch-none">
      {/* Background Pulse Effect */}
      <motion.div 
        animate={{ 
          scale: showFeedback === 'wrong' ? [1, 1.2, 1] : 1,
          opacity: showFeedback === 'wrong' ? [0.1, 0.4, 0.1] : 0.05
        }}
        className="absolute inset-0 bg-red-900 pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-lg w-full flex flex-col items-center h-full justify-center">
        {!isFinished ? (
          <div className="w-full relative min-h-[450px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {!showFeedback ? (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full"
                >
                  <p className="font-sans text-[11px] uppercase tracking-[0.5em] text-pink-100 mb-6 font-bold">
                    MERE YAADON KA TEST {currentIndex + 1} / {questions.length}
                  </p>
                  
                  <h2 className="text-3xl font-cursive text-pink-50 mb-4 leading-tight drop-shadow-md">
                    How well do you remember us?
                  </h2>
                  <p className="text-base text-pink-200 font-serif italic mb-10 px-2 drop-shadow-sm">
                    {questions[currentIndex].q}
                  </p>

                  <div className="grid grid-cols-1 gap-3 w-full px-4">
                    {questions[currentIndex].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(i)}
                        className="w-full py-5 px-6 rounded-2xl border border-pink-500/20 bg-white/5 text-pink-50 font-sans text-[11px] tracking-widest uppercase transition-all shadow-lg backdrop-blur-sm active:bg-pink-900/40"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, scale: 0.85, filter: 'blur(15px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.15, filter: 'blur(20px)', transition: { duration: 1.2 } }}
                  transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center w-full px-6"
                >
                  {showFeedback === 'correct' ? (
                    <>
                      <motion.div 
                        animate={{ scale: [1, 1.3, 1], y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-7xl mb-6"
                      >
                        ❤️
                      </motion.div>
                      <h3 className="text-4xl font-cursive text-pink-50 mb-4 px-4 leading-snug drop-shadow-lg">
                        {praises[currentIndex % praises.length]}
                      </h3>
                      <div className="w-16 h-[2px] bg-pink-500/50" />
                    </>
                  ) : (
                    <>
                      <motion.div 
                        animate={{ 
                          opacity: [0.4, 1, 0.4],
                          scale: [1, 1.15, 1]
                        }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="text-7xl mb-6 grayscale"
                      >
                        🖤
                      </motion.div>
                      <h3 className="text-3xl font-cursive text-red-200 mb-4 drop-shadow-md">
                        {currentPenalty.title}
                      </h3>
                      <p className="text-xl font-serif italic text-pink-50 leading-relaxed drop-shadow-sm">
                        {currentPenalty.desc}
                      </p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center px-4"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="text-7xl mb-8"
            >
              😌
            </motion.div>
            <h2 className="text-4xl font-cursive text-pink-50 mb-6 leading-tight drop-shadow-lg">
              I have you right where I want you.
            </h2>
            <p className="text-lg font-serif italic text-pink-100 mb-12 max-w-sm drop-shadow-md">
              Whether you remember every date or not… your heart remembers mine. That's all that matters.
            </p>
            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 3, duration: 1.5 }}
              className="px-12 py-5 bg-gradient-to-r from-[#800020] to-[#be185d] text-white rounded-full font-sans tracking-[0.6em] text-[11px] uppercase shadow-2xl border border-white/20 active:opacity-90"
            >
              Come closer…
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Progress Indicator */}
      {!isFinished && (
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 px-10">
          {questions.map((_, i) => (
            <div 
              key={i}
              className={`h-2 rounded-full transition-all duration-700 ${
                i === currentIndex ? 'bg-pink-400 w-16' : i < currentIndex ? 'bg-pink-600 w-6' : 'bg-white/20 w-4'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
