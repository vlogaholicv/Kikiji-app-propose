
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onNext: () => void;
}

const Landing: React.FC<Props> = ({ onNext }) => {
  const [noButtonText, setNoButtonText] = useState('No');
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isNoActuallyYes, setIsNoActuallyYes] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const handleNoClick = () => {
    if (isNoActuallyYes) {
      onNext();
      return;
    }

    // Playful warning
    setNoButtonText('BHT PITEGI 👋');
    
    // After a delay, turn it into a YES button
    setTimeout(() => {
      setIsNoActuallyYes(true);
      setNoButtonText('YES');
      setNoPosition({ x: 0, y: 0 }); // Snap back to center
    }, 1500);
  };

  const handleNoHover = () => {
    // Only dodge if it's still a "No" button
    if (!isNoActuallyYes) {
      const randomX = (Math.random() - 0.5) * 200;
      const randomY = (Math.random() - 0.5) * 200;
      setNoPosition({ x: randomX, y: randomY });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-[#800020] to-[#0d0002] px-6 text-center">
      {/* Soft Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-6xl md:text-8xl font-cursive text-[#fff1e6] mb-4"
      >
        Will you be my forever?
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="text-lg md:text-xl text-pink-200/80 font-serif tracking-widest uppercase mb-12"
      >
        From one moment… to every lifetime.
      </motion.p>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <motion.button
          onClick={onNext}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="px-10 py-4 bg-[#f6c1cc] text-[#800020] rounded-full font-sans font-semibold text-lg shadow-xl shadow-pink-500/20 animate-pulse z-20"
        >
          YES
        </motion.button>

        <motion.button
          ref={noBtnRef}
          onMouseEnter={handleNoHover}
          onClick={handleNoClick}
          animate={{ 
            x: noPosition.x, 
            y: noPosition.y,
            backgroundColor: isNoActuallyYes ? 'rgba(246, 193, 204, 1)' : 'rgba(255, 255, 255, 0)',
            color: isNoActuallyYes ? '#800020' : '#fbcfe8',
            borderColor: isNoActuallyYes ? 'transparent' : 'rgba(251, 207, 232, 0.3)'
          }}
          whileTap={{ scale: 0.9 }}
          className={`px-8 py-3 border rounded-full font-sans text-sm tracking-widest transition-colors z-20 min-w-[120px] ${
            isNoActuallyYes ? 'font-bold shadow-lg shadow-pink-500/10' : ''
          }`}
        >
          {noButtonText}
        </motion.button>
      </div>
    </div>
  );
};

export default Landing;
