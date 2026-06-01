import { motion, AnimatePresence } from "framer-motion";
import { prompts } from "@/lib/civilizations";

interface PromptScreenProps {
  step: number;
  selections: string[];
  onSelect: (value: string) => void;
}

const stepLabels = [
  "QUESTION 01 OF 03  ·  WHERE",
  "QUESTION 02 OF 03  ·  ENERGY",
  "QUESTION 03 OF 03  ·  VALUES",
];

const PromptScreen = ({ step, selections, onSelect }: PromptScreenProps) => {
  const prompt = prompts[step];
  if (!prompt) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Step label */}
        <p className="label-accent mb-8">{stepLabels[step]}</p>

        {/* Question */}
        <h2 className="font-display font-light text-4xl md:text-[56px] text-cream mb-12 leading-tight">
          {prompt.question}
        </h2>

        {/* Options grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prompt.options.map((opt, i) => (
            <motion.button
              key={opt.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className={`option-btn ${selections[step] === opt.label ? "selected" : ""}`}
              onClick={() => onSelect(opt.label)}
            >
              <span className="text-2xl flex-shrink-0">{opt.icon}</span>
              <div className="text-left">
                <div>{opt.label}</div>
                {opt.subtitle && (
                  <div className="text-xs opacity-50 mt-1 font-normal">{opt.subtitle}</div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor: i <= step
                  ? "hsl(158, 68%, 37%)"
                  : "rgba(255,255,255,0.15)",
                boxShadow: i <= step
                  ? "0 0 12px rgba(29,158,117,0.5)"
                  : "none",
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PromptScreen;