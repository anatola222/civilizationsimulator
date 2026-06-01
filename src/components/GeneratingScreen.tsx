import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Opening a rift in spacetime...",
  "Seeding your world's first light...",
  "Calibrating founding myths...",
  "Naming the rivers and the gods...",
  "Your civilization is awakening...",
  "The portal is almost ready...",
];

const GeneratingScreen = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const duration = 20000;
    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / duration, 1));
      if (elapsed < duration) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center gap-12 text-center min-h-[60vh]"
    >
      {/* Dark sphere with glow */}
      <motion.div
        className="relative w-52 h-52 md:w-72 md:h-72 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          background: "radial-gradient(circle at 40% 40%, hsl(220, 52%, 12%), hsl(207, 75%, 4%))",
          boxShadow: `
            0 0 0 1px rgba(29,158,117,0.3),
            0 0 40px rgba(29,158,117,0.2),
            0 0 80px rgba(29,158,117,0.1),
            0 0 160px rgba(74,59,140,0.15),
            inset 0 0 60px rgba(0,0,0,0.8)
          `,
        }}
      >
        <div className="absolute inset-3 rounded-full animate-shimmer" />
      </motion.div>

      {/* Progress dots */}
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-700"
            style={{
              backgroundColor: progress > (i + 1) / 3
                ? "hsl(158, 68%, 37%)"
                : "rgba(255,255,255,0.15)",
              boxShadow: progress > (i + 1) / 3
                ? "0 0 10px rgba(29,158,117,0.5)"
                : "none",
            }}
          />
        ))}
      </div>

      {/* Cycling message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={msgIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="font-display font-light text-2xl md:text-3xl text-cream/80"
        >
          {messages[msgIndex]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

export default GeneratingScreen;