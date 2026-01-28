
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onReset: () => void;
}

enum FinalSection {
  ARRIVAL,
  DESIRE,
  GAME_CHOICE,
  JOURNEY,
  GAME_INTIMACY,
  MUTUAL_WANT,
  FUTURE,
  CHOOSE_US,
  CONFESSION,
  FOREVER_SEAL
}

const Final: React.FC<Props> = ({ onReset }) => {
  const [activeSection, setActiveSection] = useState<FinalSection>(FinalSection.ARRIVAL);
  const scrollRef = useRef<HTMLDivElement>(null);

  const next = () => setActiveSection(prev => prev + 1);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeSection]);

  useEffect(() => {
    let timer: number;
    if (activeSection === FinalSection.ARRIVAL) timer = window.setTimeout(next, 7000); 
    if (activeSection === FinalSection.DESIRE) timer = window.setTimeout(next, 9500);  
    if (activeSection === FinalSection.MUTUAL_WANT) timer = window.setTimeout(next, 10000); 
    if (activeSection === FinalSection.FUTURE) timer = window.setTimeout(next, 12000); 

    return () => clearTimeout(timer);
  }, [activeSection]);

  const sectionVariants = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)' }
  };

  return (
    <div 
      ref={scrollRef}
      className="relative w-full h-full bg-[#050001] text-[#fff1e6] overflow-y-auto overflow-x-hidden scroll-smooth selection:bg-[#800020]/40"
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#4c0519] rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ opacity: [0.05, 0.15, 0.05], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#800020] rounded-full blur-[150px]" 
        />
      </div>

      <div className="relative z-10 w-full min-h-full flex flex-col items-center justify-center p-6 text-center">
        <AnimatePresence mode="wait">
          
          {activeSection === FinalSection.ARRIVAL && (
            <motion.div key="arrival" {...sectionVariants} transition={{ duration: 2.5 }} className="space-y-8">
              <h1 className="text-6xl md:text-8xl font-cursive text-[#f6c1cc] drop-shadow-[0_0_30px_rgba(128,0,32,0.8)]">Valentine’s Day ❤️‍🔥</h1>
              <div className="space-y-4">
                <p className="font-serif italic text-2xl text-pink-100/60">You didn’t come here to look.</p>
                <p className="font-serif italic text-2xl text-pink-100/60">You came here to stay.</p>
              </div>
            </motion.div>
          )}

          {activeSection === FinalSection.DESIRE && (
            <motion.div key="desire" {...sectionVariants} className="max-w-2xl space-y-12">
              <p className="text-4xl font-serif italic text-pink-100/80">I don’t just love you.</p>
              <div className="space-y-6 pt-10">
                <p className="text-6xl md:text-7xl font-cursive text-pink-50">I want you.</p>
                <div className="flex flex-col gap-4 text-xl tracking-[0.5em] uppercase text-pink-200/40">
                  <p>Calmly.</p>
                  <p>Deeply.</p>
                  <p>Every day.</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === FinalSection.GAME_CHOICE && (
            <motion.div key="game1" {...sectionVariants} className="w-full max-w-4xl space-y-16">
              <div className="space-y-4">
                <h2 className="text-sm font-sans tracking-[0.6em] text-pink-300/40 uppercase">Before anything else…</h2>
                <p className="text-2xl font-serif italic text-pink-100/80">Soft Choices</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                {[
                  { q: "Who reaches first?", a: "Answer doesn’t matter." },
                  { q: "Who pulls closer?", a: "We end up together anyway." },
                  { q: "Who refuses to let go?", a: "The distance always fails." },
                  { q: "Who pretends to be calm?", a: "Neither of us wins that lie." }
                ].map((item, i) => (
                  <ChoiceCard key={i} question={item.q} answer={item.a} />
                ))}
              </div>
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 1.5 }}
                onClick={next}
                className="mt-12 px-10 py-4 border border-white/10 rounded-full text-pink-100/30 uppercase tracking-[0.3em] text-[10px]"
              >
                Our Journey ❤️
              </motion.button>
            </motion.div>
          )}

          {activeSection === FinalSection.JOURNEY && (
            <motion.div key="journey" {...sectionVariants} className="w-full max-w-2xl space-y-16 py-20">
              <div className="space-y-4">
                <h2 className="text-5xl font-cursive text-pink-50">Our Journey ❤️</h2>
                <p className="text-pink-100/40 font-serif italic text-lg">“From strangers… to something we never planned, but chose.”</p>
              </div>
              
              <div className="space-y-32 relative text-left">
                <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5" />
                {[
                  { 
                    title: "When we were just strangers", 
                    date: "School Auto Days",
                    lines: [
                      "We met in a school auto.",
                      "No expectations. No curiosity.",
                      "Just two strangers sharing the same ride.",
                      "At that time, we were nothing to each other.",
                      "And that’s how the best stories usually begin."
                    ]
                  },
                  { 
                    title: "From strangers to friends", 
                    date: "Some Time Later",
                    lines: [
                      "Slowly, conversations started.",
                      "Nothing special. Nothing deep.",
                      "Just normal talks. Normal laughs.",
                      "Somewhere between daily rides, we stopped being strangers.",
                      "We became friends."
                    ]
                  },
                  { 
                    title: "When you asked me something simple", 
                    date: "A Little After That",
                    lines: [
                      "One day, you looked at me and asked —",
                      "‘Best friend banoge kya?’",
                      "It wasn’t dramatic. It wasn’t romantic.",
                      "But it meant something.",
                      "Because from that moment, I wasn’t just someone in the auto anymore.",
                      "I was your best friend."
                    ]
                  },
                  { 
                    title: "Before anything had a name", 
                    date: "12 October 2024",
                    lines: [
                      "We were just talking on Snap.",
                      "No expectations. No labels.",
                      "And then you typed something so simple… yet so heavy for my heart.",
                      "‘Yeah… I kind of liked you from the beginning.’",
                      "I read it more than once.",
                      "Because suddenly, everything I felt made sense."
                    ]
                  },
                  { 
                    title: "Care, even before love", 
                    date: "Navratri, October 2024",
                    lines: [
                      "When my right hand was fractured and life slowed down for me…",
                      "you were worried about garba passes.",
                      "Together — with my Mimi — we arranged them.",
                      "You took a marker and wrote your name — ‘Kiki’ — on my fracture plaster.",
                      "I carried that more carefully than the fracture itself."
                    ]
                  },
                  { 
                    title: "When things got uncomfortable", 
                    date: "16–18 October 2024",
                    lines: [
                      "Not every moment was easy. Some tested patience.",
                      "Unwanted tension and unnecessary noise.",
                      "But one thing was clear to me — I am not weak.",
                      "I stood my ground. Quietly. Confidently.",
                      "And when things tried to get messy… silence returned.",
                      "Stronger than before."
                    ]
                  },
                  { 
                    title: "The first nervous moment", 
                    date: "22 October 2024",
                    lines: [
                      "22nd October was awkward. Nervous. New.",
                      "Hands met… but hearts were still racing.",
                      "It didn’t go perfectly.",
                      "And that’s okay."
                    ]
                  },
                  { 
                    title: "When it finally felt right", 
                    date: "23 October 2024",
                    lines: [
                      "This time, holding hands didn’t feel scary.",
                      "It felt natural. Calm. Right.",
                      "Like something that was always meant to happen."
                    ]
                  },
                  { 
                    title: "Seeing you beyond texts", 
                    date: "29 October 2024",
                    lines: [
                      "The first video call.",
                      "Not perfect lighting. Not perfect words.",
                      "Just real smiles and quiet excitement."
                    ]
                  },
                  { 
                    title: "When feelings were finally spoken", 
                    date: "1 November 2024",
                    lines: [
                      "After Diwali, when the noise faded,",
                      "I said what my heart was carrying.",
                      "Not a perfect rose. Broken petals. Honest feelings.",
                      "And you… chose me."
                    ]
                  },
                  { 
                    title: "When you surprised me", 
                    date: "10 November 2024",
                    lines: [
                      "You came with a bouquet, a perfume set,",
                      "and a surprise I never expected.",
                      "And before leaving, you gave me your hairband.",
                      "I kept it with me for a long time.",
                      "Some things don’t leave your pocket. They stay in your heart."
                    ]
                  }
                ].map((item, i) => (
                  <JourneyEntry key={i} item={item} />
                ))}
              </div>

              <div className="pt-32 pb-20 space-y-16">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="space-y-6">
                  <p className="text-3xl font-cursive text-pink-100">And this is not the end of our journey.</p>
                  <p className="text-3xl font-cursive text-pink-100 italic">It’s just the part we chose to remember today.</p>
                </motion.div>
                
                <div className="pt-8">
                  <motion.button 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1.5 }}
                    onClick={next}
                    className="px-14 py-6 bg-white/5 border border-white/10 rounded-full text-pink-100/50 uppercase tracking-[0.4em] text-[10px] hover:bg-white/10"
                  >
                    Continue the Story ❤️‍🔥
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === FinalSection.GAME_INTIMACY && (
            <motion.div key="game2" {...sectionVariants} className="w-full max-w-4xl space-y-16">
              <h2 className="text-sm font-sans tracking-[0.6em] text-pink-300/40 uppercase">How close is too close?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  "Close enough to hear my breath.",
                  "Close enough that silence feels loud.",
                  "Close enough that stepping back feels wrong."
                ].map((text, i) => (
                  <IntimacyCard key={i} text={text} />
                ))}
              </div>
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 1.5 }}
                onClick={next} 
                className="mt-12 text-pink-200/20 font-sans tracking-[0.4em] uppercase text-[10px]"
              >
                Continue
              </motion.button>
            </motion.div>
          )}

          {activeSection === FinalSection.MUTUAL_WANT && (
            <motion.div key="mutual" {...sectionVariants} className="space-y-12">
              <div className="space-y-6">
                <p className="text-3xl font-serif italic text-pink-100/60">This isn’t chasing.</p>
                <p className="text-3xl font-serif italic text-pink-100/60">This isn’t convincing.</p>
              </div>
              <div className="space-y-8 pt-12">
                <p className="text-5xl font-cursive text-pink-50">It’s two people…</p>
                <p className="text-5xl font-cursive text-pink-50">Wanting the same thing.</p>
                <p className="text-2xl font-serif italic text-pink-100/30">At the same time.</p>
              </div>
            </motion.div>
          )}

          {activeSection === FinalSection.FUTURE && (
            <motion.div key="future" {...sectionVariants} className="max-w-2xl space-y-12">
              <p className="text-3xl font-serif italic text-pink-50">I don’t imagine someday without you.</p>
              <div className="space-y-6 text-xl text-pink-200/40 tracking-widest uppercase">
                <p>I imagine nights.</p>
                <p>Morning silence.</p>
                <p>Shared space.</p>
              </div>
              <div className="pt-12 space-y-4">
                <p className="text-3xl font-serif italic text-pink-100">You’re not just part of my life.</p>
                <p className="text-4xl font-cursive text-pink-50">You’re where it settles.</p>
              </div>
            </motion.div>
          )}

          {activeSection === FinalSection.CHOOSE_US && (
            <motion.div key="game3" {...sectionVariants} className="space-y-20">
              <h2 className="text-sm font-sans tracking-[0.6em] text-pink-300/40 uppercase">Choose us.</h2>
              <div className="flex flex-col items-center">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3, duration: 2 }} 
                  onClick={next}
                  whileHover={{ scale: 1.1, boxShadow: '0 0 50px rgba(128,0,32,0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-40 h-40 rounded-full border border-pink-500/30 flex items-center justify-center bg-gradient-to-br from-[#4c0519] to-transparent text-pink-100 font-sans tracking-[0.4em] uppercase text-xs shadow-2xl"
                >
                  Always
                </motion.button>
                <motion.div 
                  initial={{ opacity: 0 }} 
                  whileInView={{ opacity: 1 }} 
                  transition={{ delay: 5, duration: 1.5 }}
                  className="mt-12"
                >
                  <p className="font-cursive text-2xl text-pink-100/40">That was never a question.</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeSection === FinalSection.CONFESSION && (
            <motion.div key="confession" {...sectionVariants} className="space-y-20">
              <h2 className="text-6xl md:text-8xl font-cursive text-pink-50">I choose you.</h2>
              <div className="space-y-8">
                {["I want you.", "I stay with you.", "I’m not leaving."].map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 2.0 + 1, duration: 2.0 }}
                    className="text-3xl font-serif italic text-pink-100/60"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 8, duration: 1.5 }}
                onClick={next}
                className="px-12 py-5 bg-[#800020] text-white rounded-full font-sans tracking-[0.4em] text-[10px] uppercase shadow-2xl"
              >
                The Forever Seal
              </motion.button>
            </motion.div>
          )}

          {activeSection === FinalSection.FOREVER_SEAL && (
            <motion.div key="seal" variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }} initial="initial" animate="animate" className="space-y-32 py-20">
              <div className="space-y-12">
                <motion.p 
                  initial={{ opacity: 0, filter: 'blur(20px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 4 }}
                  className="text-5xl md:text-7xl font-serif italic text-pink-50"
                >
                  This is not the end.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, filter: 'blur(20px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ delay: 4.5, duration: 4 }}
                  className="text-5xl md:text-7xl font-serif italic text-pink-50"
                >
                  I am not leaving.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 10, duration: 2 }} 
                className="flex flex-col items-center gap-10"
              >
                <button 
                  onClick={onReset}
                  className="px-16 py-6 bg-gradient-to-r from-[#800020] to-[#be185d] text-white rounded-full font-sans font-black tracking-[0.6em] text-xs uppercase shadow-2xl"
                >
                  Stay Forever ❤️
                </button>
                <p className="text-[10px] uppercase tracking-[1em] text-white/10">Forever with Kiki</p>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

const ChoiceCard: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [opened, setOpened] = useState(false);
  return (
    <motion.div 
      onClick={() => setOpened(true)}
      className={`p-10 rounded-[40px] border transition-all duration-1000 flex flex-col items-center justify-center cursor-pointer min-h-[200px] ${opened ? 'bg-white text-[#800020] border-white' : 'bg-white/5 border-white/10 text-white/20'}`}
    >
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.span key="q" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-serif italic text-xl tracking-tight">{question}</motion.span>
        ) : (
          <motion.div key="a" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <p className="font-cursive text-2xl font-bold">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const JourneyEntry: React.FC<{ item: { title: string; date: string; lines: string[] } }> = ({ item }) => {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="relative z-10 flex flex-col items-center w-full">
      <motion.div
        onClick={() => setRevealed(true)}
        whileHover={{ scale: 1.1 }}
        className={`relative z-20 w-8 h-8 rounded-full border-2 transition-all duration-1000 cursor-pointer flex items-center justify-center ${revealed ? 'bg-[#800020] border-[#800020] shadow-[0_0_20px_rgba(128,0,32,0.5)]' : 'bg-[#050001] border-white/20'}`}
      >
        {revealed && <span className="text-white text-[10px]">❤️</span>}
      </motion.div>
      <div className="mt-8 w-full">
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.p key="hint" exit={{ opacity: 0 }} className="text-pink-200/20 font-sans text-[10px] uppercase tracking-widest text-center">Tap to unlock {item.date}</motion.p>
          ) : (
            <motion.div key="content" initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ duration: 1.5 }} className="space-y-6">
              <div className="space-y-2 text-center">
                <h3 className="text-3xl font-cursive text-pink-50">{item.title}</h3>
                <p className="text-[10px] font-sans tracking-[0.4em] uppercase text-pink-200/30">{item.date}</p>
              </div>
              <div className="space-y-3 bg-white/5 p-8 rounded-[32px] border border-white/5 backdrop-blur-sm">
                {item.lines.map((line, idx) => (
                  <motion.p 
                    key={idx} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.8 }}
                    className="text-lg font-serif italic text-pink-100/70 leading-relaxed max-w-lg mx-auto"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const IntimacyCard: React.FC<{ text: string }> = ({ text }) => {
  const [opened, setOpened] = useState(false);
  return (
    <motion.div 
      onClick={() => setOpened(true)}
      className={`p-12 aspect-square rounded-[60px] border transition-all duration-1000 flex items-center justify-center text-center cursor-pointer ${opened ? 'bg-white text-[#800020] border-white shadow-[0_0_40px_rgba(255,255,255,0.1)]' : 'bg-white/5 border-white/10 text-white/5'}`}
    >
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.span key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] uppercase tracking-[0.5em] font-bold">Touch</motion.span>
        ) : (
          <motion.p key="open" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="font-cursive text-xl font-bold leading-relaxed">{text}</motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Final;
