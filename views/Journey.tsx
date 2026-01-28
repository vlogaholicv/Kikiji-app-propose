
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onNext: () => void;
  onSetChoice?: (choice: string) => void;
  choice?: string | null;
}

interface TimelineEntry {
  title: string;
  label?: string;
  text: string;
  date?: string;
}

const JOURNEY_DATA: TimelineEntry[] = [
  {
    label: "School Auto Days",
    title: "When we were just strangers",
    text: "We met in a school auto.\n\nNo expectations.\nNo curiosity.\nJust two strangers\nsharing the same ride.\n\nAt that time,\nwe were nothing to each other.\n\nAnd that’s how\nthe best stories usually begin."
  },
  {
    label: "Some Time Later",
    title: "From strangers to friends",
    text: "Slowly,\nconversations started.\n\nNothing special.\nNothing deep.\n\nJust normal talks.\nNormal laughs.\n\nSomewhere between daily rides,\nwe stopped being strangers.\n\nWe became friends."
  },
  {
    label: "A Little After That",
    title: "When you asked me something simple",
    text: "One day,\nyou looked at me and asked —\n\n‘Best friend banoge kya?’\n\nIt wasn’t dramatic.\nIt wasn’t romantic.\n\nBut it meant something.\n\nBecause from that moment,\nI wasn’t just someone in the auto anymore.\n\nI was your best friend."
  },
  {
    date: "12 October 2024",
    title: "Before anything had a name",
    text: "12th October, 2024.\n\nWe were just talking on Snap.\nNo expectations.\nNo labels.\n\nAnd then you typed something so simple…\nyet so heavy for my heart.\n\n‘Yeah… I kind of liked you from the beginning.’\n\nI read it more than once.\n\nBecause suddenly,\neverything I felt made sense.\n\nNothing was said out loud.\nBut that message…\nchanged everything."
  },
  {
    date: "Navratri, October 2024",
    title: "Care, even before love",
    text: "During Navratri,\nwhen my right hand was fractured\nand life slowed down for me…\n\nyou were worried about garba passes.\n\nTogether — with my Mimi —\nwe arranged them.\n\nYou came home to collect the passes.\nBefore leaving,\nyou took a marker\nand wrote your name —\n\n‘Kiki’\n\non my fracture plaster.\n\nI carried that\nmore carefully\nthan the fracture itself."
  },
  {
    date: "16–18 October 2024",
    title: "When things got uncomfortable",
    text: "Not every moment was easy.\n\nSome tested patience.\nSome tested courage.\nSome tested calm.\n\nThere was unnecessary noise.\nUnwanted tension.\n\nBut one thing was clear to me —\n\nI am not weak.\nI don’t let fear decide my place.\n\nI stood my ground.\nQuietly.\nConfidently.\n\nAnd when things tried to get messy…\nsilence returned.\n\nStronger than before."
  },
  {
    date: "22 October 2024",
    title: "The first nervous moment",
    text: "22nd October was awkward.\nNervous.\nNew.\n\nHands met…\nbut hearts were still racing.\n\nIt didn’t go perfectly.\n\nAnd that’s okay."
  },
  {
    date: "23 October 2024",
    title: "When it finally felt right",
    text: "23rd October.\n\nThis time,\nholding hands didn’t feel scary.\n\nIt felt natural.\nCalm.\nRight.\n\nLike something\nthat was always meant to happen."
  },
  {
    date: "29 October 2024",
    title: "Seeing you beyond texts",
    text: "29th October.\n\nThe first video call.\n\nNot perfect lighting.\nNot perfect words.\n\nJust real smiles\nand quiet excitement."
  },
  {
    date: "1 November 2024",
    title: "When feelings were finally spoken",
    text: "After Diwali,\nwhen the noise faded,\n\nI said what my heart was carrying.\n\nNot a perfect rose.\nBroken petals.\nHonest feelings.\n\nAnd you…\nchose me."
  },
  {
    date: "10 November 2024",
    title: "When you surprised me",
    text: "10th November.\n\nYou came with a bouquet,\na perfume set,\nand a surprise I never expected.\n\nAnd before leaving,\nyou gave me your hairband.\n\nI kept it with me for a long time.\n\nSome things don’t leave your pocket.\nThey stay in your heart."
  }
];

const Journey: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="w-full h-[100dvh] overflow-y-auto overflow-x-hidden bg-[#0d0002] selection:bg-pink-500/20 scroll-smooth">
      {/* Intimate Deep Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-b from-[#1a0005] via-black to-black"
        />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-[#800020] rounded-full blur-[160px] opacity-10" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h1 className="text-6xl md:text-8xl font-cursive text-[#f6c1cc] drop-shadow-2xl">
              Our Journey
            </h1>
            <div className="space-y-4">
              <p className="text-xl md:text-2xl font-serif italic text-pink-100/60 leading-relaxed">
                “From strangers…
              </p>
              <p className="text-xl md:text-2xl font-serif italic text-pink-100/60 leading-relaxed">
                to something we never planned,
              </p>
              <p className="text-2xl md:text-3xl font-serif italic text-pink-100/90 leading-relaxed">
                but chose.”
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            transition={{ delay: 2, duration: 2 }}
            className="absolute bottom-12 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-white">Scroll Down</span>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-px h-12 bg-white/40"
            />
          </motion.div>
        </section>

        {/* Timeline Body */}
        <div className="relative w-full max-w-2xl px-8 pb-40 space-y-64">
          {/* Vertical central line */}
          <div className="absolute left-[31px] md:left-1/2 top-20 bottom-0 w-px bg-white/5 pointer-events-none" />

          {JOURNEY_DATA.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-10%" }}
              className="relative w-full flex flex-col md:items-center"
            >
              {/* Dot on the timeline */}
              <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 top-0 w-3 h-3 rounded-full bg-pink-500/40 border border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.3)] z-20" />
              
              <div className={`pl-12 md:pl-0 md:w-full flex flex-col ${i % 2 === 0 ? 'md:items-end md:pr-16' : 'md:items-start md:pl-16'}`}>
                {/* Meta Labels */}
                <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-pink-200/30 mb-4 block">
                  {entry.date || entry.label}
                </span>

                {/* Title */}
                <h3 className={`text-3xl md:text-4xl font-cursive text-pink-50 mb-8 leading-snug drop-shadow-sm ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  {entry.title}
                </h3>

                {/* Content Box */}
                <div className={`max-w-md w-full p-8 md:p-10 rounded-[32px] bg-white/5 border border-white/5 backdrop-blur-sm shadow-2xl ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <p className="text-lg md:text-xl font-serif italic text-pink-100/70 leading-relaxed whitespace-pre-line">
                    {entry.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Ending Note */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 3 }}
            viewport={{ once: true }}
            className="pt-40 flex flex-col items-center text-center space-y-20"
          >
            <div className="w-12 h-px bg-white/10" />
            <p className="text-2xl md:text-4xl font-cursive text-[#f6c1cc] leading-relaxed italic max-w-lg px-4">
              “And this is not the end of our journey.<br/>It’s just the part<br/>we chose to remember today.”
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-14 py-6 bg-[#f6c1cc] text-[#800020] rounded-full font-sans font-black tracking-[0.4em] text-[10px] uppercase shadow-2xl shadow-pink-500/10 transition-all"
            >
              Continue the Story ❤️
            </motion.button>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Journey;
