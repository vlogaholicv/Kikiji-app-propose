
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';

interface Props {
  onReset: () => void;
}

const Sparkle: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const size = useMemo(() => Math.random() * 4 + 2, []);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: y - 50 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="absolute rounded-full bg-pink-200/40 pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, filter: 'blur(1px)' }}
    />
  );
};

const ConfettiPiece: React.FC<{ color: string; delay: number }> = ({ color, delay }) => {
  const xPos = useMemo(() => Math.random() * 100, []);
  const duration = useMemo(() => 4 + Math.random() * 3, []);
  const size = useMemo(() => 8 + Math.random() * 12, []);
  const rotation = useMemo(() => Math.random() * 360, []);

  return (
    <motion.div
      initial={{ top: '-10%', left: `${xPos}%`, opacity: 0, rotate: rotation, scale: 0 }}
      animate={{ 
        top: '110%', 
        left: `${xPos + (Math.random() * 20 - 10)}%`,
        opacity: [0, 1, 1, 0],
        rotate: rotation + 720,
        scale: 1
      }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: "linear",
        repeat: Infinity 
      }}
      className="absolute pointer-events-none z-50"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" fill={color} className="w-full h-full opacity-70">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </motion.div>
  );
};

const Final: React.FC<Props> = ({ onReset }) => {
  const [step, setStep] = useState(0);
  const [showOutburst, setShowOutburst] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const script = useMemo(() => [
    "This is not the end…",
    "I’m not leaving.",
    "Not today. Not tomorrow.",
    "Not until we take our 7 janams vows at our marriage.",
    "Laughing. Blushing.",
    "And yes… Breaking a couple of beds with our madness 😌❤️",
    "Soft love. Wild love. Forever love."
  ], []);

  const colors = ["#fbcfe8", "#fce7f3", "#fb7185", "#f472b6", "#ffd700", "#ff007f"];

  const startScriptSequence = useCallback(async () => {
    for (let i = 0; i < script.length; i++) {
      setStep(i);
      if (i === 5) setShowConfetti(true);
      
      const line = script[i];
      const wordCount = line.split(' ').length;
      const calculatedDelay = Math.max(4000, Math.min(7500, (wordCount * 450) + 1500));
      
      // Before the very last line, add a 2 second silence for deep intimacy
      if (i === script.length - 1) {
        window.dispatchEvent(new CustomEvent('app-audio-silence', { detail: { duration: 2000 } }));
        await new Promise(r => setTimeout(r, 2000));
      }

      await new Promise(r => setTimeout(r, calculatedDelay));
    }
    setShowOutburst(true);
  }, [script]);

  useEffect(() => {
    startScriptSequence();
  }, [startScriptSequence]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    
    if (Math.random() > 0.7) {
      const id = Date.now();
      setSparkles(prev => [...prev.slice(-30), { id, x: e.clientX, y: e.clientY }]);
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center justify-center h-full w-full bg-[#0d0002] overflow-hidden cursor-none"
    >
      <motion.div 
        animate={{ 
          background: [
            "radial-gradient(circle at 50% 50%, #2e000a 0%, #0d0002 100%)",
            "radial-gradient(circle at 50% 50%, #4c0519 0%, #0d0002 100%)",
            "radial-gradient(circle at 50% 50%, #2e000a 0%, #0d0002 100%)"
          ] 
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
      />

      <motion.div
        style={{ left: mouseX, top: mouseY, translateX: '-50%', translateY: '-50%' }}
        className="absolute w-80 h-80 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none z-10"
      />

      {sparkles.map(s => <Sparkle key={s.id} x={s.x} y={s.y} />)}

      <AnimatePresence mode="wait">
        {!showOutburst ? (
          <motion.div
            key="script"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(30px)' }}
            transition={{ duration: 1 }}
            className="relative z-20 px-6 text-center max-w-4xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <p className={`text-[#fff1e6] font-cursive drop-shadow-2xl leading-relaxed ${
                  step === 5 ? 'text-5xl md:text-7xl text-pink-300 font-bold' : 'text-3xl md:text-5xl'
                }`}>
                  {script[step]}
                </p>
                {step === 5 && (
                  <motion.div 
                    animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="mt-8 text-5xl"
                  >
                    ❤️🔥
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="outburst"
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            className="relative z-50 text-center px-6 max-w-5xl"
          >
            <motion.div
               animate={{ 
                 scale: [1, 1.05, 1],
                 textShadow: [
                   "0 0 20px rgba(255,192,203,0.4)", 
                   "0 0 80px rgba(255,192,203,0.9)", 
                   "0 0 20px rgba(255,192,203,0.4)"
                 ] 
               }}
               transition={{ duration: 2, repeat: Infinity }}
               className="text-[#f6c1cc] font-cursive text-5xl md:text-8xl leading-[1.2]"
            >
              I Alwayssss loveeeee youuuuuu kikijii❤️❤️❤️😈😈😈🫶🏻🫶🏻🫶🏻
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-16"
            >
              <motion.button
                onClick={onReset}
                whileHover={{ scale: 1.1, color: '#ffffff' }}
                className="text-pink-200/30 font-sans text-[10px] tracking-[0.6em] uppercase transition-all"
              >
                ← Relive our journey
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-40">
            {Array.from({ length: 80 }).map((_, i) => (
              <ConfettiPiece key={i} color={colors[i % colors.length]} delay={Math.random() * 8} />
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        className="absolute bottom-8 text-white/40 font-sans text-[8px] tracking-[0.8em] uppercase pointer-events-none"
      >
        For Kiki, from my soul to yours.
      </motion.div>
    </div>
  );
};

export default Final;
