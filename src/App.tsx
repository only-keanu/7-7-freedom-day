import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FloatingHearts } from './components/FloatingHearts';
import { CountdownDisplay } from './components/CountdownDisplay';
export function App() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Background Gradient - Deep Black with Red */}
      <div
        className="absolute inset-0 z-[-2]"
        style={{
          background: `
            black
          `
        }} />


      {/* Overlay for texture/softness */}
      <div className="absolute inset-0 bg-black/10 z-[-1]" />

      {/* Floating Particles */}
      <FloatingHearts />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1.5,
            ease: 'easeOut'
          }}
          className="space-y-4">

          <h1
            className="text-5xl md:text-7xl text-white drop-shadow-md font-bold"
            style={{
              fontFamily: "'Montserrat', sans-serif"
            }}>

            <span className={"text-red-800"}>7-7</span> <span>Freedom Day</span>
          </h1>

          <div className="flex flex-col items-center space-y-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-60" />
            <p
              className="text-red-500 tracking-widest text-sm md:text-base uppercase opacity-90 font-bold"
              style={{
                fontFamily: "'Montserrat', sans-serif"
              }}>

              April 28, 2025 — April 28, 2029
            </p>
          </div>
        </motion.div>

        {/* Countdown */}
        <CountdownDisplay />

        {/* Love Note */}
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 1.5,
            duration: 1.5
          }}
          className="max-w-lg mx-auto mt-8">

          <p
            className="text-lg md:text-2xl text-white/90 leading-relaxed font-bold"
            style={{
              fontFamily: "'Montserrat', sans-serif"
            }}>

            "Malayo na pero malayo pa rin, kapit lang kapatid, lapit na rin :')."
          </p>
          <div className="mt-6 text-red-600/60 text-xl">✦</div>
        </motion.div>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </main>);

}