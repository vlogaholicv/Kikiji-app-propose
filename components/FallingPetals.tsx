
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FallingPetals: React.FC = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 12 + 8,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: Math.random() * 15 + 15, // Slower fall
      rotation: Math.random() * 360,
      swing: Math.random() * 60 - 30,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ 
            top: '-10%', 
            left: petal.left, 
            opacity: 0, 
            rotate: petal.rotation 
          }}
          animate={{
            top: '110%',
            opacity: [0, 0.4, 0.4, 0],
            rotate: petal.rotation + 360,
            x: [0, petal.swing, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: 'linear',
          }}
          className="absolute text-[#5a0018]/30"
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12,2C12,2 4,6 4,12C4,18 12,22 12,22C12,22 20,18 20,12C20,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FallingPetals;
