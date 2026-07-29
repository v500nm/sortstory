"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroAnimation() {
  const [array, setArray] = useState([7, 2, 9, 4, 8, 1, 5, 3, 6]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setArray((prev) => {
        let sorted = true;
        const next = [...prev];
        for (let i = 0; i < next.length - 1; i++) {
          if (next[i] > next[i + 1]) {
            const temp = next[i];
            next[i] = next[i + 1];
            next[i + 1] = temp;
            sorted = false;
            break; // Do one swap per interval
          }
        }
        if (sorted) {
          // Re-shuffle to start over
          return [7, 2, 9, 4, 8, 1, 5, 3, 6].sort(() => Math.random() - 0.5);
        }
        return next;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-[350px] lg:min-h-[450px] bg-brand-bg-card/50 backdrop-blur-sm border border-brand-border rounded-2xl p-6 flex flex-col justify-end gap-2 relative shadow-2xl overflow-hidden">
      <div className="absolute top-4 left-5 flex gap-2">
         <div className="w-3 h-3 rounded-full bg-brand-border/60"></div>
         <div className="w-3 h-3 rounded-full bg-brand-border/60"></div>
         <div className="w-3 h-3 rounded-full bg-brand-border/60"></div>
      </div>
      <div className="flex-1 w-full flex items-end justify-center gap-3 pt-10 px-2 sm:px-6">
        {array.map((value) => (
          <motion.div
            key={value}
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-full max-w-[48px] rounded-t-md bg-brand-text-secondary/40"
            style={{ height: `${value * 10}%` }}
          />
        ))}
      </div>
    </div>
  );
}
