
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
      options: ["14 March", "22 October 2024", "1 November 2024", "29 October 2024"],
      answer: 1
    },
    {
      q: "Our first video call happened on...",
      options: ["23 October", "29 October 2024", "1 November", "Diwali Night"],
      answer: 1
    },
    {
      q: "The day that changed everything for us?",
      options: ["1 November 2024", "10 November", "Diwali", "22 October"],
      answer: 0
    },
    {
      q: "When did we first feel our souls connecting deeply?",
      options: ["20 October", "23 October 2024", "1 November", "10 November"],
      answer: 1
    },
    {
      q: "Kikiji's first big surprise for me happened on...",
      options: ["Diwali", "1st Nov", "10 November 2024", "Today"],
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

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setShowFeedback(null);
      } else {
        setIsFinished(true);
      }
    }, 3000);
  };

  const currentPenalty = penalties[Math.min(wrongCount - 1, penalties.length - 1)];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#0d0002] px-6 text-center relative overflow-hidden">
      {/* Background Pulse Effect */}
      <motion.div 
        animate={{ 
          scale: showFeedback === 'wrong' ? [1, 1.1, 1] : 1,
          opacity: showFeedback === 'wrong' ? [0.1, 0.3, 0.1] : 0.1
        }}
        className="absolute inset-0 bg-red-900 pointer-events-none"
      />

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center">
        {!isFinished ? (
          <AnimatePresence mode="wait">
            {!showFeedback ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full"
              >
                <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-pink-200/30 mb-8">
                  Question {currentIndex + 1} / {questions.length}
                </p>
                
                <h2 className="text-3xl md:text-5xl font-cursive text-pink-100 mb-4 leading-tight">
                  “How well do you remember us?”
                </h2>
                <p className="text-sm md:text-base text-pink-300/50 italic mb-12 font-serif">
                  {questions[currentIndex].q}
                </p>

                <div className="grid grid-cols-1 gap-4 w-full">
                  {questions[currentIndex].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(i)}
                      className="w-full py-5 px-8 rounded-2xl border border-white/10 bg-white/5 text-pink-100/70 font-sans text-xs md:text-sm tracking-widest uppercase transition-all"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
                
                <p className="mt-12 text-[9px] uppercase tracking-[0.4em] text-white/10">
                  Careful… every wrong answer has consequences 😏
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                {showFeedback === 'correct' ? (
                  <>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      className="text-6xl mb-8"
                    >
                      ❤️
                    </motion.div>
                    <h3 className="text-3xl md:text-5xl font-cursive text-pink-100 mb-6">
                      {praises[Math.floor(Math.random() * praises.length)]}
                    </h3>
                  </>
                ) : (
                  <>
                    <motion.div 
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-6xl mb-8 grayscale brightness-50"
                    >
                      🖤
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-cursive text-red-300 mb-4">
                      {currentPenalty.title}
                    </h3>
                    <p className="text-xl md:text-2xl font-serif italic text-white/70 leading-relaxed px-6">
                      “{currentPenalty.desc}”
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="text-7xl mb-10"
            >
              😌
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-cursive text-pink-100 mb-10">
              I have you right where I want you.
            </h2>
            <p className="text-lg md:text-2xl font-serif italic text-pink-200/60 mb-16 max-w-lg">
              “Whether you remember every date or not… your heart remembers mine. That's all that matters.”
            </p>
            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(251, 207, 232, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-16 py-6 bg-gradient-to-r from-[#800020] to-[#be185d] text-white rounded-full font-sans tracking-[0.6em] text-[10px] md:text-xs uppercase shadow-2xl border border-white/20"
            >
              Come closer…
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Progress Indicator */}
      {!isFinished && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
          {questions.map((_, i) => (
            <div 
              key={i}
              className={`h-1 rounded-full transition-all duration-700 ${
                i === currentIndex ? 'bg-pink-400 w-10' : i < currentIndex ? 'bg-pink-900 w-4' : 'bg-white/10 w-2'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
