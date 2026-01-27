
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onNext: () => void;
  onSetChoice: (choice: string) => void;
  choice: string | null;
}

const Journey: React.FC<Props> = ({ onNext }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [viewedSteps, setViewedSteps] = useState<Set<number>>(new Set([0]));

  const sections = [
    {
      title: "What I love the most about you…",
      text: "It's hard to pick just one thing, but if I had to tell you, it would be the way you exist in my world. You're not just a person; you're the feeling of coming home.",
      icon: "❤️",
      btnLabel: "Your smile"
    },
    {
      title: "Your Smile…",
      text: "It’s my favorite view in the whole world. The way it reaches your eyes and makes everything else fade away. I would do anything just to be the reason behind it.",
      icon: "✨",
      btnLabel: "The way you care"
    },
    {
      title: "The way you care…",
      text: "Your kindness isn't just a trait; it’s a warmth that surrounds everyone you love. The way you hold my heart so gently, as if it's the most precious thing you own.",
      icon: "🛡️",
      btnLabel: "Our Madness"
    },
    {
      title: "Our Madness…",
      text: "I love our chaotic energy. The jokes only we understand, the laughter until we can't breathe, and the perfectly insane way we just 'fit' together.",
      icon: "😈",
      btnLabel: "Silent Comfort"
    },
    {
      title: "Our Silent Comfort…",
      text: "Even when we aren't saying anything, the silence between us feels full. It's a peace I never knew was possible before I met you.",
      icon: "🌙",
      btnLabel: "Our Growth"
    },
    {
      title: "Our Growing Love…",
      text: "I love that we aren't just stagnant. We learn, we fight, we grow, and we come out stronger every single time. We are building a foundation that nothing can shake.",
      icon: "🌱",
      btnLabel: "Next Step"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setViewedSteps(prev => new Set([...prev, currentStep]));
    }, 1800);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const allViewed = viewedSteps.size === sections.length;

  const handleStepNext = () => {
    if (currentStep < sections.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleStepPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#0d0002] px-6 text-center relative overflow-hidden">
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-tr from-[#800020] via-black to-[#4c0519] pointer-events-none"
      />
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.95, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center w-full"
          >
            <div className="text-6xl md:text-8xl mb-10">{sections[currentStep].icon}</div>
            <h2 className="text-5xl md:text-7xl font-cursive text-pink-100 mb-10 leading-tight">{sections[currentStep].title}</h2>
            <p className="text-xl md:text-3xl font-serif italic text-pink-200/80 leading-relaxed mb-16 px-6">“{sections[currentStep].text}”</p>
            <div className="flex items-center justify-center gap-12 w-full">
              {currentStep > 0 && (
                <button onClick={handleStepPrev} className="text-white/20 hover:text-white font-sans text-[10px] md:text-xs uppercase tracking-[0.5em] transition-all py-4">← Previous</button>
              )}
              {currentStep < sections.length - 1 && (
                <button onClick={handleStepNext} className="px-10 py-5 bg-white/5 border border-white/10 rounded-full text-pink-100/40 hover:text-pink-100 hover:bg-white/10 font-sans text-[10px] md:text-xs uppercase tracking-[0.5em] transition-all group">
                  Next → <span className="ml-4 text-pink-300 opacity-60 group-hover:opacity-100">“{sections[currentStep].btnLabel}”</span>
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-24 h-24 flex items-center justify-center">
          <AnimatePresence>
            {allViewed && currentStep === sections.length - 1 && (
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                onClick={onNext}
                className="px-16 py-6 bg-[#f6c1cc] text-[#800020] rounded-full font-sans font-black tracking-[0.4em] text-[10px] uppercase shadow-2xl"
              >
                Continue the Journey...
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Journey;
