import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface WelcomeScreenProps {
  onReady: () => void;
}

const WelcomeScreen = ({ onReady }: WelcomeScreenProps) => {
  const navigate = useNavigate();
  const [showIdleHint, setShowIdleHint] = useState(false);
  const archiveNumber = String(Math.floor(Math.random() * 9000) + 1000);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowIdleHint(true), 8000);
    const hide = setTimeout(() => setShowIdleHint(false), 12000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hide);
    };
  }, []);

  const stagger = (i: number) => ({ delay: 0.3 + i * 0.4, duration: 0.6 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center min-h-[80vh]"
    >
      <div className="glass glow-ring max-w-2xl w-full px-10 py-14 md:px-16 md:py-20 text-center">
        {/* Archive label */}
        <motion.p
          className="label-accent mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={stagger(0)}
        >
          ARCHIVE NO. {archiveNumber} &nbsp;·&nbsp; {today.toUpperCase()} &nbsp;·&nbsp; NEW YORK, EARTH
        </motion.p>

        <motion.div
          className="w-16 h-px bg-foreground/20 mx-auto mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={stagger(1)}
        />

        {/* Welcome */}
        <motion.h2
          className="font-display font-light text-4xl md:text-5xl text-cream mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(2)}
        >
          Welcome,<br />Future Builder.
        </motion.h2>

        {/* Body */}
        <motion.div
          className="font-body text-[17px] text-foreground/70 leading-relaxed space-y-4 mb-10 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(3)}
        >
          <p>You are about to do something that matters.</p>
          <p>
            Every civilization ever built began as an act of imagination.
            Someone looked at the world as it was — and chose to see it differently.
          </p>
          <p>
            In the next 60 seconds, you will make three choices.
            Those choices will seed a civilization that has never existed before.
          </p>
          <p>It will be yours. It will be real.</p>
        </motion.div>

        <motion.div
          className="w-16 h-px bg-foreground/20 mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={stagger(4)}
        />

        {/* Counter */}
        <motion.p
          className="font-mono text-xs tracking-wider text-teal-bright mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={stagger(5)}
        >
          1,247 CIVILIZATIONS BUILT SO FAR. YOURS WILL BE NEXT.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(6)}
        >
          <button className="btn-primary" onClick={onReady}>
            I'M READY TO BUILD →
          </button>
          <button className="btn-ghost" onClick={() => navigate("/archive")}>
            EXPLORE THE ARCHIVE
          </button>
        </motion.div>

        {/* Idle hint */}
        <AnimatePresence>
          {showIdleHint && (
            <motion.p
              className="font-mono text-xs italic text-foreground/30 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              Take your time. The future will wait.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;