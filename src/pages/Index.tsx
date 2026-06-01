import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import SimulatorLayout from "@/components/SimulatorLayout";
import AttractScreen from "@/components/AttractScreen";
import WelcomeScreen from "@/components/WelcomeScreen";
import PromptScreen from "@/components/PromptScreen";
import GeneratingScreen from "@/components/GeneratingScreen";
import RevealScreen from "@/components/RevealScreen";
import PostcardScreen from "@/components/PostcardScreen";
import { getCivilization } from "@/lib/civilizations";

type Screen = "attract" | "welcome" | "prompts" | "generating" | "reveal" | "postcard";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("attract");
  const [promptStep, setPromptStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [civData, setCivData] = useState<{
    name: string;
    tagline: string;
    image: string;
    skyboxUrl: string;
  } | null>(null);

  const handleBegin = () => setScreen("welcome");

  const handleReady = () => {
    setScreen("prompts");
    setPromptStep(0);
    setSelections([]);
  };

  const handleSelect = useCallback(
    (value: string) => {
      const newSelections = [...selections];
      newSelections[promptStep] = value;
      setSelections(newSelections);

      setTimeout(() => {
        if (promptStep < 2) {
          setPromptStep(promptStep + 1);
        } else {
          const location = newSelections[0];
          const energy = newSelections[1];
          const civ = getCivilization(location, energy, value);

          setScreen("generating");
          setCivData({
            name: civ.name,
            tagline: civ.tagline,
            image: civ.image,
            skyboxUrl: "",
          });

          setTimeout(() => {
            setScreen("reveal");
          }, 4000);
        }
      }, 600);
    },
    [promptStep, selections]
  );

  const handlePostcard = () => setScreen("postcard");

  const handleRestart = () => {
    setScreen("attract");
    setPromptStep(0);
    setSelections([]);
    setCivData(null);
  };

  const showProgress = screen === "prompts";
  const progress = screen === "prompts" ? promptStep : undefined;

  return (
    <SimulatorLayout progress={progress} showProgress={showProgress} onReset={handleRestart}>
      <AnimatePresence mode="wait">
        {screen === "attract" && <AttractScreen key="attract" onBegin={handleBegin} />}
        {screen === "welcome" && <WelcomeScreen key="welcome" onReady={handleReady} />}
        {screen === "prompts" && (
          <PromptScreen
            key="prompts"
            step={promptStep}
            selections={selections}
            onSelect={handleSelect}
          />
        )}
        {screen === "generating" && <GeneratingScreen key="generating" />}
        {screen === "reveal" && civData && (
          <RevealScreen
            key="reveal"
            civilizationName={civData.name}
            tagline={civData.tagline}
            location={selections[0]}
            energy={selections[1]}
            values={selections[2]}
            skyboxUrl={civData.skyboxUrl}
            civilizationImage={civData.image}
            onRestart={handleRestart}
            onPostcard={handlePostcard}
          />
        )}
        {screen === "postcard" && civData && (
          <PostcardScreen
            key="postcard"
            civilizationName={civData.name}
            tagline={civData.tagline}
            civilizationImage={civData.image}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </SimulatorLayout>
  );
};

export default Index;