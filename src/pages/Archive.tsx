import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SimulatorLayout from "@/components/SimulatorLayout";
import { civilizations, civilizationImages } from "@/lib/civilizations";

const locations = ["All", "Floating Cities", "Ocean Worlds", "Desert Megacities", "Orbital Habitats"];
const locationShort: Record<string, string> = {
  "Floating Cities": "FLOATING",
  "Ocean Worlds": "OCEAN",
  "Desert Megacities": "DESERT",
  "Orbital Habitats": "ORBITAL",
};

const Archive = () => {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const archiveEntries = civilizations.map((civ, i) => ({
    ...civ,
    image: civilizationImages[i % civilizationImages.length],
    location: locations[1 + (i % 4)],
    id: i,
  }));

  const filtered = filter === "All"
    ? archiveEntries
    : archiveEntries.filter((e) => e.location === filter);

  return (
    <SimulatorLayout>
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="label-accent mb-6">FUTURE CIVILIZATION ARCHIVE</p>
          <h1 className="font-display font-light text-6xl md:text-8xl text-cream mb-2">
            {archiveEntries.length}
          </h1>
          <p className="font-mono text-xs tracking-wider text-foreground/40">
            CIVILIZATIONS IMAGINED ACROSS THE ARCHIVE
          </p>
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setFilter(loc)}
              className={`font-mono text-xs tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 ${
                filter === loc
                  ? "bg-primary/20 text-teal-bright border border-primary/40"
                  : "text-foreground/40 border border-border hover:text-foreground/70 hover:border-foreground/20"
              }`}
            >
              {loc === "All" ? "ALL" : locationShort[loc] || loc.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(29,158,117,0.2)]"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={entry.image}
                  alt={entry.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display font-light text-xl text-cream mb-1">
                  {entry.name}
                </h3>
                <p className="font-body text-sm text-foreground/50 italic line-clamp-2 mb-3">
                  "{entry.tagline}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="stat-pill text-[10px]">
                    {locationShort[entry.location] || entry.location}
                  </span>
                  <span className="font-mono text-xs text-teal-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ENTER PORTAL →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back */}
        <div className="text-center mt-12">
          <button className="btn-ghost" onClick={() => navigate("/")}>
            ← BACK TO SIMULATOR
          </button>
        </div>
      </div>
    </SimulatorLayout>
  );
};

export default Archive;