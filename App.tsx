
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppState } from './types';
import FloatingHearts from './components/FloatingHearts';
import GrainOverlay from './components/GrainOverlay';
import BackgroundMusic from './components/BackgroundMusic';
import IntroGate from './views/IntroGate';
import Landing from './views/Landing';
import Journey from './views/Journey';
import Whispers from './views/Whispers';
import Interlude from './views/Interlude';
import Timeline from './views/Timeline';
import Quiz from './views/Quiz';
import Kiki from './views/Kiki';
import Final from './views/Final';

const PAGE_ORDER = [
  AppState.INTRO,
  AppState.LANDING,
  AppState.JOURNEY,
  AppState.WHISPERS,
  AppState.INTERLUDE,
  AppState.TIMELINE,
  AppState.QUIZ,
  AppState.KIKI,
  AppState.FINAL
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>(AppState.INTRO);
  const [musicStarted, setMusicStarted] = useState(false);
  const [loveChoice, setLoveChoice] = useState<string | null>(null);
  const isTransitioning = useRef(false);

  const navigateTo = useCallback((page: AppState) => {
    setCurrentPage(page);
  }, []);

  const handleNext = useCallback(() => {
    const currentIndex = PAGE_ORDER.indexOf(currentPage);
    if (currentIndex < PAGE_ORDER.length - 1) {
      navigateTo(PAGE_ORDER[currentIndex + 1]);
    }
  }, [currentPage, navigateTo]);

  const handlePrev = useCallback(() => {
    const currentIndex = PAGE_ORDER.indexOf(currentPage);
    if (currentIndex > 0) {
      navigateTo(PAGE_ORDER[currentIndex - 1]);
    }
  }, [currentPage, navigateTo]);

  const handleReset = useCallback(() => {
    setCurrentPage(AppState.LANDING);
    setLoveChoice(null);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (currentPage === AppState.INTRO || currentPage === AppState.FINAL || currentPage === AppState.QUIZ || currentPage === AppState.INTERLUDE) return;

      if (currentPage === AppState.TIMELINE || currentPage === AppState.JOURNEY || currentPage === AppState.WHISPERS) {
        const scrollableEl = document.querySelector('.overflow-y-auto');
        if (scrollableEl) {
          const isAtBottom = scrollableEl.scrollHeight - scrollableEl.scrollTop <= scrollableEl.clientHeight + 1;
          const isAtTop = scrollableEl.scrollTop <= 0;
          if (e.deltaY > 0 && !isAtBottom) return;
          if (e.deltaY < 0 && !isAtTop) return;
        }
      }

      if (isTransitioning.current) return;

      if (Math.abs(e.deltaY) > 30) {
        isTransitioning.current = true;
        if (e.deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        setTimeout(() => {
          isTransitioning.current = false;
        }, 1200);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentPage, handleNext, handlePrev]);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (currentPage !== AppState.INTRO && !musicStarted) setMusicStarted(true);
    };
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [musicStarted, currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case AppState.INTRO:
        return <IntroGate onTransitionStart={() => setMusicStarted(true)} onComplete={handleNext} />;
      case AppState.LANDING:
        return <Landing onNext={handleNext} />;
      case AppState.JOURNEY:
        return <Journey onNext={handleNext} onSetChoice={setLoveChoice} choice={loveChoice} />;
      case AppState.WHISPERS:
        return <Whispers onNext={handleNext} />;
      case AppState.INTERLUDE:
        return <Interlude onNext={handleNext} />;
      case AppState.TIMELINE:
        return <Timeline onNext={handleNext} />;
      case AppState.QUIZ:
        return <Quiz onNext={handleNext} />;
      case AppState.KIKI:
        return <Kiki onNext={handleNext} loveChoice={loveChoice} />;
      case AppState.FINAL:
        return <Final onReset={handleReset} />;
      default:
        return <Landing onNext={handleNext} />;
    }
  };

  const showDecorativeElements = currentPage !== AppState.INTRO;

  return (
    <div className={`relative w-full h-[100dvh] overflow-hidden font-serif selection:bg-pink-200 selection:text-wine-900 ${currentPage === AppState.INTRO ? 'bg-white' : 'bg-[#0d0002]'}`}>
      <BackgroundMusic active={musicStarted} currentPage={currentPage} />
      {showDecorativeElements && (
        <>
          <FloatingHearts />
          <GrainOverlay />
        </>
      )}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={currentPage === AppState.INTRO ? { opacity: 1 } : { opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={currentPage === AppState.INTRO ? { opacity: 1 } : { opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
