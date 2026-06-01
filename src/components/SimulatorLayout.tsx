import { ReactNode, useState } from "react";
import ParticleBackground from "./ParticleBackground";

interface SimulatorLayoutProps {
  children: ReactNode;
  progress?: number;
  showProgress?: boolean;
  onReset?: () => void;
}

const SimulatorLayout = ({ children, progress, showProgress, onReset }: SimulatorLayoutProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="min-h-svh mesh-bg text-foreground overflow-hidden relative selection:bg-primary/30">
      <ParticleBackground />

      {/* Iridescent reset button */}
      {onReset && (
        <button
          onClick={onReset}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "fixed",
            top: "18px",
            right: "18px",
            zIndex: 200,
            padding: "7px 15px",
            borderRadius: "100px",
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.18em",
            cursor: "pointer",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            transition: "all 0.4s ease",
            background: hovered
              ? "linear-gradient(135deg, rgba(93,202,165,0.12), rgba(74,59,140,0.12), rgba(200,146,42,0.1))"
              : "linear-gradient(135deg, rgba(93,202,165,0.04), rgba(74,59,140,0.04), rgba(200,146,42,0.03))",
            border: hovered
              ? "1px solid rgba(93,202,165,0.35)"
              : "1px solid rgba(255,255,255,0.08)",
            color: hovered ? "rgba(245,240,232,0.65)" : "rgba(245,240,232,0.2)",
            boxShadow: hovered
              ? "0 0 24px rgba(93,202,165,0.12), 0 0 48px rgba(74,59,140,0.08)"
              : "none",
          }}
        >
          ↺ RESET
        </button>
      )}

      <main className="relative z-10 container mx-auto px-6 py-8 min-h-svh flex flex-col">
        {showProgress && progress !== undefined && (
          <header className="flex justify-center items-center mb-8">
            <div className="flex gap-2 items-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: i <= progress
                      ? "hsl(158, 68%, 37%)"
                      : "rgba(255,255,255,0.15)",
                    boxShadow: i <= progress
                      ? "0 0 12px rgba(29,158,117,0.5)"
                      : "none",
                  }}
                />
              ))}
            </div>
          </header>
        )}

        <div className="flex-1 flex flex-col justify-center">{children}</div>
      </main>
    </div>
  );
};

export default SimulatorLayout;