import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Feedback from './components/Feedback';
import Footer from './components/Footer';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useDeviceTilt } from './context/DeviceTiltContext';

export default function App() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  const { tiltX, tiltY } = useDeviceTilt();
  const bgX = useTransform(tiltX, [-1, 1], ['-30px', '30px']);
  const bgY = useTransform(tiltY, [-1, 1], ['-30px', '30px']);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black font-sans text-white overflow-hidden relative selection:bg-neon-pink selection:text-white">
      {/* Premium Loading Splash Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, type: "spring" }}
              className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-baby-pink drop-shadow-[0_0_20px_rgba(255,20,147,0.8)] flex items-center gap-4"
            >
              <i className="fa-solid fa-heart beating-heart"></i>
              Arpita Sen
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parallax Background Glows */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-neon-pink/20 blur-[120px] mix-blend-screen" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-baby-pink/15 blur-[150px] mix-blend-screen" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] left-[50%] w-[40vw] h-[40vw] rounded-full bg-purple-500/10 blur-[120px] mix-blend-screen" 
          />
        </motion.div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <Banner />
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24 pb-32">
          <Hero />
          <Gallery />
          <Feedback />
        </main>
        <Footer />
      </div>
    </div>
  );
}
