
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FallingPetals from '../components/FallingPetals';
import GrainOverlay from '../components/GrainOverlay';

interface Props {
  dayId: number;
  onBack: () => void;
}

const PROMISE_CARDS = [
  {
    icon: "🤝",
    title: "I promise to stay",
    lines: [
      "Through the arguments,",
      "through the silence,",
      "through every doubt.",
      "I am not leaving."
    ]
  },
  {
    icon: "🕯️",
    title: "I promise to be your peace",
    lines: [
      "When the world gets too loud,",
      "my arms will be your quiet place.",
      "Always."
    ]
  },
  {
    icon: "💎",
    title: "I promise to choose you",
    lines: [
      "Not just today,",
      "but every single morning",
      "for the rest of my life."
    ]
  },
  {
    icon: "📜",
    title: "I promise honesty",
    lines: [
      "No filters, no masks.",
      "Just my heart, exactly as it is,",
      "given only to you."
    ]
  }
];

const DayView: React.FC<Props> = ({ dayId, onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasFinished, setHasFinished] = useState(false);
  const [roseAccepted, setRoseAccepted] = useState(false);
  const [chocShared, setChocShared] = useState(false);
  
  // Day-specific step states
  const [teddyStep, setTeddyStep] = useState(0);
  const [promiseStep, setPromiseStep] = useState(0);
  const [hugStep, setHugStep] = useState(0);
  const [kissStep, setKissStep] = useState(0);

  // Rotating jokes for Kiss Day
  const [jokeIndex, setJokeIndex] = useState(0);
  const jokes = [
    "Warning: lips have memory.",
    "Kisses may cause attachment.",
    "Once started, stopping is optional."
  ];

  useEffect(() => {
    if (dayId === 7) {
      const interval = setInterval(() => {
        setJokeIndex((prev) => (prev + 1) % jokes.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [dayId]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
    setHasFinished(false);
    setRoseAccepted(false);
    setChocShared(false);
    setTeddyStep(0);
    setPromiseStep(0);
    setHugStep(0);
    setKissStep(0);
  }, [dayId]);

  const renderContent = () => {
    switch (dayId) {
      case 1: // Rose Day
        return (
          <div className="bg-[#fff1e6] min-h-screen text-[#800020] selection:bg-pink-100 selection:text-[#800020]">
            <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center bg-gradient-to-b from-[#fff1e6] to-[#fdf2f4] relative">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2.5 }} viewport={{ once: true }} className="space-y-12">
                <h1 className="text-5xl md:text-7xl font-cursive mb-6 text-[#800020] drop-shadow-sm">Happy Rose Day, Kikiji 🌹</h1>
                <div className="space-y-6">
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 0.7 }} transition={{ delay: 3.5, duration: 2 }} viewport={{ once: true }} className="font-serif italic text-2xl md:text-3xl opacity-60">Not for the rose in my hand…</motion.p>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 5.5, duration: 2 }} viewport={{ once: true }} className="font-serif italic text-2xl md:text-3xl">but for the rose you became in my life.</motion.p>
                </div>
              </motion.div>
            </section>
            <section className="min-h-screen flex flex-col items-center justify-center px-10 text-center bg-white/20">
              <div className="max-w-xl space-y-16">
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 2.5 }} viewport={{ once: true }} className="font-serif italic text-2xl md:text-3xl leading-relaxed">“I may not always know<br/>how to express love perfectly…”</motion.p>
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 2.5 }} viewport={{ once: true }} className="font-serif italic text-2xl md:text-3xl leading-relaxed">“But every feeling I have for you<br/>is real, soft, and honest.”</motion.p>
                <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 5.5, duration: 2.5 }} viewport={{ once: true }} className="space-y-4 pt-12">
                  <p className="font-serif text-3xl md:text-4xl text-[#800020]">“Like a rose—”</p>
                  <p className="font-serif text-xl md:text-2xl opacity-40 italic">not loud,</p>
                  <p className="font-serif text-xl md:text-2xl opacity-40 italic">not perfect,</p>
                  <p className="font-serif text-3xl md:text-4xl font-bold">but full of meaning.”</p>
                </motion.div>
              </div>
            </section>
            <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center bg-gradient-to-b from-white/20 to-[#fff1e6]">
              <div className="max-w-lg space-y-16">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2.5 }} viewport={{ once: true }} className="space-y-8">
                  <p className="font-serif italic text-2xl md:text-3xl leading-relaxed">“Once, I didn’t have a perfect rose.<br/>I had broken petals…”</p>
                  <p className="font-serif italic text-2xl md:text-3xl leading-relaxed opacity-60">“but they carried all my feelings.”</p>
                </motion.div>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 3.5, duration: 2.5 }} viewport={{ once: true }} className="font-cursive text-4xl md:text-5xl text-[#800020] leading-snug">“And even then,<br/>you accepted them with a smile.”</motion.p>
              </div>
            </section>
            <section className="min-h-screen flex flex-col items-center justify-center px-12 text-center bg-[#fdf2f4]">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 4 }} viewport={{ once: true }} className="max-w-2xl">
                <p className="font-cursive text-4xl md:text-6xl leading-tight text-[#800020] italic">“You are the rose<br/>that made my ordinary days feel special,<br/>my silences feel safe,<br/>and my heart feel at home.”</p>
              </motion.div>
            </section>
            <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center relative overflow-hidden bg-[#fff1e6]">
              <AnimatePresence mode="wait">
                {!roseAccepted ? (
                  <motion.div key="accept" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }} className="flex flex-col items-center gap-14">
                    <p className="font-serif italic text-xl md:text-2xl text-[#800020]/40 uppercase tracking-widest">A gift for you</p>
                    <motion.button onClick={() => setRoseAccepted(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-14 py-6 bg-[#800020] text-[#fff1e6] rounded-full font-sans tracking-[0.4em] text-xs uppercase shadow-2xl hover:bg-[#a00028] transition-colors">Accept this rose 🌹</motion.button>
                  </motion.div>
                ) : (
                  <motion.div key="accepted" initial={{ opacity: 0, filter: 'blur(20px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} className="space-y-24 w-full max-w-2xl">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }} className="space-y-4">
                      <p className="font-cursive text-4xl md:text-5xl text-[#800020]">“You already have my heart.”</p>
                    </motion.div>
                    <div className="space-y-10 pt-10">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.5, duration: 2.5 }} className="space-y-6">
                        <p className="font-serif text-3xl italic text-[#800020]">“This rose is not for one day.”</p>
                        <p className="font-serif text-xl md:text-2xl opacity-40 italic leading-relaxed">“It’s for every morning,<br/>every smile,<br/>and every tomorrow<br/>I want with you.”</p>
                      </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5, duration: 2 }} className="pt-16">
                      <button onClick={onBack} className="px-16 py-5 border border-[#800020]/20 rounded-full font-sans tracking-[0.5em] text-[10px] uppercase text-[#800020]/50 hover:bg-[#800020]/5 transition-all">Continue the week 💗</button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>
        );
      case 3: // Chocolate Day
        return (
          <div className="min-h-screen bg-[#1e0a0a] text-[#fdf5e6] selection:bg-[#d9a066]/30 selection:text-[#fdf5e6]">
            {/* Indulgent Background Effect */}
            <div className="fixed inset-0 pointer-events-none z-0">
               <motion.div 
                 animate={{ 
                   background: [
                     'radial-gradient(circle at 20% 20%, #3e1d13 0%, #1e0a0a 100%)',
                     'radial-gradient(circle at 80% 80%, #3e1d13 0%, #1e0a0a 100%)',
                     'radial-gradient(circle at 20% 20%, #3e1d13 0%, #1e0a0a 100%)',
                   ] 
                 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 opacity-40"
               />
               {/* Tiny floating cocoa particles */}
               {[...Array(20)].map((_, i) => (
                 <motion.div
                    key={i}
                    initial={{ y: -20, x: Math.random() * 100 + 'vw', opacity: 0 }}
                    animate={{ y: '110vh', opacity: [0, 0.2, 0] }}
                    transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, delay: Math.random() * 10 }}
                    className="absolute w-1 h-1 bg-[#d9a066] rounded-full blur-[1px]"
                 />
               ))}
            </div>

            <div className="relative z-10">
              {/* 1. OPENING */}
              <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 2 }} viewport={{ once: true }} className="space-y-10">
                  <h1 className="text-5xl md:text-7xl font-cursive text-[#fdf5e6] drop-shadow-2xl">Happy Chocolate Day, Kikiji 🍫</h1>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 0.8 }} transition={{ delay: 2, duration: 1.5 }} viewport={{ once: true }} className="font-serif italic text-xl md:text-2xl text-[#d9a066]">
                    “Some sweetness is meant to be shared… slowly.”
                  </motion.p>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.3 }} transition={{ delay: 4 }} className="absolute bottom-10 animate-bounce">
                  <span className="text-[10px] uppercase tracking-widest">Scroll Down</span>
                </motion.div>
              </section>

              {/* 2. MAIN EMOTIONAL SECTION */}
              <section className="min-h-screen flex flex-col items-center justify-center px-10 text-center">
                <div className="max-w-xl space-y-16">
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }} viewport={{ once: true }} className="font-serif italic text-2xl md:text-3xl leading-relaxed text-[#fdf5e6]/80">
                    “Chocolate melts…<br/>not because it’s weak,<br/>but because it’s meant to feel.”
                  </motion.p>
                  
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2.5, duration: 2 }} viewport={{ once: true }} className="font-cursive text-4xl md:text-5xl text-[#d9a066]">
                    “And loving you feels the same.”
                  </motion.p>

                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 5, duration: 2 }} viewport={{ once: true }} className="flex flex-col gap-4 text-xl tracking-[0.5em] uppercase text-[#fdf5e6]/30">
                    <p>Warm.</p>
                    <p>Comforting.</p>
                    <p>Irresistible.</p>
                  </motion.div>
                </div>
              </section>

              {/* 3. PERSONAL TOUCH */}
              <section className="min-h-screen flex flex-col items-center justify-center px-12 text-center bg-black/10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 2.5 }} viewport={{ once: true }} className="max-w-2xl space-y-12">
                  <p className="font-serif italic text-2xl md:text-3xl leading-relaxed text-[#fdf5e6]/90">
                    “Every chocolate reminds me of you.<br/>Not just because it’s sweet…”
                  </p>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 3, duration: 2 }} viewport={{ once: true }} className="space-y-4">
                    <p className="font-serif text-3xl md:text-4xl text-[#d9a066]">But because it stays.</p>
                    <p className="font-serif text-2xl md:text-3xl opacity-60 italic">It lingers.</p>
                    <p className="font-serif text-3xl md:text-4xl">And it makes everything better.</p>
                  </motion.div>
                </motion.div>
              </section>

              {/* 4. INTERACTION */}
              <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center relative">
                <AnimatePresence mode="wait">
                  {!chocShared ? (
                    <motion.div key="share" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 1.5 }} className="space-y-16">
                      <p className="font-serif italic text-2xl text-[#d9a066]/50 uppercase tracking-widest">A ritual for us</p>
                      <motion.button
                        onClick={() => setChocShared(true)}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(217, 160, 102, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-14 py-6 bg-[#d9a066] text-[#1e0a0a] rounded-full font-sans font-black tracking-[0.4em] text-xs uppercase shadow-2xl transition-all"
                      >
                        Share this chocolate with me 🍫💞
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div key="shared" initial={{ opacity: 0, filter: 'blur(20px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 2 }} className="space-y-24 w-full max-w-2xl">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="space-y-10">
                        <p className="font-cursive text-4xl md:text-5xl text-[#fdf5e6]">
                          “If I had real chocolate right now,<br/>I’d break it slowly…”
                        </p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 2 }} className="font-serif italic text-2xl md:text-3xl text-[#d9a066]">
                          “…and give you the bigger piece.”
                        </motion.p>
                      </motion.div>

                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.5, duration: 2 }} className="font-serif text-lg md:text-xl opacity-40 uppercase tracking-[0.5em]">
                        Because that’s how I love.
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>

              {/* 5. SENSORY POETIC SECTION */}
              <section className="min-h-screen flex flex-col items-center justify-center px-12 text-center bg-[#140806]/40">
                <div className="max-w-2xl space-y-12">
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2.5 }} viewport={{ once: true }} className="font-serif italic text-3xl md:text-4xl text-[#fdf5e6]/70 leading-relaxed">
                    “Chocolate doesn’t rush.<br/>It melts.”
                  </motion.p>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 3, duration: 2.5 }} viewport={{ once: true }} className="font-cursive text-4xl md:text-6xl text-[#d9a066]">
                    “And neither do my feelings for you.”
                  </motion.p>
                </div>
              </section>

              {/* 6. CLOSING & CTA */}
              <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center bg-gradient-to-t from-[#1e0a0a] to-transparent">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 3 }} viewport={{ once: true }} className="space-y-20">
                  <div className="space-y-6">
                    <p className="text-3xl md:text-4xl font-cursive text-[#fdf5e6]">This isn’t just a Chocolate Day wish.</p>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2, duration: 2 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-serif italic text-[#d9a066]">
                      “It’s a reminder…<br/>that life tastes better<br/>when I share it with you.”
                    </motion.p>
                  </div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 5, duration: 1.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    onClick={onBack}
                    className="px-16 py-5 border border-[#d9a066]/20 rounded-full font-sans tracking-[0.5em] text-[10px] uppercase text-[#d9a066]/60 hover:bg-[#d9a066]/5 transition-all"
                  >
                    Continue the week 🤎
                  </motion.button>
                </motion.div>
              </section>
            </div>
          </div>
        );
      case 4: // Teddy Day
        return (
          <div className="min-h-screen bg-[#fffbf0] text-[#5d4037] selection:bg-[#ffb6c1]/30 selection:text-[#5d4037]">
            {/* Soft Background texture & elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
               <div 
                 className="absolute inset-0 opacity-[0.03] pointer-events-none"
                 style={{ backgroundImage: 'radial-gradient(#d2b48c 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
               />
               <motion.div 
                 animate={{ opacity: [0.3, 0.5, 0.3] }}
                 transition={{ duration: 8, repeat: Infinity }}
                 className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#ffb6c1]/5 to-transparent"
               />
               {[...Array(10)].map((_, i) => (
                 <motion.div
                    key={i}
                    initial={{ y: '110vh', x: Math.random() * 100 + 'vw', opacity: 0 }}
                    animate={{ y: '-10vh', opacity: [0, 0.2, 0.2, 0] }}
                    transition={{ duration: Math.random() * 20 + 20, repeat: Infinity, delay: Math.random() * 10, ease: "linear" }}
                    className="absolute text-[#ffb6c1] blur-[1px]"
                    style={{ fontSize: Math.random() * 20 + 10 }}
                 >
                   🤍
                 </motion.div>
               ))}
            </div>

            <div className="relative z-10 w-full">
              <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
                <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 2 }} viewport={{ once: true }} className="space-y-8">
                  <h1 className="text-5xl md:text-7xl font-cursive text-[#8d6e63]">Happy Teddy Day, Kikiji 🧸</h1>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2, duration: 1.5 }} viewport={{ once: true }} className="font-serif italic text-xl md:text-2xl text-[#d2b48c]">
                    “Some hugs don’t need arms…”
                  </motion.p>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.3 }} transition={{ delay: 4 }} className="absolute bottom-12 animate-bounce">
                  <span className="text-[10px] uppercase tracking-widest text-[#d2b48c]">Scroll Down</span>
                </motion.div>
              </section>

              <section className="min-h-screen flex flex-col items-center justify-center px-10 text-center">
                <div className="max-w-2xl space-y-20">
                   <div className="space-y-6">
                    {[
                      "Some hugs are quiet.",
                      "They don’t speak.",
                      "They just stay."
                    ].map((line, i) => (
                      <motion.p 
                        key={i}
                        initial={{ opacity: 0, y: 10 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        transition={{ delay: i * 1.5, duration: 2 }} 
                        viewport={{ once: true }} 
                        className="font-serif italic text-2xl md:text-3xl text-[#5d4037]/80"
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>

                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 5, duration: 2.5 }} viewport={{ once: true }} className="space-y-6 pt-10">
                    <p className="font-cursive text-3xl md:text-5xl text-[#d2b48c] leading-relaxed px-4">
                      “And if I could, I’d give you a teddy that smells like me, feels like me, and stays with you when I can’t.”
                    </p>
                  </motion.div>
                </div>
              </section>

              <section className="min-h-screen flex flex-col items-center justify-center px-12 text-center bg-white/30 backdrop-blur-[2px]">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 2.5 }} viewport={{ once: true }} className="max-w-xl space-y-12">
                  <p className="font-serif italic text-2xl md:text-3xl leading-relaxed text-[#5d4037]/90">
                    “This teddy wouldn’t just be cute.”
                  </p>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2.5, duration: 2 }} viewport={{ once: true }} className="space-y-8">
                    <p className="font-serif text-2xl md:text-3xl opacity-80 leading-relaxed">
                      It would listen to your silence.<br/>
                      Hold you when you’re tired.<br/>
                      And remind you…
                    </p>
                    <p className="font-cursive text-4xl md:text-5xl text-[#d2b48c]">you’re never alone.</p>
                  </motion.div>
                </motion.div>
              </section>

              <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center relative">
                <AnimatePresence mode="wait">
                  {teddyStep === 0 ? (
                    <motion.div key="invite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 1.5 }} className="space-y-16">
                      <p className="font-serif italic text-xl text-[#d2b48c]/60 uppercase tracking-widest">A moment for us</p>
                      <motion.button
                        onClick={() => setTeddyStep(1)}
                        whileHover={{ scale: 1.05, backgroundColor: "#fff" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-16 py-7 bg-white border border-[#d2b48c]/20 text-[#5d4037] rounded-full font-sans font-black tracking-[0.4em] text-[10px] uppercase shadow-xl transition-all"
                      >
                        Come here… 🧸🤍
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div key="hugged" initial={{ opacity: 0, filter: 'blur(20px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 2.5 }} className="space-y-24 w-full max-w-2xl px-6">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }} className="space-y-10">
                        <p className="font-cursive text-4xl md:text-6xl text-[#5d4037] leading-tight">
                          “If you were here right now, I’d pull you closer, wrap you in my arms, and not say anything.”
                        </p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 2 }} className="font-serif italic text-2xl md:text-3xl text-[#d2b48c]">
                          “Because comfort doesn’t need words.”
                        </motion.p>
                      </motion.div>

                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7, duration: 2 }} className="pt-10 space-y-16">
                         <div className="space-y-8">
                            <p className="font-serif italic text-2xl md:text-3xl text-[#5d4037]/70">
                              “This teddy isn’t a toy.”
                            </p>
                            <p className="font-cursive text-4xl md:text-6xl text-[#d2b48c] drop-shadow-sm">
                              “It’s a promise… whenever you need warmth, I’m already there.”
                            </p>
                         </div>
                         <div className="space-y-8 pt-10">
                            <div className="space-y-4">
                              <p className="text-3xl md:text-4xl font-cursive text-[#5d4037]">Happy Teddy Day, Kikiji.</p>
                              <div className="flex flex-col gap-2 text-xl tracking-[0.4em] uppercase text-[#d2b48c]/60 font-sans">
                                <p>Stay soft.</p>
                                <p>Stay warm.</p>
                                <p>Stay mine.</p>
                              </div>
                            </div>
                            <motion.button
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 12, duration: 1.5 }}
                              whileHover={{ scale: 1.05 }} onClick={onBack}
                              className="px-14 py-6 bg-white border border-[#d2b48c]/20 rounded-full font-sans tracking-[0.5em] text-[10px] uppercase text-[#5d4037]/60 hover:bg-white transition-all shadow-lg mt-10"
                            >
                              Continue the week 🧸💞
                            </motion.button>
                         </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            </div>
          </div>
        );
      case 5: // Promise Day
        return (
          <div className="min-h-screen bg-[#fffafa] text-[#b01e40] selection:bg-[#f8d7da] selection:text-[#b01e40]">
            {/* Soft Warm Glow Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
               <motion.div 
                 animate={{ 
                   background: [
                     'radial-gradient(circle at 50% 50%, #fff0f0 0%, #fffafa 100%)',
                     'radial-gradient(circle at 40% 60%, #fff5f5 0%, #fffafa 100%)',
                     'radial-gradient(circle at 50% 50%, #fff0f0 0%, #fffafa 100%)',
                   ] 
                 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 opacity-60"
               />
               {/* Gentle Floating Hearts */}
               {[...Array(12)].map((_, i) => (
                 <motion.div
                    key={i}
                    initial={{ y: '110vh', x: Math.random() * 100 + 'vw', opacity: 0, scale: 0.5 }}
                    animate={{ y: '-10vh', opacity: [0, 0.4, 0.4, 0], scale: [0.5, 1, 1, 0.8] }}
                    transition={{ duration: Math.random() * 15 + 15, repeat: Infinity, delay: Math.random() * 10, ease: "linear" }}
                    className="absolute text-[#f8bbd0]/50"
                 >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                   </svg>
                 </motion.div>
               ))}
            </div>

            <div className="relative z-10 w-full">
              {/* 1. OPENING */}
              <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 2 }} viewport={{ once: true }} className="space-y-10">
                  <h1 className="text-5xl md:text-7xl font-cursive text-[#d81b60] drop-shadow-sm">Happy Promise Day, Kikiji ❤️</h1>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 0.7 }} transition={{ delay: 2, duration: 2 }} viewport={{ once: true }} className="font-serif italic text-xl md:text-2xl text-[#f06292]">
                    “Today isn’t about big words…”
                  </motion.p>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.2 }} transition={{ delay: 4.5 }} className="absolute bottom-12 animate-bounce">
                  <span className="text-[10px] uppercase tracking-widest text-[#d81b60]">Scroll Softly</span>
                </motion.div>
              </section>

              {/* 2. INTRO TEXT */}
              <section className="min-h-screen flex flex-col items-center justify-center px-10 text-center">
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 2.5 }} viewport={{ once: true }} className="font-cursive text-4xl md:text-6xl text-[#d81b60] leading-tight max-w-2xl">
                  “It’s about small promises<br/>that quietly last forever.”
                </motion.p>
              </section>

              {/* 3. PROMISE SECTION */}
              <section className="min-h-screen flex flex-col items-center justify-center px-8 space-y-24 py-20">
                <div className="max-w-xl w-full space-y-32">
                  {[
                    "I promise to always care for you,\neven on days when words feel heavy.",
                    "I promise to make you smile,\nespecially when life feels tiring.",
                    "I promise to support you,\nnot just when things are easy,\nbut when they aren’t.",
                    "I promise to choose you,\nagain and again,\nwithout hesitation."
                  ].map((promiseText, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} 
                      whileInView={{ opacity: 1, x: 0 }} 
                      transition={{ duration: 2, ease: "easeOut" }} 
                      viewport={{ once: true, margin: "-100px" }}
                      className="text-center p-8 border border-[#f8bbd0]/30 rounded-[40px] bg-white/40 shadow-sm"
                    >
                      <p className="font-serif italic text-2xl md:text-3xl text-[#c2185b] leading-relaxed whitespace-pre-line">
                        {promiseText}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* 4. JOY & HAPPINESS */}
              <section className="min-h-screen flex flex-col items-center justify-center px-12 text-center bg-[#fff5f8]/40">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2.5 }} viewport={{ once: true }} className="max-w-2xl space-y-16">
                  <p className="font-serif italic text-3xl md:text-4xl text-[#d81b60]/80">“With you,<br/>love doesn’t feel loud.”</p>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2, duration: 2 }} viewport={{ once: true }} className="flex flex-col gap-6 text-2xl md:text-3xl font-cursive text-[#f48fb1]">
                    <p>It feels happy.</p>
                    <p>Light.</p>
                    <p>Peaceful.</p>
                  </motion.div>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 5, duration: 2 }} viewport={{ once: true }} className="font-serif italic text-xl md:text-2xl opacity-40">
                    “Like something that belongs.”
                  </motion.p>
                </motion.div>
              </section>

              {/* 5. INTERACTION */}
              <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center relative">
                <AnimatePresence mode="wait">
                  {promiseStep === 0 ? (
                    <motion.div key="hold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 1.5 }} className="space-y-16">
                      <p className="font-serif italic text-xl text-[#f48fb1] uppercase tracking-widest">Seal the intent</p>
                      <motion.button
                        onClick={() => setPromiseStep(1)}
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(216, 27, 96, 0.15)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-16 py-6 bg-white border border-[#f8bbd0] text-[#d81b60] rounded-full font-sans font-black tracking-[0.4em] text-[10px] uppercase transition-all shadow-md"
                      >
                        Hold this promise 🤍
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div key="held" initial={{ opacity: 0, filter: 'blur(20px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 2 }} className="space-y-20 w-full max-w-2xl px-6">
                      <div className="space-y-10">
                        <p className="font-cursive text-4xl md:text-6xl text-[#d81b60] leading-tight">
                          “These promises aren’t pressure.”
                        </p>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 2 }} className="flex justify-center gap-6 text-xl tracking-[0.4em] uppercase text-[#f06292]/60 font-sans">
                          <p>Comfort.</p>
                          <p>Care.</p>
                          <p>Joy.</p>
                        </motion.div>
                      </div>

                      {/* 6. CLOSING */}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6, duration: 2.5 }} className="pt-20 space-y-16">
                         <div className="space-y-8">
                            <p className="text-4xl md:text-5xl font-cursive text-[#d81b60]">Happy Promise Day, Kikiji.</p>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 8, duration: 2 }} className="font-serif italic text-2xl md:text-3xl text-[#f48fb1]">
                              “Laugh freely.<br/>Dream boldly.<br/>And know…”
                            </motion.p>
                            <motion.p initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 11, duration: 2 }} className="font-cursive text-5xl md:text-7xl text-[#d81b60] font-bold drop-shadow-sm">
                              “you are deeply loved.”
                            </motion.p>
                         </div>

                         <motion.button
                           initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 14, duration: 1.5 }}
                           whileHover={{ scale: 1.05 }} onClick={onBack}
                           className="px-16 py-6 border border-[#f8bbd0] rounded-full font-sans tracking-[0.5em] text-[10px] uppercase text-[#d81b60]/60 hover:bg-white transition-all shadow-lg mt-10"
                         >
                           Continue the week 💗✨
                         </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            </div>
          </div>
        );
      case 6: // Hug Day
        return (
          <div className="min-h-screen bg-[#050510] text-[#fffafa] selection:bg-[#ffb6c1]/20 selection:text-white relative overflow-x-hidden">
            {/* Immersive Cozy Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
               {/* Slow Breathing Background Pulse */}
               <motion.div 
                 animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.05, 1] }}
                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 bg-gradient-to-br from-[#0a0a20] via-[#050510] to-[#100510]"
               />
               
               {/* Vignette Overlay */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />

               {/* Slow Floating Soft Hearts */}
               {[...Array(8)].map((_, i) => (
                 <motion.div
                    key={i}
                    initial={{ y: '110vh', x: Math.random() * 100 + 'vw', opacity: 0, scale: 0.5 }}
                    animate={{ y: '-10vh', opacity: [0, 0.2, 0.2, 0], scale: [0.5, 0.8, 0.8, 0.6] }}
                    transition={{ duration: Math.random() * 25 + 25, repeat: Infinity, delay: Math.random() * 10, ease: "linear" }}
                    className="absolute text-pink-300/40"
                 >
                   🤍
                 </motion.div>
               ))}
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
              {/* 1. OPENING */}
              <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 2.5 }} viewport={{ once: true }} className="space-y-10">
                  <h1 className="text-5xl md:text-7xl font-cursive text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Happy Hug Day, Kikiji 🤍</h1>
                  <div className="space-y-4">
                    <p className="font-serif italic text-2xl text-white/70">“Come closer…”</p>
                    <p className="font-serif italic text-xl text-white/40 italic">this one needs no words.</p>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.3 }} transition={{ delay: 4.5 }} className="absolute bottom-12 animate-bounce">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-white/30">Scroll Softly</span>
                </motion.div>
              </section>

              {/* 2. INTIMATE INTRO */}
              <section className="min-h-screen flex flex-col items-center justify-center px-10 text-center">
                <div className="max-w-2xl space-y-16">
                  <div className="space-y-6">
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }} viewport={{ once: true }} className="font-serif italic text-2xl md:text-3xl text-white/80">
                      “Hugs are not about arms.”
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.5, duration: 2 }} viewport={{ once: true }} className="font-serif italic text-2xl md:text-3xl text-white/80 font-bold">
                      “They’re about permission.”
                    </motion.p>
                  </div>
                  
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 4, duration: 2 }} viewport={{ once: true }} className="flex flex-col gap-6 text-xl tracking-[0.4em] uppercase text-pink-200/40 font-sans">
                    <p>Permission to rest.</p>
                    <p>Permission to feel.</p>
                    <p>Permission to be held.</p>
                  </motion.div>
                </div>
              </section>

              {/* 3. CUTE + FLIRTY RHYME */}
              <section className="min-h-screen flex flex-col items-center justify-center px-12 text-center bg-black/20 backdrop-blur-[1px]">
                <div className="max-w-xl space-y-24">
                   <div className="space-y-8">
                      <motion.p initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 2 }} viewport={{ once: true }} className="font-cursive text-3xl md:text-5xl leading-relaxed text-white">
                        “If I hug you tight, the world goes mute.”
                      </motion.p>
                      <motion.p initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 2, duration: 2 }} viewport={{ once: true }} className="font-cursive text-3xl md:text-5xl leading-relaxed text-white">
                        “If I hug you longer, time gets confused.”
                      </motion.p>
                   </div>
                   
                   <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 5, duration: 2 }} viewport={{ once: true }} className="p-10 border border-white/5 bg-white/5 rounded-[40px] space-y-6">
                      <p className="text-xs uppercase tracking-[0.5em] text-pink-200/50">Warning:</p>
                      <div className="space-y-2 text-xl md:text-2xl font-serif italic text-white/80">
                         <p>May cause sleepy smiles,</p>
                         <p>warm cheeks,</p>
                         <p>and zero personal space.</p>
                      </div>
                   </motion.div>
                </div>
              </section>

              {/* 4. CUDDLES & COMFORT */}
              <section className="min-h-screen flex flex-col items-center justify-center px-10 text-center">
                 <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2.5 }} viewport={{ once: true }} className="max-w-xl space-y-12">
                    <p className="font-serif italic text-2xl md:text-3xl leading-relaxed text-white/70">
                      “I don’t want a perfect hug.<br/>I want the messy one.”
                    </p>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2.5, duration: 2.5 }} viewport={{ once: true }} className="font-cursive text-4xl md:text-5xl text-white leading-relaxed">
                      “Where shoulders relax,<br/>breaths sync,<br/>and worries slowly fall asleep.”
                    </motion.p>
                 </motion.div>
              </section>

              {/* 5. ARTISTIC SKIN-TO-SKIN WARMTH */}
              <section className="min-h-screen flex flex-col items-center justify-center px-12 text-center bg-gradient-to-b from-transparent to-black/40">
                <div className="max-w-2xl space-y-12">
                  <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 2 }} viewport={{ once: true }} className="font-serif italic text-2xl md:text-3xl text-white/50">
                    “A hug where layers don’t matter.”
                  </motion.p>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2.5, duration: 2 }} viewport={{ once: true }} className="space-y-6 font-cursive text-4xl md:text-6xl text-white">
                    <p>Just warmth.</p>
                    <p>Heartbeat.</p>
                    <p>Shared heat.</p>
                  </motion.div>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 6, duration: 2.5 }} viewport={{ once: true }} className="font-serif italic text-xl md:text-2xl text-white/40 leading-relaxed">
                    “Two people, wrapped in trust, sharing the kind of warmth that blankets can’t give.”
                  </motion.p>
                </div>
              </section>

              {/* 6. INTERACTION AREA */}
              <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center relative">
                <AnimatePresence mode="wait">
                  {hugStep === 0 ? (
                    <motion.div key="invite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 1.5 }} className="space-y-16">
                      <p className="font-serif italic text-xl text-white/40 uppercase tracking-widest">Enter the circle</p>
                      <motion.button
                        onClick={() => setHugStep(1)}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-16 py-7 bg-white/5 border border-white/10 text-white rounded-full font-sans font-black tracking-[0.5em] text-[10px] uppercase transition-all shadow-2xl backdrop-blur-md"
                      >
                        Pull me closer 🫂
                      </motion.button>
                      
                      {/* Rotating Flirty Jokes */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                        className="h-10 flex items-center justify-center"
                      >
                         <p className="text-xs font-serif italic text-pink-200/30">
                           {["Hug duration may exceed recommended limits.", "Side effects include: attachment.", "Release not guaranteed."][Math.floor(Date.now() / 6000) % 3]}
                         </p>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div key="held" initial={{ opacity: 0, filter: 'blur(20px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 2.5 }} className="space-y-24 w-full max-w-2xl px-6 py-20">
                      <div className="space-y-10">
                        <p className="font-cursive text-4xl md:text-6xl text-white leading-tight">
                          “If you were here right now, I’d tuck you in, hold you gently, and stay…”
                        </p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 2.5 }} className="font-serif italic text-2xl md:text-3xl text-pink-200/60">
                          “…until your breathing slows and mine matches it.”
                        </motion.p>
                      </div>

                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7, duration: 2.5 }} className="space-y-20 pt-10">
                         <div className="space-y-8">
                            <p className="font-serif italic text-2xl md:text-3xl text-white/40 leading-relaxed">
                              “This hug isn’t about today.”
                            </p>
                            <p className="font-cursive text-4xl md:text-6xl text-white drop-shadow-sm">
                              “It’s about knowing there’s always a place you can come back to.”
                            </p>
                         </div>

                         <div className="space-y-10 pt-10">
                            <div className="space-y-4">
                              <p className="text-4xl md:text-5xl font-cursive text-white">Happy Hug Day, Kikiji.</p>
                              <div className="flex flex-col gap-2 text-xl tracking-[0.4em] uppercase text-pink-200/40 font-sans">
                                <p>Come as you are.</p>
                                <p>Stay as long as you want.</p>
                              </div>
                            </div>

                            <motion.button
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 12, duration: 1.5 }}
                              whileHover={{ scale: 1.05 }} onClick={onBack}
                              className="px-16 py-6 border border-white/10 rounded-full font-sans tracking-[0.5em] text-[10px] uppercase text-white/50 hover:bg-white/5 transition-all shadow-lg mt-10"
                            >
                              Continue the week 🤍
                            </motion.button>
                         </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            </div>
          </div>
        );
      case 7: // Kiss Day Redesign
        return (
          <div className="min-h-screen bg-[#050001] text-[#fff1e6] selection:bg-[#800020]/40 relative overflow-x-hidden">
            {/* Dark Sensual Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
               {/* Slow Breathing Wine Glow */}
               <motion.div 
                 animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
                 transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 bg-gradient-to-br from-[#1a0005] via-[#050001] to-[#200005]"
               />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.9)_100%)]" />
               
               {/* Extremely Subtle Floating Hearts */}
               {[...Array(6)].map((_, i) => (
                 <motion.div
                    key={i}
                    initial={{ y: '110vh', x: Math.random() * 100 + 'vw', opacity: 0 }}
                    animate={{ y: '-10vh', opacity: [0, 0.15, 0.15, 0] }}
                    transition={{ duration: Math.random() * 30 + 30, repeat: Infinity, delay: Math.random() * 10, ease: "linear" }}
                    className="absolute text-[#800020]"
                 >
                   💋
                 </motion.div>
               ))}
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
              {/* 1. OPENING */}
              <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
                <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 2.5 }} viewport={{ once: true }} className="space-y-10">
                  <h1 className="text-5xl md:text-8xl font-cursive text-[#f6c1cc] drop-shadow-[0_0_35px_rgba(246,193,204,0.25)]">Happy Kiss Day, Kikiji 💋</h1>
                  <p className="font-serif italic text-2xl text-pink-100/60 transition-opacity">“Don’t rush this one…”</p>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.2 }} transition={{ delay: 5 }} className="absolute bottom-12 animate-bounce">
                  <span className="text-[10px] uppercase tracking-[0.6em] text-white/20">Slowly Now</span>
                </motion.div>
              </section>

              {/* 2. INTRO */}
              <section className="min-h-screen flex flex-col items-center justify-center px-10 text-center">
                <div className="max-w-2xl space-y-16">
                   <div className="space-y-8">
                      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }} viewport={{ once: true }} className="font-serif italic text-3xl md:text-4xl text-white/80">
                        “Kisses aren’t innocent.”
                      </motion.p>
                      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2, duration: 2 }} viewport={{ once: true }} className="font-cursive text-4xl md:text-6xl text-white">
                        “They’re conversations spoken too close to be ignored.”
                      </motion.p>
                   </div>
                </div>
              </section>

              {/* 3. KISS JOURNEY */}
              <section className="min-h-screen flex flex-col items-center justify-center px-8 space-y-32 py-20 bg-black/10">
                <div className="max-w-xl w-full space-y-40">
                  {[
                    { label: "Forehead", text: "“A kiss on your forehead… because I care.”" },
                    { label: "Cheek", text: "“A kiss on your cheek… because you’re mine.”" },
                    { label: "Neck", text: "“A kiss on your neck… because I know it makes you quiet.”" },
                    { label: "Lips", text: "“A slow kiss on your lips… not to take, but to remind.”" },
                    { label: "Chest", text: "“A kiss where your heart beats… because I belong there.”" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 30 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 2.5, ease: "easeOut" }} 
                      viewport={{ once: true, margin: "-100px" }}
                      className="text-center space-y-4"
                    >
                      <span className="text-[10px] uppercase tracking-[0.5em] text-[#800020] font-bold">{item.label}</span>
                      <p className="font-serif italic text-2xl md:text-4xl text-white leading-relaxed">
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* 4. DARK HUMOUR + CONTROL */}
              <section className="min-h-screen flex flex-col items-center justify-center px-12 text-center relative overflow-hidden">
                <div className="max-w-2xl space-y-24">
                  {/* Rotating Humour */}
                  <div className="h-10">
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={jokeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.3, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs uppercase tracking-[0.4em] text-pink-100 italic"
                      >
                        • {jokes[jokeIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <div className="space-y-12">
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }} viewport={{ once: true }} className="font-serif italic text-3xl text-white/70">
                      “I don’t kiss to rush.”
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2, duration: 2 }} viewport={{ once: true }} className="font-serif italic text-3xl text-white/70">
                      “I kiss to pause time.”
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 4, duration: 2.5 }} viewport={{ once: true }} className="font-cursive text-4xl md:text-6xl text-[#f6c1cc] leading-tight">
                      “To make you forget what comes next… and focus on what’s happening now.”
                    </motion.p>
                  </div>
                </div>
              </section>

              {/* 5. INTERACTION */}
              <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center relative">
                <AnimatePresence mode="wait">
                  {kissStep === 0 ? (
                    <motion.div key="pull" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 1.5 }} className="space-y-16">
                      <p className="font-serif italic text-xl text-white/40 uppercase tracking-widest">Surrender the space</p>
                      <motion.button
                        onClick={() => setKissStep(1)}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(128, 0, 32, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-16 py-7 bg-white/5 border border-white/10 text-white rounded-full font-sans font-black tracking-[0.5em] text-[11px] uppercase transition-all shadow-2xl backdrop-blur-xl"
                      >
                        Don’t pull away 💋
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div key="kissed" initial={{ opacity: 0, filter: 'blur(20px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 2.5 }} className="space-y-28 w-full max-w-2xl px-6 py-20">
                      <div className="space-y-12">
                        <p className="font-cursive text-4xl md:text-6xl text-white leading-tight">
                          “If you were here, I’d kiss you slowly…”
                        </p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 2.5 }} className="font-serif italic text-2xl md:text-3xl text-pink-200/50">
                          “…until words feel unnecessary, and silence starts breathing.”
                        </motion.p>
                      </div>

                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7, duration: 2.5 }} className="space-y-20 pt-10">
                         <div className="space-y-8">
                            <p className="font-serif italic text-2xl md:text-3xl text-white/40 leading-relaxed">
                              “This isn’t about what happens after.”
                            </p>
                            <p className="font-cursive text-4xl md:text-6xl text-white drop-shadow-sm">
                              “It’s about the moment right before you forget everything else.”
                            </p>
                         </div>

                         <div className="space-y-10 pt-10">
                            <div className="space-y-6">
                              <p className="text-4xl md:text-5xl font-cursive text-white">Happy Kiss Day, Kikiji.</p>
                              <div className="flex flex-col gap-4 text-xl tracking-[0.4em] uppercase text-pink-200/40 font-sans">
                                <p>Some kisses don’t end.</p>
                                <p>They stay right where they started.</p>
                              </div>
                            </div>

                            <motion.button
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 12, duration: 1.5 }}
                              whileHover={{ scale: 1.05 }} onClick={onBack}
                              className="px-16 py-6 border border-white/10 rounded-full font-sans tracking-[0.5em] text-[10px] uppercase text-white/50 hover:bg-white/5 transition-all shadow-lg mt-10"
                            >
                              Continue the week 🖤
                            </motion.button>
                         </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="w-full h-[100dvh] overflow-y-auto scroll-smooth bg-[#0d0002] selection:bg-pink-500/20">
      <FallingPetals />
      <GrainOverlay />
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-br from-[#1a0005] via-black to-[#000000]"
        />
      </div>

      <div className="relative z-10">
        {renderContent()}

        {/* Closing Section common to days EXCEPT Rose, Chocolate, Teddy, Promise, Hug, Kiss if handled internally */}
        {dayId !== 1 && dayId !== 3 && dayId !== 4 && dayId !== 5 && dayId !== 6 && dayId !== 7 && (
          <section 
            className="min-h-screen flex flex-col items-center justify-center px-8 relative bg-black/40" 
            onViewportEnter={() => setHasFinished(true)}
          >
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 3 }} className="text-center z-10 space-y-12">
              <h3 className="text-5xl md:text-6xl font-cursive text-[#ffe4ec] italic">End of the ritual.</h3>
              <p className="text-pink-100/40 font-serif text-xl italic max-w-md mx-auto">Every day spent with you is a gift I never knew I deserved.</p>
            </motion.div>
            <AnimatePresence>
              {hasFinished && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="mt-20 z-20">
                  <button 
                    onClick={onBack} 
                    className="px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/20 text-pink-100 rounded-full font-sans tracking-[0.4em] text-[10px] uppercase backdrop-blur-md transition-all"
                  >
                    Return to Vault ❤️
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        )}
      </div>
    </div>
  );
};

export default DayView;
