import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
type Heart = {
  id: number;
  left: number;
  scale: number;
  duration: number;
  delay: number;
  xOffset: number;
};
export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  useEffect(() => {
    // Generate static hearts on mount to avoid hydration mismatches
    const newHearts: Heart[] = Array.from({
      length: 20
    }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      scale: 0.5 + Math.random() * 0.8,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 10,
      xOffset: (Math.random() - 0.5) * 50 // -25px to 25px sway
    }));
    setHearts(newHearts);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) =>
      <motion.div
        key={heart.id}
        className="absolute bottom-[-50px] text-red-500/20"
        initial={{
          y: '100vh',
          x: 0,
          opacity: 0
        }}
        animate={{
          y: -150,
          x: heart.xOffset,
          opacity: [0, 0.3, 0.3, 0]
        }}
        transition={{
          duration: heart.duration,
          repeat: Infinity,
          delay: heart.delay,
          ease: 'linear',
          opacity: {
            duration: heart.duration,
            times: [0, 0.1, 0.8, 1]
          }
        }}
        style={{
          left: `${heart.left}%`,
          fontSize: `${heart.scale * 2}rem`
        }}>

          ♥
        </motion.div>
      )}
    </div>);

}