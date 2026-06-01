import img01 from "@/assets/civilizations/01.png";
import img02 from "@/assets/civilizations/02.png";
import img03 from "@/assets/civilizations/03.png";
import img04 from "@/assets/civilizations/04.png";
import img05 from "@/assets/civilizations/05.png";
import img06 from "@/assets/civilizations/06.png";
import img07 from "@/assets/civilizations/07.png";
import img08 from "@/assets/civilizations/08.png";
import img09 from "@/assets/civilizations/09.png";

export const civilizationImages = [img01, img02, img03, img04, img05, img06, img07, img08, img09];

export const civilizations = [
  { name: "Solara", tagline: "Where the sun never sets on the community's dream" },
  { name: "Verdantis", tagline: "The forest remembers what the city forgot" },
  { name: "Aquaemis", tagline: "Depth is not darkness — it is home" },
  { name: "Khoralund", tagline: "Every grain of sand holds a thousand years of memory" },
  { name: "Nebulae Prime", tagline: "Born between stars, guided by wonder" },
  { name: "Umoja Station", tagline: "Unity is the only gravity that matters" },
  { name: "Asase Orbital", tagline: "The earth mother watches from the sky" },
  { name: "Nkrumah Basin", tagline: "Freedom is the oldest technology" },
  { name: "Thalassia", tagline: "We learned to breathe a different way" },
  { name: "Sylvara", tagline: "The roots go deeper than any foundation" },
  { name: "Quantara", tagline: "Probability is just another word for possibility" },
  { name: "Ndalama", tagline: "Wealth is measured in what grows, not what is owned" },
  { name: "Bioluma", tagline: "Light is alive here. So is everything else" },
  { name: "Terracore", tagline: "We did not terraform the planet. We listened to it" },
  { name: "Meridian Deep", tagline: "At the center of the earth, we found each other" },
  { name: "Cascadis", tagline: "Every waterfall is a decision the mountain made" },
  { name: "Iroko Heights", tagline: "Even the oldest tree is still reaching upward" },
  { name: "Aetheron", tagline: "We built our city in the breath between clouds" },
  { name: "Mannahatta 2100", tagline: "The island remembers its first name" },
  { name: "Zuri Collective", tagline: "Beauty is not decoration. It is infrastructure" },
];

export const getCivilization = (location: string, energy: string, values: string) => {
  const hash = [location, energy, values]
    .join("|")
    .split("")
    .reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 0);
  const idx = Math.abs(hash) % civilizations.length;
  const civ = civilizations[idx];
  const image = civilizationImages[Math.abs(hash) % civilizationImages.length];
  return { ...civ, image };
};

export const getCombinationKey = (location: string, energy: string, values: string) =>
  `${location.toLowerCase().replace(/\s+/g, "-")}|${energy.toLowerCase().replace(/\s+/g, "-")}|${values.toLowerCase().replace(/\s+/g, "-")}`;

export const prompts = [
  {
    question: "Where does your\ncivilization live?",
    options: [
      { icon: "◈", label: "Floating Cities", subtitle: "Above the clouds" },
      { icon: "≋", label: "Ocean Worlds", subtitle: "Beneath the waves" },
      { icon: "⬡", label: "Desert Megacities", subtitle: "From ancient sands" },
      { icon: "○", label: "Orbital Habitats", subtitle: "Among the stars" },
    ],
  },
  {
    question: "What powers\nthis world?",
    options: [
      { icon: "☀", label: "Solar Oceans", subtitle: "Light made infinite" },
      { icon: "◉", label: "AI Governance", subtitle: "Wisdom made digital" },
      { icon: "✦", label: "Quantum Networks", subtitle: "Probability as power" },
      { icon: "❧", label: "Living Forests", subtitle: "Nature as engine" },
    ],
  },
  {
    question: "What values guide\nyour people?",
    options: [
      { icon: "↗", label: "Exploration", subtitle: "Beyond every horizon" },
      { icon: "◯", label: "Community", subtitle: "No one left behind" },
      { icon: "∞", label: "Sustainability", subtitle: "For all generations" },
      { icon: "✦", label: "Creativity", subtitle: "Art as infrastructure" },
    ],
  },
];