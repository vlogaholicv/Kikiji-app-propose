
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppState } from './types';
import FloatingHearts from './components/FloatingHearts';
import GrainOverlay from './components/GrainOverlay';
import BackgroundMusic from './components/BackgroundMusic';
import IntroGate from './views/IntroGate';
import Landing from './views/Landing';
import ValentineHub from './views/ValentineHub';
import Final from './views/Final';
import FinalEnd from './views/FinalEnd';
import DayView from './views/DayView';
import Journey from './views/Journey';
import Whispers from './views/Whispers';
import Interlude from './views/Interlude';
import Timeline from './views/Timeline';
import Quiz from './views/Quiz';
import Kiki from './views/Kiki';
import Teaser from './views/Teaser';
import TeaseGate from './views/TeaseGate';

// Updated Propose Day (Day 2) Flow
const PROPOSE_DAY_FLOW = [
  AppState.WHISPERS,
  AppState.INTERLUDE,
  AppState.QUIZ,
  AppState.KIKI,
  AppState.PROPOSE_DAY 
];

const App: React.FC = () => {
  const UNLOCK_DATE = useMemo(() => new Date('2025-02-07T00:00:00'), []);

  const [isTestMode, setIsTestMode] = useState(() => {
    return localStorage.getItem('kiki_test_mode') === 'true';
  });

  const isUnlockedGlobally = useMemo(() => {
    if (isTestMode) return true;
    return new Date() >= UNLOCK_DATE;
  }, [UNLOCK_DATE, isTestMode]);

  const [hasVisited, setHasVisited] = useState(() => {
    return localStorage.getItem('kiki_has_visited') === 'true';
  });

  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    const stored = localStorage.getItem('kiki_completed_days');
    return stored ? JSON.parse(stored) : [];
  });

  const [currentPage, setCurrentPage] = useState<AppState>(() => {
    if (!isUnlockedGlobally) return AppState.TEASER;
    if (isTestMode) return AppState.INTRO;
    if (!hasVisited) return AppState.INTRO;
    return AppState.VALENTINE_HUB;
  });
  
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
  const [musicStarted, setMusicStarted] = useState(hasVisited || isTestMode); 
  const [loveChoice, setLoveChoice] = useState<string | null>(null);
  const [timeWarning, setTimeWarning] = useState(false);

  const titleTapCount = useRef(0);
  const lastTitleTap = useRef(0);

  const handleGlobalClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isHeading = ['H1', 'H2', 'H3'].includes(target.tagName);
    
    if (isHeading) {
      const now = Date.now();
      if (now - lastTitleTap.current < 500) {
        titleTapCount.current += 1;
        if (titleTapCount.current >= 3) {
          const nextMode = !isTestMode;
          setIsTestMode(nextMode);
          localStorage.setItem('kiki_test_mode', String(nextMode));
          titleTapCount.current = 0;
        }
      } else {
        titleTapCount.current = 1;
      }
      lastTitleTap.current = now;
    }
  };

  useEffect(() => {
    const now = new Date().getTime();
    const lastCheck = localStorage.getItem('kiki_last_time');
    
    if (lastCheck && !isTestMode) {
      const last = parseInt(lastCheck);
      const diff = now - last;
      if (diff < -60000) {
        setTimeWarning(true);
      }
    }
    localStorage.setItem('kiki_last_time', now.toString());
  }, [isTestMode]);

  const navigateTo = useCallback((page: AppState) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const markDayCompleted = useCallback((dayId: number) => {
    setCompletedDays(prev => {
      if (prev.includes(dayId)) return prev;
      const next = [...prev, dayId];
      localStorage.setItem('kiki_completed_days', JSON.stringify(next));
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    if (selectedDayId) {
      markDayCompleted(selectedDayId);
    }
    setCurrentPage(AppState.VALENTINE_HUB);
    setSelectedDayId(null);
    setLoveChoice(null);
  }, [selectedDayId, markDayCompleted]);

  const handleIntroComplete = useCallback(() => {
    navigateTo(AppState.TEASE_GATE);
  }, [navigateTo]);

  const handleTeaseGateComplete = useCallback(() => {
    if (!isTestMode) {
      localStorage.setItem('kiki_has_visited', 'true');
      setHasVisited(true);
    }
    navigateTo(AppState.VALENTINE_HUB);
  }, [navigateTo, isTestMode]);

  const handleNext = useCallback(() => {
    if (currentPage === AppState.INTRO) {
      handleIntroComplete();
      return;
    }

    const flowIndex = PROPOSE_DAY_FLOW.indexOf(currentPage);
    if (flowIndex !== -1 && flowIndex < PROPOSE_DAY_FLOW.length - 1) {
      navigateTo(PROPOSE_DAY_FLOW[flowIndex + 1]);
    } else {
      handleReset();
    }
  }, [currentPage, navigateTo, handleIntroComplete, handleReset]);

  const handleUnlockDay = (dayId: number) => {
    // Sequential validation
    const canUnlock = isTestMode || dayId === 1 || completedDays.includes(dayId - 1) || (dayId === 14 && completedDays.includes(7));
    
    if (!canUnlock) {
      return; // Safety guard
    }

    setSelectedDayId(dayId);
    if (dayId === 2) {
      navigateTo(AppState.WHISPERS);
    } else if (dayId === 14) {
      navigateTo(AppState.FINAL);
    } else {
      navigateTo(AppState.DAY_VIEW);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case AppState.TEASER:
        return <Teaser />;
      case AppState.INTRO:
        return <IntroGate onTransitionStart={() => setMusicStarted(true)} onComplete={handleIntroComplete} />;
      case AppState.TEASE_GATE:
        return <TeaseGate onComplete={handleTeaseGateComplete} isTestMode={isTestMode} />;
      case AppState.VALENTINE_HUB:
        return <ValentineHub onUnlock={handleUnlockDay} completedDays={completedDays} isTestMode={isTestMode} />;
      case AppState.DAY_VIEW:
        return <DayView dayId={selectedDayId || 1} onBack={handleReset} />;
      case AppState.PROPOSE_DAY:
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
        return <Final onReset={() => {
          markDayCompleted(14); // Mark final day completed
          navigateTo(AppState.FINAL_END);
        }} />;
      case AppState.FINAL_END:
        return <FinalEnd />;
      default:
        return <ValentineHub onUnlock={handleUnlockDay} completedDays={completedDays} isTestMode={isTestMode} />;
    }
  };

  const showDecorativeElements = currentPage !== AppState.INTRO && currentPage !== AppState.TEASER && currentPage !== AppState.TEASE_GATE;

  return (
    <div 
      onClick={handleGlobalClick}
      className={`relative w-full h-[100dvh] overflow-hidden font-serif selection:bg-pink-200 selection:text-wine-900 ${currentPage === AppState.INTRO || currentPage === AppState.TEASER || currentPage === AppState.TEASE_GATE ? 'bg-white' : 'bg-[#0d0002]'}`}
    >
      <BackgroundMusic active={musicStarted} currentPage={currentPage} />
      {showDecorativeElements && (
        <>
          <FloatingHearts />
          <GrainOverlay />
        </>
      )}

      {isTestMode && (
        <div className="fixed bottom-4 left-4 z-[11000] pointer-events-none">
          <span className="text-[10px] font-sans font-bold text-pink-500 tracking-[0.2em] uppercase opacity-40">
            TEST MODE
          </span>
        </div>
      )}

      {timeWarning && !isTestMode && (
        <div className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center p-8 text-center backdrop-blur-md">
           <div className="space-y-6">
              <p className="text-2xl font-cursive text-pink-100">Nice try 😄</p>
              <p className="text-pink-100/60 font-serif italic">Let’s enjoy this slowly. One day at a time.</p>
              <button onClick={() => setTimeWarning(false)} className="px-8 py-3 bg-white/10 rounded-full text-xs uppercase tracking-widest border border-white/20">Okay ❤️</button>
           </div>
        </div>
      )}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={currentPage === AppState.INTRO || currentPage === AppState.TEASER || currentPage === AppState.TEASE_GATE ? { opacity: 1 } : { opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={currentPage === AppState.INTRO || currentPage === AppState.TEASER || currentPage === AppState.TEASE_GATE ? { opacity: 1 } : { opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
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
