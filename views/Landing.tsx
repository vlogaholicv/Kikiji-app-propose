
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onNext: () => void;
}

enum ProposeStep {
  BUILDUP,
  QUESTION,
  REACTION,
  CONFIRMATION
}

const Landing: React.FC<Props> = ({ onNext }) => {
  const [step, setStep] = useState<ProposeStep>(ProposeStep.BUILDUP);
  const [noButtonText, setNoButtonText] = useState('NO 🙃');
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);

  const handleNoHover = () => {
    // Playful dodging NO button
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 200;
    setNoPosition({ x: randomX, y: randomY });
    
    const texts = ["Soch lo 😌", "Aichee talodiii ab 🥺❤️", "Beta bht maarunga jaldi yes kar🙂👋", "Nahi maanogi? 😚"];
    setNoButtonText(texts[Math.min(noCount, texts.length - 1)]);
    setNoCount(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#0d0002] px-8 text-center relative overflow-hidden py-20 selection:bg-pink-500/20">
      {/* Intimate Deep Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-b from-[#1a0005] to-black"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-pink-900/10 rounded-full blur-[180px]" />
      </div>

      <AnimatePresence mode="wait">
        {step === ProposeStep.BUILDUP && (
          <motion.div 
            key="buildup" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, filter: 'blur(10px)' }} 
            transition={{ duration: 1.8 }}
            className="max-w-2xl space-y-20 z-10"
          >
            <div className="space-y-12">
              <p className="font-serif italic text-2xl md:text-3xl text-pink-100/90 leading-relaxed">
                “I didn’t rush this.”
              </p>
              <p className="font-serif italic text-2xl md:text-3xl text-pink-100/90 leading-relaxed">
                “I didn’t plan it for a moment.”
              </p>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 2.5 }}
              className="font-cursive text-4xl md:text-6xl text-[#f6c1cc] leading-tight"
            >
              “I waited for the right time.<br/>And this is it.”
            </motion.p>
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 7, duration: 1 }}
              onClick={() => setStep(ProposeStep.QUESTION)} 
              className="px-14 py-5 bg-white/5 border border-white/10 rounded-full text-pink-100/40 font-sans tracking-[0.5em] text-[10px] uppercase hover:bg-white/10 transition-colors shadow-2xl"
            >
              Continue 💗
            </motion.button>
          </motion.div>
        )}

        {step === ProposeStep.QUESTION && (
          <motion.div 
            key="question" 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl space-y-24 z-10"
          >
            <div className="space-y-6">
              <span className="text-[10px] font-sans tracking-[0.7em] text-pink-300/30 uppercase block mb-8">Honest. Real. Confident.</span>
              <h2 className="text-5xl md:text-7xl font-cursive text-[#f6c1cc] leading-snug drop-shadow-[0_0_30px_rgba(246,193,204,0.4)]">
                Will you choose me…<br/>not just today,<br/>but every day?
              </h2>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-14 pt-10 h-40">
              <motion.button 
                whileHover={{ scale: 1.1, boxShadow: '0 0 50px rgba(246, 193, 204, 0.4)' }} 
                whileTap={{ scale: 0.95 }} 
                onClick={() => setStep(ProposeStep.REACTION)} 
                className="px-18 py-7 bg-gradient-to-r from-[#f6c1cc] to-[#ffced8] text-[#800020] rounded-full font-sans font-black tracking-[0.6em] text-xs uppercase shadow-2xl z-20"
              >
                YES ❤️
              </motion.button>
              
              <motion.button 
                onMouseEnter={handleNoHover} 
                onClick={handleNoHover}
                animate={{ x: noPosition.x, y: noPosition.y }} 
                className="px-10 py-4 border border-white/5 rounded-full font-sans text-[10px] tracking-[0.4em] uppercase text-white/20 z-10 transition-all hover:border-white/20"
              >
                {noButtonText}
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === ProposeStep.REACTION && (
          <motion.div 
            key="reaction" 
            initial={{ opacity: 0, scale: 1.02 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0 }}
            className="max-w-xl space-y-16 z-10"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.5 }}
              className="space-y-10"
            >
              <h3 className="text-6xl font-cursive text-pink-50">Kikiji... ❤️</h3>
              <p className="font-serif italic text-2xl text-pink-100/70 leading-relaxed">
                Thank you for your trust.<br/>For choosing my heart as your home.
              </p>
            </motion.div>
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
              onClick={() => setStep(ProposeStep.CONFIRMATION)} 
              className="px-14 py-5 bg-white/5 border border-white/10 text-pink-100/30 rounded-full font-sans tracking-[0.4em] text-[10px] uppercase"
            >
              Seal the promise
            </motion.button>
          </motion.div>
        )}

        {step === ProposeStep.CONFIRMATION && (
          <motion.div 
            key="confirmation" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="max-w-xl space-y-28 z-10"
          >
            <div className="space-y-12">
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
                className="text-3xl md:text-4xl font-serif italic text-pink-50/90"
              >
                “You chose me.<br/>And I choose you.”
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, duration: 2.5 }}
                className="text-5xl md:text-7xl font-cursive text-[#f6c1cc] drop-shadow-[0_0_40px_rgba(246,193,204,0.5)]"
              >
                “From today,<br/>it’s not just feelings.<br/>It’s us.”
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 8, duration: 2 }}
              className="pt-10 flex flex-col items-center gap-8"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext} 
                className="px-16 py-7 bg-gradient-to-r from-[#800020] to-[#be185d] text-white rounded-full font-sans font-black tracking-[0.6em] text-[10px] uppercase shadow-[0_0_50px_rgba(128,0,32,0.3)] border border-white/10"
              >
                Come back tomorrow 💗
              </motion.button>
              <span className="text-[10px] uppercase tracking-[0.8em] text-white/10 font-sans">End of Day 2</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
