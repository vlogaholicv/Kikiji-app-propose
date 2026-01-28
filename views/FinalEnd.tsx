
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FinalEnd: React.FC = () => {
  const [step, setStep] = useState(0);

  const messages = [
    {
      lines: ["Thank you…", "for being in my life."],
      duration: 6500 // Short: ~6s
    },
    {
      lines: ["Everything you saw here…", "Every word, every feeling…", "It all came from my heart."],
      duration: 9000 // Medium: ~9s
    },
    {
      lines: [
        "Ladne ke liye…",
        "pyaar karne ke liye…",
        "support karne ke liye…",
        "tumhe hamesha khush rakhne ke liye…",
        "Main hamesha hoon."
      ],
      duration: 15000 // Long: ~15s
    },
    {
      lines: [
        "But abhi…",
        "Apna focus mujhse hata ke…",
        "Padhai par rakho.",
        "Dil laga ke padhai karo.",
        "Apne future ke liye.",
        "Apne sapno ke liye."
      ],
      duration: 16000 // Long: ~16s
    },
    {
      lines: [
        "17 February se…",
        "Board exams shuru ho rahe hain.",
        "I know you’re trying your best.",
        "I trust you.",
        "May you score",
        "the best marks of your entire life."
      ],
      duration: 16000 // Long: ~16s
    },
    {
      lines: [
        "Main kahin nahi jaa raha.",
        "Bas thoda peeche khada hoon.",
        "Tum padhai karo…",
        "Main yahin hoon."
      ],
      duration: 10000 // Medium: ~10s
    },
    {
      lines: [
        "You are the most beautiful girl",
        "I have ever seen.",
        "You are my most precious diamond.",
        "You are my Kohinoor."
      ],
      duration: 10000 // Medium: ~10s
    },
    {
      lines: ["I trust you.", "I believe in you.", "I love you."],
      duration: 8000 // Short-Med: ~8s
    },
    {
      lines: ["Ab jao…", "Apna best do.", "Baaki sab…", "hum dekh lenge."],
      duration: 10000 // Medium: ~10s
    }
  ];

  useEffect(() => {
    if (step < messages.length) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, messages[step].duration);
      return () => clearTimeout(timer);
    }
  }, [step, messages]);

  return (
    <div className="relative w-full h-full bg-[#0d0002] overflow-hidden flex flex-col items-center justify-center p-8 text-center selection:bg-pink-500/20">
      {/* Soft Wine-to-Black Gradient with Warm Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-b from-[#1a0005] via-black to-[#000000]" 
        />
        <motion.div 
          animate={{ opacity: [0.03, 0.08, 0.03], scale: [1.2, 1.1, 1.2] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#800020] rounded-full blur-[150px]" 
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center min-h-[60vh]">
        <AnimatePresence mode="wait">
          {step < messages.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 2.0, ease: "easeInOut" }} // Slower transitions
              className="space-y-10"
            >
              {messages[step].lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 1.2 + 1, duration: 2.0 }} // Slower line reveal
                  className={`${
                    i === 0 && line.length < 20 ? 'text-4xl md:text-5xl font-cursive text-pink-50' : 'text-2xl md:text-3xl font-serif italic text-pink-100/80'
                  } leading-relaxed`}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 5 }}
              className="flex flex-col items-center space-y-2"
            >
               <p className="text-sm font-sans tracking-[1em] text-white/5 uppercase mb-12">Peaceful silence</p>
               <motion.p 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 0.4, scale: 1 }}
                 transition={{ delay: 3, duration: 4 }}
                 className="text-xs font-sans tracking-[0.8em] uppercase text-white/40"
               >
                 Always yours. ❤️
               </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Extremely faint persistent final line if we are not at the very end yet */}
      {step < messages.length && (
        <div className="absolute bottom-12 left-0 right-0 pointer-events-none opacity-[0.05]">
          <p className="text-[10px] font-sans tracking-[1em] uppercase text-white/20">Always yours. ❤️</p>
        </div>
      )}
    </div>
  );
};

export default FinalEnd;
