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
    name: "Red Rooster",
    nameDE: "Roter Hahn",
    price: 95,
    imageUrl: "/attached_assets/image_1764333587222.png",
    description: "Striking rooster brooch with red and black beadwork and natural feathers",
    descriptionDE: "Auffällige Hahnenbrosche mit rot-schwarzer Perlenarbeit und echten Federn",
    available: true,
  },
  {
    id: "2",
    name: "Monarch Butterfly",
    nameDE: "Monarchfalter",
    price: 85,
    imageUrl: "/attached_assets/image_1764333594773.png",
    description: "Elegant brown butterfly with intricate white floral beadwork pattern",
    descriptionDE: "Eleganter brauner Schmetterling mit filigranem weißen Blumen-Perlenmuster",
    available: true,
  },
  {
    id: "3",
    name: "Peacock Butterfly",
    nameDE: "Tagpfauenauge",
    price: 90,
    imageUrl: "/attached_assets/image_1764333751853.png",
    description: "Vibrant red butterfly with gold antennae and colorful eye patterns",
    descriptionDE: "Leuchtend roter Schmetterling mit goldenen Fühlern und bunten Augenmustern",
    available: true,
  },
];
