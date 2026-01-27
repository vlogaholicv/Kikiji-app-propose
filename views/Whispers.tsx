
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onNext: () => void;
}

const SecretNote: React.FC<{ 
  thought: string; 
  index: number; 
  isOpened: boolean;
  onOpen: () => void;
}> = ({ thought, index, isOpened, onOpen }) => {
  const tileStyles = useMemo(() => [
    { bg: 'rgba(128, 0, 32, 0.2)', border: 'rgba(255, 255, 255, 0.1)' },
    { bg: 'rgba(190, 24, 93, 0.2)', border: 'rgba(255, 255, 255, 0.1)' },
    { bg: 'rgba(244, 114, 182, 0.2)', border: 'rgba(255, 255, 255, 0.1)' },
    { bg: 'rgba(219, 39, 119, 0.2)', border: 'rgba(255, 255, 255, 0.1)' },
    { bg: 'rgba(157, 23, 77, 0.2)', border: 'rgba(255, 255, 255, 0.1)' },
    { bg: 'rgba(112, 26, 117, 0.2)', border: 'rgba(255, 255, 255, 0.1)' },
    { bg: 'rgba(76, 5, 25, 0.2)', border: 'rgba(255, 255, 255, 0.1)' },
    { bg: 'rgba(225, 29, 72, 0.2)', border: 'rgba(255, 255, 255, 0.1)' },
  ][index % 8], [index]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} className="relative">
      <motion.div
        onClick={onOpen}
        whileHover={!isOpened ? { scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' } : {}}
        whileTap={{ scale: 0.95 }}
        className={`w-28 h-28 sm:w-32 sm:h-32 md:w-44 md:h-44 cursor-pointer flex items-center justify-center text-center rounded-[32px] transition-all duration-700 backdrop-blur-xl border-2 ${isOpened ? 'shadow-[0_0_30px_rgba(251,207,232,0.2)]' : 'shadow-none'}`}
        style={{ backgroundColor: isOpened ? '#fff1f2' : tileStyles.bg, borderColor: isOpened ? '#fbcfe8' : tileStyles.border }}
      >
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)' }} className="flex flex-col items-center justify-center p-4 transition-all">
              <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 3 }} className="w-10 h-10 text-pink-200/50 mb-3">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              </motion.div>
              <span className="text-white/20 font-sans tracking-[0.3em] text-[8px] md:text-[10px] uppercase font-bold">Whisper {index + 1}</span>
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, scale: 0.85, filter: 'blur(15px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} className="p-5 md:p-8 w-full h-full flex items-center justify-center bg-white/95">
              <p className="font-cursive text-sm md:text-xl lg:text-2xl font-bold leading-tight text-[#800020] drop-shadow-sm">{thought}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const Whispers: React.FC<Props> = ({ onNext }) => {
  const [openedIndices, setOpenedIndices] = useState<Set<number>>(new Set());
  const secretsFromHeart = [
    "I love you more than words can express, Kiki.",
    "You are my favorite thought, every single day.",
    "I want to wake up next to you for the rest of my life.",
    "You are my home, my peace, and my beautiful madness.",
    "I promise to love you across every single lifetime.",
    "Your smile is the only sun I ever need.",
    "I'm so proud of the person you are, and the person we're becoming.",
    "Every small 'I love you' from you feels like the first time."
  ];

  const handleOpen = (index: number) => setOpenedIndices(prev => new Set([...prev, index]));
  const allOpened = openedIndices.size === secretsFromHeart.length;

  return (
    <div className="flex flex-col items-center justify-start h-full w-full bg-[#0d0002] text-[#fff1e6] py-20 px-6 overflow-y-auto">
      <div className="w-full max-w-6xl flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-cursive mb-6 text-pink-100 drop-shadow-2xl">My 8 Whispers</h2>
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.6em] text-pink-200/30 mb-8 max-w-md mx-auto leading-relaxed">Open each one to hear what my heart says when the world is quiet.</p>
          <div className="h-10">
            <AnimatePresence mode="wait">
              {openedIndices.size === 7 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-pink-300 font-cursive text-2xl">Bas ek aur… 😌❤️</motion.p>}
            </AnimatePresence>
          </div>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-10 mb-24">
          {secretsFromHeart.map((thought, i) => <SecretNote key={i} thought={thought} index={i} isOpened={openedIndices.has(i)} onOpen={() => handleOpen(i)} />)}
        </div>
        <div className="min-h-[200px] flex items-center justify-center w-full pb-20">
          <AnimatePresence>
            {allOpened && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <motion.p className="text-2xl md:text-3xl font-cursive italic text-pink-100/90 leading-relaxed mb-12">“Now you’ve heard them all… my heart is fully yours.”</motion.p>
                <motion.button onClick={onNext} whileHover={{ scale: 1.05 }} className="px-16 py-6 bg-gradient-to-r from-[#800020] to-[#be185d] text-white rounded-full font-sans tracking-[0.4em] text-[10px] uppercase shadow-2xl border border-white/20">You’re paying attention… good 😌</motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Whispers;
