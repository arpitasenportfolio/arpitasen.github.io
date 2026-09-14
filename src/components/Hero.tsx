import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Sparkles, Heart, Star } from 'lucide-react';
import { useDeviceTilt } from '../context/DeviceTiltContext';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const { tiltX, tiltY } = useDeviceTilt();

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(() => {
    return `${(mouseYSpring.get() * -30) + (tiltY.get() * -30)}deg`;
  });
  
  const rotateY = useTransform(() => {
    return `${(mouseXSpring.get() * 30) + (tiltX.get() * 30)}deg`;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="w-full pt-20 md:pt-32 flex flex-col items-center text-center perspective-1000 relative">
      
      {/* Floating Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Sparkles className="absolute top-[20%] left-[10%] w-6 h-6 text-baby-pink/60 animate-float" />
        <Heart className="absolute top-[40%] right-[15%] w-8 h-8 text-neon-pink/40 animate-float-delayed" />
        <Star className="absolute bottom-[20%] left-[20%] w-5 h-5 text-white/40 animate-float" />
      </div>

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        className="glass-intense rounded-3xl p-8 md:p-14 max-w-3xl w-full relative overflow-visible transform-3d hover:shadow-[0_0_60px_rgba(255,0,127,0.3)] transition-shadow duration-500 z-10"
      >
        {/* Decorative Glowing Borders */}
        <div className="absolute top-0 left-[10%] w-[80%] h-[2px] bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-70" />
        <div className="absolute bottom-0 left-[10%] w-[80%] h-[2px] bg-gradient-to-r from-transparent via-baby-pink to-transparent opacity-70" />
        <div className="absolute top-[10%] left-0 w-[2px] h-[80%] bg-gradient-to-b from-transparent via-neon-pink/30 to-transparent opacity-50" />
        <div className="absolute top-[10%] right-0 w-[2px] h-[80%] bg-gradient-to-b from-transparent via-baby-pink/30 to-transparent opacity-50" />
        
        {/* Profile Picture Placeholder */}
        <motion.div 
          style={{ translateZ: 60 }}
          className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 transform-3d"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        >
          <div className="absolute inset-0 rounded-full bg-neon-pink/40 blur-xl animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-pink to-baby-pink p-[3px] shadow-[0_0_30px_rgba(255,0,127,0.4)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400" 
                alt="Arpita Sen, famous model and beautiful Bengali girl. #bengaligirl #barbiearpita #arpitasen"
                title="Barbie Arpita - Arpita Sen"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </motion.div>

        <motion.h1 
          style={{ translateZ: 50 }}
          className="font-display text-5xl md:text-6xl lg:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-baby-pink to-white text-glow transform-3d"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          aria-label="Arpita Sen, Barbie Arpita, beautiful Bengali girl. #bengaligirl #barbiearpita #arpitasen"
        >
          Arpita Sen
          <span className="hero-subtitle block text-xl md:text-3xl mt-4 font-sans font-light tracking-[0.25em] text-white/90">
            In a World of My Own
          </span>
        </motion.h1>

        <motion.div 
          style={{ translateZ: 30 }}
          className="space-y-6 text-base md:text-lg lg:text-xl text-white/90 font-light leading-relaxed mb-12 transform-3d"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <p className="tracking-wide">
            <span className="hero-bio-line inline-block">This is official page of 🌸<strong className="text-baby-pink font-semibold">Arpita Sen</strong>🌸</span><br/>
            <span className="text-white/70 text-sm md:text-base mt-2 inline-block">Fictional Muse🎨 | Artist✌️ | Model✨ | Dancer💃🏼</span><br/>
            <span className="text-white/50 text-xs md:text-sm mt-1 inline-block">Previous id = [Arpita Sen] - This is the new 2nd Main official page</span>
          </p>
          <p className="italic text-baby-pink font-medium text-lg md:text-xl">
            A character, a dream, a little bit of imagination✨ 
          </p>
          <div className="relative inline-block mt-4">
            <div className="absolute -inset-2 bg-neon-pink/20 blur-xl rounded-full" />
            <p className="relative font-display text-2xl md:text-4xl text-neon-pink text-glow font-bold z-10">
              I'm a Barbie girl in my Barbie World🌎🎀 
            </p>
          </div>
        </motion.div>

        <motion.div
          style={{ translateZ: 40 }}
          className="inline-block glass rounded-2xl p-6 md:p-8 border border-baby-pink/40 relative group overflow-hidden transform-3d"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/10 to-baby-pink/10 rounded-2xl blur-md group-hover:from-neon-pink/20 group-hover:to-baby-pink/20 transition-all duration-500" />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="tagline-text">❤️TAKE LOVE SPREAD LOVE❤️</div>
            <div className="tagline-text">✨KEEP SHINING✨</div>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent my-3" />
            <p className="text-sm md:text-base text-white/90 font-medium italic">
              Thank You for your Beautiful Support 🥰🙏
            </p>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
