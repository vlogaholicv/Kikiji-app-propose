
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onUnlock: (dayId: number) => void;
  completedDays: number[];
  isTestMode?: boolean;
}

const UNIVERSAL_HINT = "Vihu sir se maango passwords jaake";

const DAYS = [
  { id: 1, name: "Rose Day", date: "2025-02-07", icon: "🌹", password: "14Ki", hint: UNIVERSAL_HINT },
  { id: 2, name: "Propose Day", date: "2025-02-08", icon: "💍", password: "ViKi", hint: UNIVERSAL_HINT },
  { id: 3, name: "Chocolate Day", date: "2025-02-09", icon: "🍫", password: "Vi22", hint: UNIVERSAL_HINT },
  { id: 4, name: "Teddy Day", date: "2025-02-10", icon: "🧸", password: "HuKi", hint: UNIVERSAL_HINT },
  { id: 5, name: "Promise Day", date: "2025-02-11", icon: "🤝", password: "Ki14Vi", hint: UNIVERSAL_HINT },
  { id: 6, name: "Hug Day", date: "2025-02-12", icon: "🤍", password: "Hu22", hint: UNIVERSAL_HINT },
  { id: 7, name: "Kiss Day", date: "2025-02-13", icon: "💋", password: "ViKi22", hint: UNIVERSAL_HINT },
];

const ValentineHub: React.FC<Props> = ({ onUnlock, completedDays, isTestMode }) => {
  const [selectedDay, setSelectedDay] = useState<typeof DAYS[0] | { id: 14, name: string, icon: string, password: string, hint: string } | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [lockMessage, setLockMessage] = useState<string | null>(null);
  const [isInputVisible, setIsInputVisible] = useState(false);
  
  // Sequence Taps State
  const tapCount = useRef(0);
  const lastTapTime = useRef(0);

  const now = useMemo(() => new Date(), []);

  const handleCornerTap = () => {
    const time = Date.now();
    if (time - lastTapTime.current < 800) {
      tapCount.current += 1;
    } else {
      tapCount.current = 1;
    }
    lastTapTime.current = time;

    if (tapCount.current >= 7) {
      setIsInputVisible(true);
      tapCount.current = 0;
    }
  };

  const isDayUnlocked = (dayId: number) => {
    if (isTestMode) return true;
    if (dayId === 1) return true;
    if (dayId === 14) return completedDays.includes(7);
    return completedDays.includes(dayId - 1);
  };

  const handleDayClick = (day: typeof DAYS[0]) => {
    if (!isDayUnlocked(day.id)) {
      setLockMessage("Not your day yet 😌");
      setTimeout(() => setLockMessage(null), 3000);
      return;
    }

    setSelectedDay(day);
    setPassword('');
    setError(null);
    setIsInputVisible(false);
  };

  const checkPassword = () => {
    if (!selectedDay) return;
    
    if (password.trim().toLowerCase() === selectedDay.password.toLowerCase()) {
      // One final check for sequence just in case
      if (isDayUnlocked(selectedDay.id)) {
        onUnlock(selectedDay.id);
      } else {
        setError("Not your day yet 😌");
      }
    } else {
      setError("Hmm… not this one. Think closer ❤️");
      setTimeout(() => setError(null), 2500);
    }
  };

  const handleFinalClick = () => {
    if (!isDayUnlocked(14)) {
      setLockMessage("The final seal is still protected ❤️‍🔥");
      setTimeout(() => setLockMessage(null), 3000);
      return;
    }
    setSelectedDay({ 
      id: 14, 
      name: "Valentine's Day", 
      icon: "❤️‍🔥", 
      password: "ForeverKiki", 
      hint: UNIVERSAL_HINT 
    });
    setPassword('');
    setError(null);
    setIsInputVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-start h-full w-full bg-[#0d0002] text-[#fff1e6] p-6 overflow-y-auto pt-20 relative">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 flex-shrink-0">
        <h2 className="text-5xl md:text-7xl font-cursive text-pink-100 mb-4 drop-shadow-lg text-glow">The Valentine Vault</h2>
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-pink-200/40">Our ritual of love, day by day.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-16 flex-shrink-0">
        {DAYS.map((day) => {
          const isUnlocked = isDayUnlocked(day.id);
          const isDone = completedDays.includes(day.id);
          
          return (
            <motion.div 
              key={day.id} 
              whileHover={!isUnlocked ? {} : { scale: 1.05 }} 
              whileTap={!isUnlocked ? { x: [0, -5, 5, 0] } : { scale: 0.95 }} 
              onClick={() => handleDayClick(day)} 
              className={`relative cursor-pointer border rounded-3xl p-6 flex flex-col items-center text-center backdrop-blur-md transition-all group overflow-hidden ${
                !isUnlocked 
                  ? 'bg-black/40 border-white/5 grayscale opacity-40 blur-[2px]' 
                  : isDone 
                    ? 'bg-pink-900/10 border-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.05)]'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <span className={`text-4xl mb-4 transition-transform ${!isUnlocked ? '' : 'group-hover:scale-110'}`}>
                {!isUnlocked ? "🔒" : day.icon}
              </span>
              <h3 className="text-lg font-serif mb-1">{day.name}</h3>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-sans tracking-widest text-pink-200/40 uppercase">
                  {!isUnlocked ? "Locked" : isDone ? "Review" : "Available"}
                </span>
                {isDone && (
                  <span className="text-[9px] text-pink-400/80 font-bold uppercase tracking-widest mt-1">Completed ✨</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center pb-32 flex-shrink-0 relative">
        <AnimatePresence>
          {lockMessage && (
            <motion.div 
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }} 
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} 
              exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }} 
              className="absolute -top-16 left-0 right-0 text-center px-4 z-50 pointer-events-none"
            >
              <p className="text-pink-300 font-serif italic text-base whitespace-pre-line leading-relaxed drop-shadow-md">
                {lockMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleFinalClick}
          whileHover={isDayUnlocked(14) ? { scale: 1.05 } : {}}
          whileTap={isDayUnlocked(14) ? { scale: 0.95 } : { x: [0, -5, 5, 0] }}
          animate={{ 
            boxShadow: isDayUnlocked(14) 
              ? ["0 0 20px rgba(255,50,50,0.1)", "0 0 60px rgba(255,50,50,0.4)", "0 0 20px rgba(255,50,50,0.1)"] 
              : "none" 
          }}
          transition={{ repeat: Infinity, duration: 3 }}
          className={`relative px-12 py-8 rounded-[40px] flex flex-col items-center justify-center transition-all overflow-hidden border ${
            !isDayUnlocked(14)
            ? 'bg-black/60 border-white/5 grayscale opacity-30 blur-[2px]'
            : 'bg-gradient-to-r from-[#800020] to-[#4c0519] border-pink-500/50 shadow-2xl'
          }`}
        >
          {isDayUnlocked(14) && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.span key={i} initial={{ bottom: -20, opacity: 0, x: (i - 4) * 30 }} animate={{ bottom: 150, opacity: [0, 1, 0] }} transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: i * 0.4 }} className="absolute text-red-500/40 text-sm">❤️</motion.span>
              ))}
            </div>
          )}
          <span className="text-[10px] font-sans tracking-[0.6em] text-pink-200/40 uppercase mb-2">The Final ritual</span>
          <h3 className="text-2xl md:text-4xl font-cursive text-pink-50 flex items-center gap-3">
            {!isDayUnlocked(14) && "🔒 "}Forever with You ❤️‍🔥
          </h3>
          <span className="text-[9px] font-serif italic text-pink-100/30 mt-3 tracking-widest">
            {isDayUnlocked(14) ? "The seal is ready." : "Unlock after Kiss Day."}
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {selectedDay && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
            {/* HIDDEN TAP TRIGGER (TOP RIGHT OF MODAL) */}
            <div 
              onClick={handleCornerTap}
              className="absolute top-0 right-0 w-32 h-32 bg-transparent z-[110]"
              style={{ touchAction: 'manipulation' }}
            />

            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-[#1a0005] border border-pink-500/30 p-10 rounded-[40px] w-full max-w-sm text-center relative shadow-2xl overflow-hidden">
              <button onClick={() => setSelectedDay(null)} className="absolute top-6 left-6 text-white/20 hover:text-white transition-colors z-50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              
              <div className="text-6xl mb-6 drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]">{selectedDay.icon}</div>
              <h3 className="text-3xl font-cursive mb-2 text-pink-50">{selectedDay.name}</h3>
              <p className="text-[10px] font-sans tracking-widest text-pink-200/40 uppercase mb-8">Sacred Access Required</p>
              
              <div className="space-y-6">
                {!isInputVisible ? (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-pink-100/40 font-serif italic text-xs tracking-widest py-8 border border-white/5 rounded-2xl bg-white/5">
                    "7 touches on the corner to reveal the path..."
                  </motion.p>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <p className="text-sm font-serif italic text-pink-100/70 mb-2">{selectedDay.hint}</p>
                    <input 
                      type="text" 
                      value={password} 
                      autoFocus 
                      onChange={(e) => setPassword(e.target.value)} 
                      onKeyDown={(e) => e.key === 'Enter' && checkPassword()} 
                      placeholder="SPEAK THE SECRET..." 
                      className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-5 text-center text-pink-100 focus:outline-none focus:border-pink-500/50 transition-all font-sans tracking-[0.3em] uppercase text-xs" 
                    />
                    {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-[10px] font-sans uppercase tracking-widest font-bold">{error}</motion.p>}
                    <button 
                      onClick={checkPassword} 
                      className="w-full py-5 bg-[#800020] text-pink-100 rounded-2xl font-sans font-black tracking-[0.4em] text-[10px] uppercase shadow-2xl hover:bg-[#a00028] transition-all"
                    >
                      Unlock Day ❤️
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ValentineHub;
