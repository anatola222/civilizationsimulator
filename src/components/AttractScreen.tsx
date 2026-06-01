import { motion } from "framer-motion";

interface AttractScreenProps {
  onBegin: () => void;
}

const civilizationNames = [
  "SOLARA", "VERDANTIS", "AQUAEMIS", "UMOJA STATION", "NKRUMAH BASIN",
  "THALASSIA", "IROKO HEIGHTS", "MANNAHATTA 2100", "ZURI COLLECTIVE",
  "AETHERON", "SYLVARA", "QUANTARA", "BIOLUMA", "CASCADIS",
];

const AttractScreen = ({ onBegin }: AttractScreenProps) => {
  const title = "Future Civilization\nSimulator";
  const chars = title.split("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center text-center gap-10 min-h-[80vh]"
    >
      {/* Lab label */}
      <motion.span
        className="label-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.2 }}
      >
        R3IMAGINE STORY LAB
      </motion.span>

      {/* Hero title — letter stagger */}
      <h1 className="font-display font-light text-6xl md:text-8xl lg:text-[96px] text-cream leading-[0.95] whitespace-pre-line relative">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.02, duration: 0.3 }}
            className="inline-block"
            style={char === " " ? { width: "0.3em" } : char === "\n" ? { display: "block", height: 0 } : {}}
          >
            {char === "\n" ? null : char}
          </motion.span>
        ))}
        <motion.sup
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.4 + chars.length * 0.02 + 0.2, duration: 0.4 }}
          style={{ fontSize: "0.18em", verticalAlign: "super", letterSpacing: 0, marginLeft: "0.1em" }}
        >
          ™
        </motion.sup>
      </h1>

      {/* Subtitle */}
      <motion.p
        className="font-body text-lg text-foreground/55"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.55, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        Build a new world in 60 seconds.
      </motion.p>

      {/* CTA */}
      <motion.button
        className="btn-primary animate-pulse-gentle"
        onClick={onBegin}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        BEGIN
      </motion.button>

      {/* Sub-CTA */}
      <motion.span
        className="label-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.8 }}
        style={{ fontSize: "10px", letterSpacing: "0.2em" }}
      >
        NO SIGN-IN REQUIRED &nbsp;·&nbsp; YOUR WORLD, YOUR RULES
      </motion.span>

      {/* Marquee */}
      <motion.div
        className="absolute bottom-6 left-0 right-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 2 }}
      >
        <div className="animate-marquee whitespace-nowrap font-mono text-[11px] tracking-[0.15em] text-cream">
          {[...civilizationNames, ...civilizationNames].map((n, i) => (
            <span key={i}>{n} &nbsp;·&nbsp; </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AttractScreen;