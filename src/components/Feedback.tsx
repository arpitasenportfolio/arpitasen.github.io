import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export default function Feedback() {
  // Placeholders for feedback screenshots
  const feedbacksRow1 = [
    { id: 1, src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600&h=400" },
    { id: 2, src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=600&h=400" },
    { id: 3, src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600&h=400" },
  ];
  
  const feedbacksRow2 = [
    { id: 4, src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=600&h=400" },
    { id: 5, src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600&h=400" },
    { id: 6, src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600&h=400" },
  ];

  return (
    <section className="w-full py-20 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-2xl md:text-4xl font-bold text-glow mb-4">
          Fantasy Ebook Feedback
        </h2>
        <h3 className="font-sans text-xl md:text-2xl text-baby-pink font-light tracking-widest uppercase">
          Your Beautiful Support
        </h3>
        <div className="flex justify-center gap-1 mt-6">
          {[1,2,3,4,5].map(i => (
            <Star key={i} className="w-5 h-5 text-neon-pink fill-neon-pink animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </motion.div>

      <div className="marquee-container">
        <div className="marquee-track-left mb-8">
          {[...feedbacksRow1, ...feedbacksRow1, ...feedbacksRow1].map((f, i) => (
            <div key={`row1-${i}`} className="w-[300px] md:w-[400px] shrink-0 glass-intense rounded-2xl p-2 md:p-3 hover:shadow-[0_0_30px_rgba(255,0,127,0.4)] transition-all duration-500 hover:-translate-y-2">
              <img 
                src={f.src} 
                alt="Arpita Sen, famous model and beautiful Bengali girl. #bengaligirl #barbiearpita #arpitasen"
                title="Barbie Arpita - Arpita Sen"
                className="w-full h-48 md:h-64 rounded-xl object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>

        <div className="marquee-track-right">
          {[...feedbacksRow2, ...feedbacksRow2, ...feedbacksRow2].map((f, i) => (
            <div key={`row2-${i}`} className="w-[300px] md:w-[400px] shrink-0 glass-intense rounded-2xl p-2 md:p-3 hover:shadow-[0_0_30px_rgba(255,0,127,0.4)] transition-all duration-500 hover:-translate-y-2">
              <img 
                src={f.src} 
                alt="Arpita Sen, famous model and beautiful Bengali girl. #bengaligirl #barbiearpita #arpitasen"
                title="Barbie Arpita - Arpita Sen"
                className="w-full h-48 md:h-64 rounded-xl object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="feedback-note">🌸🥰আগে যারা Ebook নিয়েছিলেন এগুলো তাদের Feedback🥰🌸</div>
    </section>
  );
}
