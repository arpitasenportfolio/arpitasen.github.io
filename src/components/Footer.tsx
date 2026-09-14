import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="w-full bg-black/80 backdrop-blur-xl border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 mt-auto z-20 relative">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-intense border-neon-pink/40 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(255,0,127,0.2)] transition-shadow duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-neon-pink" />
              <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-widest text-baby-pink">
                Disclosure and Warning
              </h3>
              <ShieldAlert className="w-6 h-6 text-neon-pink" />
            </div>
            
            <p className="font-sans text-sm md:text-base text-white/90 leading-relaxed max-w-3xl">
              Due to high message volumes (like spamming flirting message😅🤷‍♀️), my Facebook and Instagram profiles are fully AGI-backed. A BOT handles replies but will not respond to unnecessary messages. Please avoid messaging without reason. Strictly NO abusive language or spamming—violators will be directly blocked by the BOT.
            </p>
          </div>
        </motion.div>

        <p className="mt-8 text-xs text-white/30 font-sans tracking-widest uppercase">
          © {new Date().getFullYear()} Arpita Sen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
