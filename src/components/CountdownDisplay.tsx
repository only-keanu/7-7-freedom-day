import React, { useEffect, useState, Children } from 'react';
import { motion } from 'framer-motion';
type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
const FONT_STYLE = {
  fontFamily: "'Montserrat', sans-serif"
};
const START_DATE = new Date('2025-04-28T00:00:00');
const TARGET_DATE = new Date('2029-04-28T00:00:00');
const START_MS = START_DATE.getTime();
const TARGET_MS = TARGET_DATE.getTime();
// Total days in the journey (accounts for leap year 2028)
const TOTAL_DAYS = Math.round((TARGET_MS - START_MS) / (1000 * 60 * 60 * 24));
export function CountdownDisplay() {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = TARGET_MS - now;
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(difference / (1000 * 60 * 60) % 24),
        minutes: Math.floor(difference / 1000 / 60 % 60),
        seconds: Math.floor(difference / 1000 % 60)
      };
    }
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  };
  const calculateProgress = () => {
    const now = new Date();
    // Calculate whole days elapsed since start
    const elapsedMs = now.getTime() - START_MS;
    const daysElapsed = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
    // Clamp between 0 and TOTAL_DAYS
    const clampedDays = Math.min(Math.max(daysElapsed, 0), TOTAL_DAYS);
    return clampedDays / TOTAL_DAYS * 100;
  };
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [progress, setProgress] = useState(calculateProgress());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      setProgress(calculateProgress());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const formatNumber = (num: number, minLength: number = 2) =>
  num.toString().padStart(minLength, '0');
  const daysElapsed = Math.min(
    Math.max(Math.floor((Date.now() - START_MS) / (1000 * 60 * 60 * 24)), 0),
    TOTAL_DAYS
  );
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50
      }
    }
  };
  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-12">
      {/* Countdown Digits */}
      <motion.div
        className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible">

        <TimeUnit
          value={formatNumber(timeLeft.days, 3)}
          label="Days"
          variants={itemVariants} />

        <Separator variants={itemVariants} />
        <TimeUnit
          value={formatNumber(timeLeft.hours)}
          label="Hours"
          variants={itemVariants} />

        <Separator variants={itemVariants} />
        <TimeUnit
          value={formatNumber(timeLeft.minutes)}
          label="Minutes"
          variants={itemVariants} />

        <Separator variants={itemVariants} />
        <TimeUnit
          value={formatNumber(timeLeft.seconds)}
          label="Seconds"
          variants={itemVariants} />

      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="w-full max-w-2xl px-4"
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 1.2,
          duration: 1
        }}>

        <div
          className="flex justify-between text-red-500 text-sm tracking-widest mb-2 opacity-80 font-bold"
          style={FONT_STYLE}>

          <span>Freedom Progress</span>
          <span>
            Day {daysElapsed} of {TOTAL_DAYS} — {progress.toFixed(2)}%
          </span>
        </div>

        <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-700 via-red-500 to-red-700"
            initial={{
              width: 0
            }}
            animate={{
              width: `${progress}%`
            }}
            transition={{
              duration: 1.5,
              ease: 'easeOut',
              delay: 1.5
            }}>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-red-400 blur-md" />
          </motion.div>
        </div>

        <div
          className="flex justify-between text-white/40 text-xs mt-2 font-bold"
          style={FONT_STYLE}>

          <span>2025</span>
          <span>2029</span>
        </div>
      </motion.div>
    </div>);

}
function TimeUnit({
  value,
  label,
  variants




}: {value: string;label: string;variants: any;}) {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      variants={variants}>

      <motion.div
        className="absolute inset-0 bg-red-600/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          zIndex: -1
        }} />

      <div className="relative z-10 flex flex-col items-center">
        <span
          className="text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-lg tracking-tight tabular-nums font-bold"
          style={FONT_STYLE}>

          {value}
        </span>
        <span
          className="mt-2 text-sm md:text-base tracking-widest uppercase text-red-500 opacity-80 font-bold"
          style={FONT_STYLE}>

          {label}
        </span>
      </div>
    </motion.div>);

}
function Separator({ variants }: {variants: any;}) {
  return (
    <motion.div
      className="hidden md:flex flex-col justify-center h-full pt-4"
      variants={variants}>

      <div className="w-1.5 h-1.5 rotate-45 bg-red-600/60" />
    </motion.div>);

}