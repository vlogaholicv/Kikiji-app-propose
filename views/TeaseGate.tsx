
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
  isTestMode?: boolean;
}

const TeaseGate: React.FC<Props> = ({ onComplete, isTestMode }) => {
  const [showPatienceMsg, setShowPatienceMsg] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  // Sequence states
  const tapCountRef = useRef(0);
  const firstTapTimeRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const CORRECT_PASSWORD = "kikiji_forever";
  const TAP_LIMIT = 7;
  const TIME_LIMIT_MS = 5000;

  const handleCornerTap = () => {
    const now = Date.now();
    
    // Initialize or check timeout
    if (tapCountRef.current === 0 || (firstTapTimeRef.current && now - firstTapTimeRef.current > TIME_LIMIT_MS)) {
      tapCountRef.current = 1;
      firstTapTimeRef.current = now;
    } else {
      tapCountRef.current += 1;
    }

    if (tapCountRef.current >= TAP_LIMIT) {
      // Sequence completed - Open hidden input
      if (inputRef.current) {
        inputRef.current.focus();
      }
      // Reset tap counter for security
      tapCountRef.current = 0;
      firstTapTimeRef.current = null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation logic for hidden submission
    if (inputValue === CORRECT_PASSWORD || isTestMode) {
      onComplete();
    } else {
      setInputValue('');
      if (inputRef.current) {
        inputRef.current.blur();
      }
      tapCountRef.current = 0;
      firstTapTimeRef.current = null;
    }
  };

  const handleWaitClick = () => {
    setShowPatienceMsg(true);
  };

  return (
    <div className="fixed inset-0 bg-[#fcfcfc] z-[10000] flex flex-col items-center justify-center p-8 text-center select-none overflow-y-auto cursor-default">
      {/* INVISIBLE TRIGGER: Top Right Corner (7 Taps) */}
      <div 
        onClick={handleCornerTap}
        className="fixed top-0 right-0 w-40 h-40 bg-transparent z-[10005]"
        style={{ touchAction: 'manipulation' }}
      />

      {/* HIDDEN FORM FOR UNLOCK */}
      <form 
        onSubmit={handleSubmit}
        className="absolute opacity-0 pointer-events-none"
        style={{ width: 1, height: 1, left: -100, top: -100 }}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck="false"
          enterKeyHint="done"
        />
        <button type="submit" tabIndex={-1} />
      </form>

      <AnimatePresence mode="wait">
        {!showPatienceMsg ? (
          <motion.div
            key="error-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-md w-full space-y-12"
          >
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-gray-900 text-3xl font-sans font-bold tracking-tight">
                🚫 ERROR: <br />
                No Patience Detected.
              </h1>
              <div className="space-y-1">
                <p className="text-gray-500 text-lg font-sans">
                  Looks like you came a little too early...
                </p>
                <p className="text-gray-400 text-sm font-sans italic">
                  This is not the correct time to see this.
                </p>
              </div>
            </div>

            {/* Teasing Rule Section */}
            <div className="space-y-6">
              <p className="text-gray-700 font-sans font-medium text-base">
                You have two options now 😌
              </p>

              <div className="space-y-4">
                {/* Option 1 */}
                <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                  <p className="text-gray-800 text-sm font-sans leading-relaxed">
                    <span className="font-bold block mb-1">Option 1:</span>
                    Wait like a good baby 🧸 <br />
                    and come back at the right time.
                  </p>
                </div>

                {/* Option 2 */}
                <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                  <p className="text-gray-800 text-sm font-sans leading-relaxed">
                    <span className="font-bold block mb-1">Option 2:</span>
                    Get early access… <br />
                    <span className="text-gray-500 text-xs">
                      By sending snaps 📸 or using the <span className="italic text-wine-600 font-medium">*stairs*</span> route 😏
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="space-y-1">
              <p className="text-gray-400 text-xs font-sans italic">
                No kasam applies here.
              </p>
              <p className="text-gray-400 text-xs font-sans">
                Rules are flexible... <br />
                but patience is appreciated.
              </p>
            </div>

            {/* Button */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWaitClick}
                className="px-10 py-4 bg-gray-50 border border-gray-200 rounded-full text-gray-500 font-sans text-xs tracking-widest uppercase hover:bg-gray-100 transition-colors"
              >
                Okay, I’ll wait 😇
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="patience-confirmation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🧸</span>
            </div>
            <h2 className="text-gray-900 text-xl font-sans font-medium leading-relaxed">
              Good choice. <br />
              <span className="text-gray-500">Waiting looks cute on you.</span>
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeaseGate;
