
"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

const INITIAL_ITEMS = [
  { id: 1, category: "Model Look", src: "https://i.postimg.cc/FKKyB0Zv/IMG-20260914-154806-542.jpg", alt: "Model Look" },
  { id: 2, category: "Casual Look", src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600&h=800", alt: "Casual Look" },
  { id: 3, category: "Daily Life", src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600&h=800", alt: "Daily Life" },
  { id: 4, category: "Traditional look", src: "https://images.unsplash.com/photo-1510130387422-82ebd4faee47?auto=format&fit=crop&q=80&w=600&h=800", alt: "Traditional look" },
  { id: 5, category: "desi look", src: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=600&h=800", alt: "desi look" },
  { id: 6, category: "Dog lover", src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600&h=800", alt: "Dog lover" },
  { id: 7, category: "Aesthetic", src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600&h=800", alt: "Aesthetic" },
  { id: 8, category: "Bold", src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600&h=800", alt: "Bold" },
  { id: 9, category: "Model Look", src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=600&h=800", alt: "Model Look" }
];

function GalleryCard({ item, rotateX, rotateY, onImageClick }: any) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(item.initialLikes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl cursor-pointer",
        "transform-gpu transition-all duration-300 ease-out",
        "hover:shadow-2xl hover:scale-[1.02]",
        item.featured ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      onClick={() => onImageClick(item)}
    >
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
      
      <div className="relative w-full h-full min-h-[300px]">
        {item.type === 'video' ? (
          <>
            <video
              src={item.src}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              playsInline
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
            </div>
          </>
        ) : (
          <Image
            src={item.src}
            alt={item.title || item.category}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-white/90 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
          {item.category}
        </span>
        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [items] = useState(INITIAL_ITEMS);
  const [filter, setFilter] = useState("All");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const categories = ["All", ...Array.from(new Set(items.map(item => item.category)))];
  const filteredItems = filter === "All" ? items : items.filter(item => item.category === filter);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section className="py-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16 space-y-8">
          <div className="inline-flex flex-wrap justify-center gap-3 p-2 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  filter === category
                    ? "bg-white text-black shadow-lg shadow-white/20 scale-105"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]"
          onMouseMove={handleMouseMove}
        >
          {filteredItems.map((item, index) => {
            const rotateX = (mousePos.y - 50) * -0.1;
            const rotateY = (mousePos.x - 50) * 0.1;

            return (
              <GalleryCard
                key={`${item.id}-${index}`}
                item={item}
                rotateX={rotateX}
                rotateY={rotateY}
                onImageClick={() => {}}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
