import React, { useState } from 'react';
import { motion, AnimatePresence, useTransform } from 'motion/react';
import { useDeviceTilt } from '../context/DeviceTiltContext';

const CATEGORIES = [
  "All",
  "Model Look",
  "Casual Look",
  "Daily Life",
  "Traditional look",
  "desi look",
  "Dog lover",
  "Aesthetic",
  "Bold"
];

// Placeholder data for the gallery. 
// USER: Replace the 'src' values below with your actual image paths.
const INITIAL_ITEMS = [
  { id: 1, category: "Model Look", src: "[https://i.postimg.cc/FKKyB0Zv/IMG-20260914-154806-542.jpg](https://i.postimg.cc/FKKyB0Zv/IMG-20260914-154806-542.jpg)" }](https://i.postimg.cc/FKKyB0Zv/IMG-20260914-154806-542.jpg)"", alt: "Model Look 1", initialLikes: 1245 },
  { id: 2, category: "Casual Look", src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600&h=800", alt: "Casual Look 1", initialLikes: 843 },
  { id: 3, category: "Daily Life", src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600&h=800", alt: "Daily Life 1", initialLikes: 3400 },
  { id: 4, category: "Traditional look", src: "https://images.unsplash.com/photo-1510130387422-82ebd4faee47?auto=format&fit=crop&q=80&w=600&h=800", alt: "Traditional look 1", initialLikes: 2100 },
  { id: 5, category: "desi look", src: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=600&h=800", alt: "desi look 1", initialLikes: 980 },
  { id: 6, category: "Dog lover", src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600&h=800", alt: "Dog lover 1", initialLikes: 567 },
  { id: 7, category: "Aesthetic", src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600&h=800", alt: "Aesthetic 1", initialLikes: 4200 },
  { id: 8, category: "Bold", src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600&h=800", alt: "Bold 1", initialLikes: 1100 },
  { id: 9, category: "Model Look", src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=600&h=800", alt: "Model Look 2", initialLikes: 1530 },
];

function GalleryCard({ item, rotateX, rotateY, onImageClick }: any) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(item.initialLikes);
  const [showBigHeart, setShowBigHeart] = useState(false);
  
  const lastClickTime = React.useRef(0);
  const clickTimeout = React.useRef<NodeJS.Timeout | null>(null);
  
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  const handleCustomClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const currentTime = new Date().getTime();
    const timeSinceLastClick = currentTime - lastClickTime.current;

    if (timeSinceLastClick < 400 && timeSinceLastClick > 0) {
      // Double tap detected
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
        clickTimeout.current = null;
      }
      lastClickTime.current = 0; // reset
      
      // Execute Giant Glowing Heart pop-up animation and Like increment
      setShowBigHeart(true);
      if (!liked) {
        setLiked(true);
        setLikes((prev: number) => prev + 1);
      }
      setTimeout(() => {
        setShowBigHeart(false);
      }, 1000);
    } else {
      // First tap
      lastClickTime.current = currentTime;
      clickTimeout.current = setTimeout(() => {
        // Single tap confirmed -> Open Lightbox
        onImageClick(item);
        clickTimeout.current = null;
        lastClickTime.current = 0;
      }, 400);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!liked) {
      setLiked(true);
      setLikes((prev: number) => prev + 1);
    } else {
      setLiked(false);
      setLikes((prev: number) => prev - 1);
    }
  };

  const formatLikes = (num: number) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num.toString();
  };

  return (
    <div
      className="break-inside-avoid perspective-1000"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.05, z: 50 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="transform-3d"
      >
        <div 
          ref={cardRef}
          className="gallery-item group" 
          onClick={handleCustomClick}
          style={{ position: 'relative', overflow: 'hidden', borderRadius: '15px', marginBottom: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay pointer-events-none" />
            
            <img 
              src={item.src} 
              alt="Arpita Sen, famous model and beautiful Bengali girl. #bengaligirl #barbiearpita #arpitasen"
              title="Barbie Arpita - Arpita Sen"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '15px' }} 
              className="transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            {/* Giant Animated Center Heart */}
            {showBigHeart && (
              <i className="fa-solid fa-heart giant-heart"></i>
            )}
            
            {/* Sleek Floating Like Count */}
            <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg">
                <div onClick={handleLike} className="cursor-pointer hover:scale-110 transition-transform">
                    <i className="fa-solid fa-heart" style={{ 
                        color: liked ? '#ff1493' : 'rgba(255,255,255,0.9)', 
                        fontSize: '1rem', 
                        transition: 'all 0.3s ease',
                        filter: liked ? 'drop-shadow(0 0 8px #ff1493)' : 'none'
                    }}></i>
                </div>
                <span style={{ fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: '0.85rem', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    {formatLikes(likes)}
                </span>
            </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  
  const { tiltX, tiltY } = useDeviceTilt();
  const rotateX = useTransform(tiltY, [-1, 1], ["-15deg", "15deg"]);
  const rotateY = useTransform(tiltX, [-1, 1], ["15deg", "-15deg"]);

  const filteredItems = activeTab === "All" 
    ? INITIAL_ITEMS 
    : INITIAL_ITEMS.filter(item => item.category === activeTab);

  return (
    <section className="w-full flex flex-col items-center">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-5xl font-bold mb-10 text-center text-glow"
      >
        Shades of Me
      </motion.h2>

      {/* Filter Tabs */}
      <div className="filter-btn-container mb-12 max-w-5xl relative z-10 mx-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`premium-filter-btn ${activeTab === cat ? 'active' : ''}`}
            aria-label={cat === 'All' 
              ? "View all photos of Bengali girl Barbie Arpita. #bengaligirl #barbiearpita #arpitasen" 
              : `View Arpita Sen ${cat} gallery. #bengaligirl #barbiearpita #arpitasen`}
          >
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>
      
      {/* Double Tap Hint */}
      <motion.div 
        animate={{ y: [0, -6, 0] }} 
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8 px-5 py-2 rounded-full glass border border-neon-pink/30 shadow-[0_0_15px_rgba(255,0,127,0.2)] text-white/90 text-xs md:text-sm font-medium tracking-wide flex items-center justify-center gap-2 mx-auto w-max relative z-10"
      >
        Double tap to like <i className="fa-solid fa-heart text-neon-pink drop-shadow-[0_0_5px_rgba(255,0,127,0.8)] animate-pulse"></i>
      </motion.div>

      {/* Masonry Grid Simulation */}
      <div className="gallery-container columns-2 lg:columns-3 gap-[15px] w-full p-[10px]">
        {filteredItems.map((item) => (
          <GalleryCard 
            key={item.id} 
            item={item} 
            rotateX={rotateX} 
            rotateY={rotateY} 
            onImageClick={setSelectedImage}
          />
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="absolute top-6 right-6 cursor-pointer z-50 text-white/80 hover:text-white hover:scale-110 transition-all">
              <i className="fa-solid fa-xmark text-3xl"></i>
            </div>
            <motion.img
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage.src}
              alt="Arpita Sen, famous model and beautiful Bengali girl. #bengaligirl #barbiearpita #arpitasen"
              title="Barbie Arpita - Arpita Sen"
              className="max-w-full max-h-[90vh] rounded-2xl shadow-[0_0_40px_rgba(255,20,147,0.3)] border border-white/10 object-contain"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
