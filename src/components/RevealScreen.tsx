import { motion } from "framer-motion";
import CivilizationPortal from "./CivilizationPortal";

interface RevealScreenProps {
  civilizationName: string;
  tagline: string;
  location: string;
  energy: string;
  values: string;
  skyboxUrl: string;
  civilizationImage: string;
  onRestart: () => void;
  onPostcard: () => void;
}

const RevealScreen = ({
  civilizationName,
  tagline,
  location,
  energy,
  values,
  skyboxUrl,
  civilizationImage,
  onRestart,
  onPostcard,
}: RevealScreenProps) => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto w-full"
    >
      {/* Lab label */}
      <motion.p
        className="label-accent text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.2 }}
      >
        R3IMAGINE STORY LAB &nbsp;·&nbsp; FUTURE CIVILIZATION ARCHIVE
      </motion.p>

      {/* White flash */}
      <motion.div
        className="fixed inset-0 bg-white z-50 pointer-events-none"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Civilization name — letter stagger */}
      <motion.div
        className="text-center mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h1 className="font-display font-light text-5xl md:text-7xl text-cream">
          {civilizationName.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.04, duration: 0.3 }}
              className="inline-block"
              style={char === " " ? { width: "0.3em" } : {}}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="text-center font-body text-lg text-gold-core/70 italic mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        "{tagline}"
      </motion.p>

      {/* Portal */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, type: "spring", stiffness: 100 }}
      >
        {skyboxUrl ? (
          <CivilizationPortal skyboxUrl={skyboxUrl} civilizationName={civilizationName} />
        ) : (
          <div className="relative w-full rounded-3xl overflow-hidden portal-frame" style={{ height: "420px" }}>
            <img
              src={civilizationImage}
              alt={civilizationName}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="inline-block px-6 py-2 rounded-full font-mono text-xs tracking-widest uppercase text-teal-bright"
                style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
              >
                {civilizationName}
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Stat pills */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mt-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <span className="stat-pill">◈ {location.toUpperCase()}</span>
        <span className="stat-pill">☀ {energy.toUpperCase()}</span>
        <span className="stat-pill">◯ {values.toUpperCase()}</span>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.5 }}
      >
        <button className="btn-primary" onClick={onPostcard}>
          ✉ SEND A POSTCARD FROM YOUR FUTURE
        </button>
        <button className="btn-ghost" onClick={onRestart}>
          ↩ BUILD ANOTHER WORLD
        </button>
      </motion.div>

      {/* Co-brand */}
      <motion.p
        className="label-accent text-center mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2.2 }}
        style={{ fontSize: "10px" }}
      >
        R3IMAGINE &nbsp;×&nbsp; NEW YORK HALL OF SCIENCE
      </motion.p>
    </motion.div>
  );
};

export default RevealScreen;