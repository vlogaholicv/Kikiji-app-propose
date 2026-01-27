
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onNext: () => void;
}

enum InterludeStep {
  TOUCH,
  CHOICE,
  SYNC,
  EXIT
}

const Interlude: React.FC<Props> = ({ onNext }) => {
  const [step, setStep] = useState<InterludeStep>(InterludeStep.TOUCH);
  const [touched, setTouched] = useState(false);
  const [choiceMade, setChoiceMade] = useState(false);
  const [syncPhase, setSyncPhase] = useState(0);
  const [exitChoice, setExitChoice] = useState<string | null>(null);

  // Sync Phase Timers
  useEffect(() => {
    if (step === InterludeStep.SYNC) {
      const timers = [
        setTimeout(() => setSyncPhase(1), 4000),   // "Bring phone closer"
        setTimeout(() => setSyncPhase(2), 8000),   // "Breathe"
        setTimeout(() => setSyncPhase(3), 13000),  // "That quiet feeling?"
        setTimeout(() => setSyncPhase(4), 18000),  // "That's us..."
        setTimeout(() => setSyncPhase(5), 23000),  // Button fades in
      ];
      return () => timers.forEach(t => clearTimeout(t));
    }
  }, [step]);

  const handleTouch = () => {
    setTouched(true);
    setTimeout(() => setStep(InterludeStep.CHOICE), 3500);
  };

  const handleChoice = () => {
    setChoiceMade(true);
    // Dispatched silence event for 1s pause before "Wrong." appears
    window.dispatchEvent(new CustomEvent('app-audio-silence', { detail: { duration: 1000 } }));
    setTimeout(() => setStep(InterludeStep.SYNC), 5000);
  };

  const handleExit = (choice: string) => {
    setExitChoice(choice);
    if (choice === 'leave') {
      setTimeout(() => setExitChoice('stay'), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#0d0002] px-6 text-center overflow-hidden">
      <AnimatePresence mode="wait">
        {/* PART 1: TOUCH */}
        {step === InterludeStep.TOUCH && (
          <motion.div key="touch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
            <motion.h2 className="text-4xl md:text-5xl font-cursive text-pink-100 mb-12">
              {touched ? "Hmm... Impatient? I like that." : "You’re not supposed to touch anything yet."}
            </motion.h2>
            <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-lg">
              {["A memory", "A thought", "A secret", "A promise"].map((card, i) => (
                <motion.button
                  key={i}
                  onClick={handleTouch}
                  disabled={touched}
                  className="w-32 h-32 md:w-40 md:h-40 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl flex items-center justify-center p-4"
                >
                  <span className="text-[10px] md:text-xs font-sans tracking-widest text-pink-100/30 uppercase">{card}</span>
                </motion.button>
              ))}
            </div>
            {touched && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} className="fixed inset-0 bg-[#800020] pointer-events-none" />}
          </motion.div>
        )}

        {/* PART 2: CHOICE */}
        {step === InterludeStep.CHOICE && (
          <motion.div key="choice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-cursive text-pink-100 mb-12">Choose carefully... I'm watching.</h2>
            <p className="font-serif italic text-pink-200/60 text-xl mb-12">What do you love the most about me?</p>
            {!choiceMade ? (
              <div className="flex flex-col gap-4">
                {["My eyes", "My voice", "The way I hold you", "Everything"].map((opt, i) => (
                  <motion.button
                    key={i}
                    onClick={handleChoice}
                    className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-pink-100/70 font-sans tracking-widest text-[10px] uppercase hover:bg-white/10"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <p className="text-3xl font-cursive text-red-400">Wrong.</p>
                <p className="text-xl md:text-2xl font-serif italic text-pink-100/80">Because the right answer is... Me. Completely.</p>
                <p className="text-lg text-pink-300/40 font-cursive italic">And I don’t share 😌</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* PART 3: SYNC */}
        {step === InterludeStep.SYNC && (
          <motion.div key="sync" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
            {/* Heartbeat pulse glow */}
            <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 0.8, repeat: Infinity }} className="fixed inset-0 bg-[#800020] pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.p key={syncPhase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 1 }} className="text-3xl md:text-5xl font-cursive text-pink-100 italic">
                {syncPhase === 0 && "Don't rush."}
                {syncPhase === 1 && "Bring the phone closer."}
                {syncPhase === 2 && "Breathe."}
                {syncPhase === 3 && "That quiet feeling?"}
                {syncPhase === 4 && "That's us... when we're close."}
                {syncPhase === 5 && "That's us... when we're close."}
              </motion.p>
            </AnimatePresence>
            {syncPhase === 5 && (
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setStep(InterludeStep.EXIT)}
                className="mt-20 px-12 py-5 bg-[#f6c1cc] text-[#800020] rounded-full font-sans tracking-[0.4em] text-[10px] uppercase"
              >
                I felt that.
              </motion.button>
            )}
          </motion.div>
        )}

        {/* PART 4: EXIT */}
        {step === InterludeStep.EXIT && (
          <motion.div key="exit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
            {exitChoice === null ? (
              <>
                <h2 className="text-4xl md:text-6xl font-cursive text-pink-100 mb-16">You can stop here if you want.</h2>
                <div className="flex gap-8 justify-center">
                  <button onClick={() => handleExit('leave')} className="text-white/20 hover:text-white font-sans text-xs tracking-[0.4em] uppercase py-4 transition-all">Leave</button>
                  <button onClick={() => handleExit('stay')} className="px-12 py-4 border border-pink-100/20 text-pink-100 font-sans text-xs tracking-[0.4em] uppercase rounded-full hover:bg-pink-100/5 transition-all">Stay</button>
                </div>
              </>
            ) : exitChoice === 'leave' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <p className="text-4xl md:text-6xl font-cursive text-pink-100">Liar.</p>
                <p className="text-2xl font-serif italic text-pink-200/60">You're already mine 😌</p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                <p className="text-3xl font-cursive text-pink-300 mb-12">Good choice.</p>
                <h3 className="text-4xl md:text-6xl font-cursive text-pink-100 mb-16">Now come... the story continues.</h3>
                <motion.button onClick={onNext} whileHover={{ scale: 1.05 }} className="px-16 py-6 bg-gradient-to-r from-[#800020] to-[#be185d] text-white rounded-full font-sans tracking-[0.6em] text-[10px] uppercase shadow-2xl">Continue ❤️</motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Interlude;
