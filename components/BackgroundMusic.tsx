
import React, { useEffect, useRef, useState } from 'react';
import { AppState } from '../types';

interface Props {
  active: boolean;
  currentPage: AppState;
}

const BackgroundMusic: React.FC<Props> = ({ active, currentPage }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const [currentVolume, setCurrentVolume] = useState(0);

  // Volume Hierarchy Mapping
  const getTargetVolume = (state: AppState) => {
    switch (state) {
      case AppState.LANDING: return 0.20;
      case AppState.JOURNEY: return 0.20;
      case AppState.WHISPERS: return 0.14;
      case AppState.INTERLUDE: return 0.12;
      case AppState.TIMELINE: return 0.18;
      case AppState.KIKI: return 0.14;
      case AppState.FINAL: return 0.08;
      default: return 0.20;
    }
  };

  const fadeTo = (target: number, duration: number = 2000) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const startVol = audioRef.current.volume;
    const steps = 20;
    const stepTime = duration / steps;
    const volStep = (target - startVol) / steps;
    let currentStep = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      if (audioRef.current) {
        currentStep++;
        const nextVol = Math.max(0, Math.min(1, startVol + volStep * currentStep));
        audioRef.current.volume = nextVol;
        setCurrentVolume(nextVol);

        if (currentStep >= steps) {
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        }
      }
    }, stepTime);
  };

  useEffect(() => {
    if (active && audioRef.current && audioRef.current.paused) {
      // Intimate cinematic track: slow piano with ambient pads
      audioRef.current.src = "https://www.chosic.com/wp-content/uploads/2021/07/Sweet-And-Serene.mp3";
      audioRef.current.volume = 0;
      audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
      fadeTo(getTargetVolume(currentPage), 4000); // Cinematic 4s fade-in during tunnel
    }
  }, [active]);

  useEffect(() => {
    if (active && audioRef.current) {
      fadeTo(getTargetVolume(currentPage), 2500);
    }
  }, [currentPage]);

  // Handle specialized intimate pauses (e.g. "Wrong" in Interlude, "Vows" in Final)
  useEffect(() => {
    const handleSilence = (e: any) => {
      const duration = e.detail?.duration || 1000;
      const targetVol = getTargetVolume(currentPage);
      
      // Dip to zero
      fadeTo(0, 300);
      
      // Resume after duration
      setTimeout(() => {
        fadeTo(targetVol, 1500);
      }, duration + 300);
    };

    window.addEventListener('app-audio-silence', handleSilence);
    return () => window.removeEventListener('app-audio-silence', handleSilence);
  }, [currentPage]);

  return (
    <audio
      ref={audioRef}
      loop
      className="hidden"
    />
  );
};

export default BackgroundMusic;
