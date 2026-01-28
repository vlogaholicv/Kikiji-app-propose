
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onNext: () => void;
  loveChoice: string | null;
}

const Kiki: React.FC<Props> = ({ onNext, loveChoice }) => {
  const choiceLabel = loveChoice ? {
    laughter: 'laughter and light',
    support: 'strength and support',
    madness: 'wild, beautiful madness',
    future: 'dreams for our future',
    peace: 'silent, peaceful comfort'
  }[loveChoice] : 'every single bit of us';

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-[#0d0002] to-[#800020] px-6 text-center overflow-y-auto py-12">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="text-6xl md:text-8xl font-cursive text-[#f6c1cc] mb-8"
      >
        Kiki ji…
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="max-w-2xl bg-[#fff1e6]/10 backdrop-blur-xl p-10 md:p-16 rounded-[40px] border border-white/5 relative overflow-hidden group mb-8"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all" />
        
        <div className="space-y-6 text-[#fff1e6] font-serif text-lg md:text-2xl italic leading-relaxed">
          <p>You didn’t just enter my life. You changed it.</p>
          <p>You made me softer. You made me better.</p>
          <p>Priyanshi… My Kiki ji. My Soni ji. My Kiko.</p>
          <p>I love our {choiceLabel}.</p>
          <div className="mt-8 pt-8 border-t border-white/10 opacity-60">
            <p className="text-sm uppercase font-sans tracking-[0.3em] not-italic">Our journey is just beginning.</p>
          </div>
        </div>
      </motion.div>

      <motion.button
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 4, duration: 1.5 }} // Longer delay (3s + reading buffer)
        className="px-12 py-5 bg-[#f6c1cc] text-[#800020] rounded-full font-sans font-bold tracking-[0.2em] text-sm uppercase shadow-2xl shadow-pink-500/20"
      >
        💍 Forever starts here
      </motion.button>
    </div>
  );
};

export default Kiki;
