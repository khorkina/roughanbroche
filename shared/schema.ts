import { z } from "zod";

// Brooch product schema
export const broochSchema = z.object({
  id: z.string(),
  name: z.string(),
  nameDE: z.string(),
  price: z.number().min(80).max(100),
  imageUrl: z.string(),
  description: z.string(),
  descriptionDE: z.string(),
  available: z.boolean().default(true),
});

export type Brooch = z.infer<typeof broochSchema>;

// Generator options
export const sizeOptions = ["S", "M", "L", "XL"] as const;
export type Size = typeof sizeOptions[number];

export const shapeCategories = {
  insects: ["butterfly", "bee", "dragonfly", "beetle", "moth"],
  animals: ["bird", "fish", "cat", "fox", "rabbit"],
  abstract: ["geometric", "spiral", "wave", "starburst", "organic"],
  botanical: ["flower", "leaf", "vine", "mushroom", "tree"],
} as const;

export type ShapeCategory = keyof typeof shapeCategories;

export const colorOptions = [
  { id: "black", hex: "#000000", name: "Black", nameDE: "Schwarz" },
  { id: "white", hex: "#FFFFFF", name: "White", nameDE: "Weiß" },
  { id: "gold", hex: "#D4AF37", name: "Gold", nameDE: "Gold" },
  { id: "silver", hex: "#C0C0C0", name: "Silver", nameDE: "Silber" },
  { id: "red", hex: "#DC143C", name: "Red", nameDE: "Rot" },
  { id: "blue", hex: "#1E3A5F", name: "Blue", nameDE: "Blau" },
  { id: "green", hex: "#2D5A27", name: "Green", nameDE: "Grün" },
  { id: "purple", hex: "#6B3FA0", name: "Purple", nameDE: "Lila" },
  { id: "coral", hex: "#FF6B6B", name: "Coral", nameDE: "Koralle" },
  { id: "turquoise", hex: "#40E0D0", name: "Turquoise", nameDE: "Türkis" },
] as const;

export type ColorOption = typeof colorOptions[number];

// Generator request schema
export const generateBroochSchema = z.object({
  size: z.enum(sizeOptions),
  shape: z.string(),
  colors: z.array(z.string()).min(1).max(4),
  description: z.string().min(10).max(500),
});

export type GenerateBroochRequest = z.infer<typeof generateBroochSchema>;

// Generated brooch result
export const generatedBroochSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  size: z.enum(sizeOptions),
  shape: z.string(),
  colors: z.array(z.string()),
  description: z.string(),
  createdAt: z.string(),
});

export type GeneratedBrooch = z.infer<typeof generatedBroochSchema>;

// Sample brooches data for in-memory storage
export const sampleBrooches: Brooch[] = [
  {
    id: "1",
    name: "Midnight Butterfly",
    nameDE: "Mitternachts-Schmetterling",
    price: 85,
    imageUrl: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop",
    description: "Elegant butterfly brooch with intricate black and gold beadwork",
    descriptionDE: "Elegante Schmetterlingsbrosche mit filigraner schwarz-goldener Perlenarbeit",
    available: true,
  },
  {
    id: "2",
    name: "Golden Beetle",
    nameDE: "Goldener Käfer",
    price: 95,
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop",
    description: "Statement beetle brooch featuring golden and emerald beads",
    descriptionDE: "Auffällige Käferbrosche mit goldenen und smaragdfarbenen Perlen",
    available: true,
  },
  {
    id: "3",
    name: "Crystal Dragonfly",
    nameDE: "Kristall-Libelle",
    price: 90,
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop",
    description: "Delicate dragonfly with crystal-clear and silver beads",
    descriptionDE: "Zarte Libelle mit kristallklaren und silbernen Perlen",
    available: true,
  },
  {
    id: "4",
    name: "Geometric Star",
    nameDE: "Geometrischer Stern",
    price: 80,
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop",
    description: "Modern geometric star pattern in black and white beads",
    descriptionDE: "Modernes geometrisches Sternmuster in schwarzen und weißen Perlen",
    available: true,
  },
  {
    id: "5",
    name: "Royal Peacock",
    nameDE: "Königlicher Pfau",
    price: 100,
    imageUrl: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop",
    description: "Luxurious peacock feather brooch with blue and green iridescent beads",
    descriptionDE: "Luxuriöse Pfauenfeder-Brosche mit blau-grünen schillernden Perlen",
    available: true,
  },
  {
    id: "6",
    name: "Abstract Wave",
    nameDE: "Abstrakte Welle",
    price: 88,
    imageUrl: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=800&fit=crop",
    description: "Flowing abstract wave design in ocean blue and silver tones",
    descriptionDE: "Fließendes abstraktes Wellendesign in Ozeanblau und Silbertönen",
    available: true,
  },
  {
    id: "7",
    name: "Coral Bloom",
    nameDE: "Korallenblüte",
    price: 92,
    imageUrl: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop",
    description: "Vibrant floral brooch inspired by coral reef formations",
    descriptionDE: "Lebhafte Blumenbrosche inspiriert von Korallenriff-Formationen",
    available: true,
  },
  {
    id: "8",
    name: "Noir Moth",
    nameDE: "Schwarze Motte",
    price: 87,
    imageUrl: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=800&h=800&fit=crop",
    description: "Mysterious moth brooch in deep black with subtle silver accents",
    descriptionDE: "Geheimnisvolle Mottenbrosche in tiefem Schwarz mit dezenten Silberakzenten",
    available: true,
  },
];
