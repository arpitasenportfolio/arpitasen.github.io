import React from 'react';
import { AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useDeviceTilt } from '../context/DeviceTiltContext';

export default function Banner() {
  const { needsPermission, requestPermission } = useDeviceTilt();

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full relative overflow-hidden bg-black/60 border-b border-neon-pink/40 backdrop-blur-xl py-3 px-4 flex items-center justify-center gap-3 z-50 sticky top-0 shadow-[0_4px_30px_rgba(255,0,127,0.2)]"
    >
      {/* Animated gradient scanline */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-neon-pink/20 to-transparent skew-x-12"
      />
      
      <div className="relative z-10 flex flex-wrap justify-center items-center gap-3 w-full max-w-5xl">
        <AlertCircle className="w-5 h-5 text-neon-pink animate-pulse shrink-0" />
        <div className="text-sm md:text-base font-medium tracking-wide flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center flex-1 justify-center">
          <span className="font-bold text-baby-pink uppercase text-glow tracking-widest">IMPORTANT UPDATE:</span>
          <span className="text-white/90 font-light">This is a temporary dummy text. Exciting things are coming soon!</span>
        </div>
        
        {needsPermission && (
          <button 
            onClick={requestPermission} 
            className="px-4 py-1.5 bg-neon-pink/20 border border-neon-pink text-white rounded-full text-xs font-bold hover:bg-neon-pink hover:shadow-[0_0_15px_rgba(255,0,127,0.5)] transition-all shrink-0 uppercase tracking-wider"
          >
            Enable 360°
          </button>
        )}
      </div>
    </motion.div>
  );
}
