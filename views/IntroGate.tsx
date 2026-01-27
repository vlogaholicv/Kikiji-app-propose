
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onTransitionStart: () => void;
  onComplete: () => void;
}

const IntroGate: React.FC<Props> = ({ onTransitionStart, onComplete }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = () => {
    setIsTransitioning(true);
    // Music starts shortly after freeze
    setTimeout(() => {
      onTransitionStart();
    }, 500);

    // Complete transition after tunnel animation
    setTimeout(() => {
      onComplete();
    }, 4500);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white flex items-center justify-center font-sans">
      <AnimatePresence>
        {!isTransitioning && (
          <motion.div
            key="initial-ui"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="text-center z-10"
          >
            <h1 className="text-2xl md:text-3xl font-medium text-gray-800 mb-2">
              SURPRISE ke liye aaye ho?
            </h1>
            <p className="text-gray-400 text-sm md:text-base mb-8">
              Toh bas ek kaam karo…
            </p>
            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-3 bg-[#f0f0f0] text-gray-700 rounded-lg text-sm tracking-widest uppercase transition-all border border-gray-200"
            >
              CLICK THIS BUTTON
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Tunnel Effect */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="tunnel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 overflow-hidden"
          >
            {/* Tunnel Background Layers */}
            <motion.div 
              initial={{ backgroundColor: '#ffffff' }}
              animate={{ backgroundColor: '#0d0002' }}
              transition={{ delay: 0.5, duration: 2 }}
              className="absolute inset-0"
            />
            
            {/* Wormhole Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0, border: '2px solid rgba(128, 0, 32, 0)' }}
                  animate={{ 
                    scale: [0, 4], 
                    opacity: [0, 0.5, 0],
                    borderColor: ['rgba(128, 0, 32, 0)', 'rgba(128, 0, 32, 0.4)', 'rgba(0,0,0,0)']
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: 3, 
                    delay: i * 0.25,
                    ease: "easeIn" 
                  }}
                  className="absolute w-[100vw] h-[100vw] rounded-full border-[10px]"
                />
              ))}
              
              {/* Deep Wine Light at the end of the tunnel */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2], opacity: [0, 1] }}
                transition={{ delay: 2, duration: 2.5, ease: "easeOut" }}
                className="w-[80vw] h-[80vw] bg-gradient-to-r from-[#800020] to-[#4c0519] rounded-full blur-[150px] opacity-30"
              />
            </div>

            {/* Final Flash/Fade to Black to transition to Landing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1] }}
              transition={{ delay: 4, duration: 0.5 }}
              className="absolute inset-0 bg-[#0d0002]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroGate;
