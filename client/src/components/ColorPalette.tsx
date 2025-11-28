import { useLanguage } from "@/lib/i18n";
import { Check } from "lucide-react";

interface ColorPaletteProps {
  selectedColors: string[];
  onColorToggle: (colorId: string) => void;
  onPaletteSelect: (colors: string[]) => void;
}

export interface ColorPaletteTheme {
  id: string;
  name: string;
  nameDE: string;
  colors: { hex: string; id: string }[];
}

export const colorPalettes: ColorPaletteTheme[] = [
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    nameDE: "Meeresbrise",
    colors: [
      { hex: "#1a5f7a", id: "deep-teal" },
      { hex: "#57c5b6", id: "turquoise" },
      { hex: "#159895", id: "sea-green" },
      { hex: "#002b5b", id: "navy" },
      { hex: "#8fe3cf", id: "mint" },
    ],
  },
  {
    id: "sunset-warmth",
    name: "Sunset Warmth",
    nameDE: "Sonnenuntergang",
    colors: [
      { hex: "#ff6b35", id: "coral" },
      { hex: "#f7c59f", id: "peach" },
      { hex: "#efa94a", id: "amber" },
      { hex: "#c4532d", id: "rust" },
      { hex: "#2e1f27", id: "burgundy" },
    ],
  },
  {
    id: "forest-moss",
    name: "Forest Moss",
    nameDE: "Waldmoos",
    colors: [
      { hex: "#2d5a27", id: "forest" },
      { hex: "#5f8d4e", id: "sage" },
      { hex: "#a4be7b", id: "olive" },
      { hex: "#285430", id: "pine" },
      { hex: "#e5d9b6", id: "cream" },
    ],
  },
  {
    id: "berry-dream",
    name: "Berry Dream",
    nameDE: "Beerentraum",
    colors: [
      { hex: "#9b2335", id: "berry" },
      { hex: "#c9a0dc", id: "lavender" },
      { hex: "#e8b4bc", id: "blush" },
      { hex: "#5c374c", id: "plum" },
      { hex: "#f8e8ee", id: "rose-white" },
    ],
  },
  {
    id: "midnight-gold",
    name: "Midnight Gold",
    nameDE: "Mitternachtsgold",
    colors: [
      { hex: "#1c1c1c", id: "black" },
      { hex: "#d4af37", id: "gold" },
      { hex: "#2c2c54", id: "midnight" },
      { hex: "#f1c40f", id: "yellow" },
      { hex: "#8b7355", id: "bronze" },
    ],
  },
  {
    id: "nordic-frost",
    name: "Nordic Frost",
    nameDE: "Nordischer Frost",
    colors: [
      { hex: "#e8e8e8", id: "silver" },
      { hex: "#7ec8e3", id: "ice-blue" },
      { hex: "#0077b6", id: "glacier" },
      { hex: "#ffffff", id: "white" },
      { hex: "#023e8a", id: "arctic" },
    ],
  },
  {
    id: "autumn-harvest",
    name: "Autumn Harvest",
    nameDE: "Herbsternte",
    colors: [
      { hex: "#b85c38", id: "terracotta" },
      { hex: "#e0c097", id: "wheat" },
      { hex: "#5c3d2e", id: "brown" },
      { hex: "#f5deb3", id: "sand" },
      { hex: "#8b4513", id: "sienna" },
    ],
  },
  {
    id: "tropical-paradise",
    name: "Tropical Paradise",
    nameDE: "Tropisches Paradies",
    colors: [
      { hex: "#ff6f61", id: "coral-pink" },
      { hex: "#6b5b95", id: "orchid" },
      { hex: "#88d8b0", id: "seafoam" },
      { hex: "#f7786b", id: "flamingo" },
      { hex: "#feb236", id: "mango" },
    ],
  },
  {
    id: "vintage-rose",
    name: "Vintage Rose",
    nameDE: "Vintage Rose",
    colors: [
      { hex: "#d4a5a5", id: "dusty-rose" },
      { hex: "#a67c52", id: "antique-brass" },
      { hex: "#6e4c4c", id: "wine" },
      { hex: "#f0ece2", id: "ivory" },
      { hex: "#b08968", id: "caramel" },
    ],
  },
  {
    id: "electric-neon",
    name: "Electric Neon",
    nameDE: "Elektrisches Neon",
    colors: [
      { hex: "#ff00ff", id: "magenta" },
      { hex: "#00ffff", id: "cyan" },
      { hex: "#39ff14", id: "neon-green" },
      { hex: "#ff073a", id: "neon-red" },
      { hex: "#1c1c1c", id: "jet-black" },
    ],
  },
  {
    id: "earthy-terracotta",
    name: "Earthy Terracotta",
    nameDE: "Erdige Terrakotta",
    colors: [
      { hex: "#c67b5c", id: "terra" },
      { hex: "#e4c59e", id: "bone" },
      { hex: "#8b5a2b", id: "sepia" },
      { hex: "#4a3728", id: "espresso" },
      { hex: "#d2b48c", id: "tan" },
    ],
  },
  {
    id: "royal-velvet",
    name: "Royal Velvet",
    nameDE: "Königlicher Samt",
    colors: [
      { hex: "#4b0082", id: "indigo" },
      { hex: "#800020", id: "burgundy-red" },
      { hex: "#d4af37", id: "royal-gold" },
      { hex: "#2c003e", id: "deep-purple" },
      { hex: "#c8a2c8", id: "lilac" },
    ],
  },
];

export default function ColorPalette({ selectedColors, onColorToggle, onPaletteSelect }: ColorPaletteProps) {
  const { language } = useLanguage();

  const isColorSelected = (hex: string) => selectedColors.includes(hex);
  const isPaletteSelected = (palette: ColorPaletteTheme) => 
    palette.colors.every(c => selectedColors.includes(c.hex));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {colorPalettes.map((palette) => (
          <button
            key={palette.id}
            onClick={() => onPaletteSelect(palette.colors.slice(0, 4).map(c => c.hex))}
            className={`group relative p-3 border transition-all hover-elevate ${
              isPaletteSelected(palette)
                ? "border-foreground bg-foreground/5"
                : "border-foreground/30 hover:border-foreground"
            }`}
          >
            <div className="flex gap-0.5 mb-2">
              {palette.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="flex-1 aspect-[1/2] first:rounded-l-sm last:rounded-r-sm"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
            <p className="text-xs tracking-wide text-left truncate">
              {language === "de" ? palette.nameDE : palette.name}
            </p>
            {isPaletteSelected(palette) && (
              <div className="absolute top-1 right-1">
                <Check className="w-4 h-4" />
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedColors.length > 0 && (
        <div className="pt-4 border-t border-foreground/20">
          <p className="text-sm tracking-wider uppercase opacity-60 mb-3">
            {language === "de" ? "Ausgewählte Farben" : "Selected Colors"}
          </p>
          <div className="flex gap-2 flex-wrap">
            {selectedColors.map((hex, idx) => (
              <button
                key={idx}
                onClick={() => onColorToggle(hex)}
                className="relative w-10 h-10 border-2 border-foreground transition-transform hover:scale-110"
                style={{ backgroundColor: hex }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                  <span className="text-white text-lg">×</span>
                </div>
              </button>
            ))}
          </div>
          <p className="text-sm opacity-60 mt-2">
            {selectedColors.length}/4 {language === "de" ? "ausgewählt" : "selected"}
            {" · "}
            <span className="opacity-60">
              {language === "de" ? "Klicken zum Entfernen" : "Click to remove"}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
