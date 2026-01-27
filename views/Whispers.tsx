
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
    { bg: 'rgba(128, 0, 32, 0.2)', border: 'rgba(255, 255, 255, 0.05)' },
    { bg: 'rgba(190, 24, 93, 0.2)', border: 'rgba(255, 255, 255, 0.05)' },
    { bg: 'rgba(244, 114, 182, 0.2)', border: 'rgba(255, 255, 255, 0.05)' },
    { bg: 'rgba(219, 39, 119, 0.2)', border: 'rgba(255, 255, 255, 0.05)' },
    { bg: 'rgba(157, 23, 77, 0.2)', border: 'rgba(255, 255, 255, 0.05)' },
    { bg: 'rgba(112, 26, 117, 0.2)', border: 'rgba(255, 255, 255, 0.05)' },
    { bg: 'rgba(76, 5, 25, 0.2)', border: 'rgba(255, 255, 255, 0.05)' },
    { bg: 'rgba(225, 29, 72, 0.2)', border: 'rgba(255, 255, 255, 0.05)' },
  ][index % 8], [index]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} className="relative">
      <motion.div
        onClick={onOpen}
        whileTap={{ scale: 0.95 }}
        className={`w-full aspect-square cursor-pointer flex items-center justify-center text-center rounded-[28px] transition-all duration-700 backdrop-blur-xl border ${isOpened ? 'shadow-[0_0_30px_rgba(251,207,232,0.1)]' : 'shadow-none'}`}
        style={{ backgroundColor: isOpened ? '#fff1f2' : tileStyles.bg, borderColor: isOpened ? '#fbcfe8' : tileStyles.border }}
      >
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(5px)' }} className="flex flex-col items-center justify-center p-4">
              <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 3 }} className="w-8 h-8 text-pink-200/50 mb-2">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              </motion.div>
              <span className="text-white/30 font-sans tracking-[0.2em] text-[9px] uppercase font-bold">Whisper {index + 1}</span>
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} className="p-4 w-full h-full flex items-center justify-center bg-white/95 rounded-[28px]">
              <p className="font-cursive text-sm sm:text-lg font-bold leading-tight text-[#800020]">{thought}</p>
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
    "I'm so proud of the person you are.",
    "Every small 'I love you' from you feels like the first time."
  ];

  const handleOpen = (index: number) => setOpenedIndices(prev => new Set([...prev, index]));
  const allOpened = openedIndices.size === secretsFromHeart.length;

  return (
    <div className="flex flex-col items-center justify-start h-full w-full bg-[#0d0002] text-[#fff1e6] py-14 px-6 overflow-y-auto">
      <div className="w-full max-w-lg flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h2 className="text-5xl font-cursive mb-4 text-pink-100 drop-shadow-xl">My 8 Whispers</h2>
          <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-pink-200/30 max-w-xs mx-auto leading-relaxed">Open each one to hear what my heart says when the world is quiet.</p>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-4 w-full mb-20">
          {secretsFromHeart.map((thought, i) => (
            <SecretNote key={i} thought={thought} index={i} isOpened={openedIndices.has(i)} onOpen={() => handleOpen(i)} />
          ))}
        </div>

        <div className="min-h-[140px] flex items-center justify-center w-full pb-10">
          <AnimatePresence>
            {allOpened && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <p className="text-xl font-cursive italic text-pink-100/80 mb-8 px-4">“Now you’ve heard them all… my heart is fully yours.”</p>
                <motion.button 
                  onClick={onNext} 
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-gradient-to-r from-[#800020] to-[#be185d] text-white rounded-full font-sans tracking-[0.3em] text-[9px] uppercase shadow-2xl"
                >
                  Continue 😌❤️
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Whispers;
