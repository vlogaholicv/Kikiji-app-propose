
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onNext: () => void;
}

const Timeline: React.FC<Props> = ({ onNext }) => {
  const startDate = new Date('2024-11-01T00:00:00');
  const [timeSince, setTimeSince] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeSince({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timelineItems = [
    { label: "The First Hand Hold", date: "22nd Oct 2024", desc: "The world went quiet. Just your hand in mine, and a promise neither of us had spoken yet." },
    { label: "The Soul Feel", date: "23rd Oct 2024", desc: "It wasn't just a touch anymore. We felt each other's souls. Everything changed that night." },
    { label: "The Proposal & Firsts", date: "1st Nov 2024", desc: "The Diwali lights were bright, but nothing compared to us. The proposal, the first hug, and our first kiss." },
    { label: "Kikiji's Surprise", date: "10th Nov 2024", desc: "You showed me what true care looks like. A surprise that melted my heart forever." },
    { label: "The Beautiful Chaos", date: "Beyond Nov", desc: "Slowly, we fought. Slowly, we laughed. But most importantly, we loved through it all." },
    { label: "Our Growing Love", date: "Present", desc: "Through every argument and every silly joke, we built 'us'. And 'us' is my favorite thing to be." }
  ];

  return (
    <div className="timeline-container flex flex-col items-center py-20 h-full w-full bg-[#fff1e6] text-[#800020] overflow-y-auto overflow-x-hidden">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-5xl md:text-6xl font-cursive mb-10 text-center px-6"
      >
        Our Sacred Timeline
      </motion.h2>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        className="bg-white/60 backdrop-blur-sm border border-[#800020]/10 p-8 rounded-3xl shadow-lg mb-16 text-center max-w-lg w-full mx-6"
      >
        <p className="font-sans text-xs uppercase tracking-[0.3em] mb-4 text-[#800020]/60">Our Forever Clock</p>
        <div className="grid grid-cols-4 gap-4 text-[#800020]">
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{timeSince.days}</span>
            <span className="text-[10px] uppercase font-sans">Days</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{timeSince.hours}</span>
            <span className="text-[10px] uppercase font-sans">Hours</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{timeSince.minutes}</span>
            <span className="text-[10px] uppercase font-sans">Mins</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{timeSince.seconds}</span>
            <span className="text-[10px] uppercase font-sans">Secs</span>
          </div>
        </div>
      </motion.div>

      <div className="relative max-w-2xl w-full px-8 pb-10">
        <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[1px] bg-[#800020]/20" />

        <div className="space-y-16">
          {timelineItems.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col md:flex-row items-start md:items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} relative`}
            >
              <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-[#800020] rounded-full border-4 border-white z-10" />
              
              <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 text-left'}`}>
                <h3 className="text-2xl font-cursive leading-tight mb-1">{item.label}</h3>
                <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#800020]/50 mb-2">{item.date}</p>
                <p className="text-sm italic text-[#800020]/70 font-serif leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-16 mb-20 px-12 py-4 bg-[#800020] text-[#fff1e6] rounded-full font-sans tracking-widest text-xs uppercase shadow-xl transition-all"
      >
        One final whisper…
      </motion.button>
    </div>
  );
};

export default Timeline;
