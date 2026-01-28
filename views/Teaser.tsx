
import React from 'react';

const Teaser: React.FC = () => {
  const targetDate = new Date('2025-02-07T00:00:00');
  const now = new Date();
  
  // Calculate remaining days
  const diffTime = targetDate.getTime() - now.getTime();
  const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-8 text-center select-none cursor-default z-[9999]">
      <div className="max-w-md space-y-8 font-sans">
        <p className="text-gray-800 text-lg tracking-tight leading-relaxed">
          Something is cooking inside.
        </p>
        <p className="text-gray-800 text-lg tracking-tight leading-relaxed">
          It’s not ready yet.
        </p>
        <p className="text-gray-800 text-lg tracking-tight leading-relaxed">
          Come back after <span className="font-bold">{remainingDays > 0 ? remainingDays : 1} days</span>.
        </p>
        <p className="text-gray-800 text-lg tracking-tight leading-relaxed">
          Trust me… <br /> it will be worth the wait.
        </p>
      </div>
    </div>
  );
};

export default Teaser;
