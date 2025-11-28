import { type Brooch, type GeneratedBrooch, sampleBrooches } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllBrooches(): Promise<Brooch[]>;
  getBroochById(id: string): Promise<Brooch | undefined>;
  saveGeneratedBrooch(brooch: Omit<GeneratedBrooch, "id" | "createdAt">): Promise<GeneratedBrooch>;
  getGeneratedBrooch(id: string): Promise<GeneratedBrooch | undefined>;
}

export class MemStorage implements IStorage {
  private brooches: Map<string, Brooch>;
  private generatedBrooches: Map<string, GeneratedBrooch>;

  constructor() {
    this.brooches = new Map();
    this.generatedBrooches = new Map();
    
    for (const brooch of sampleBrooches) {
      this.brooches.set(brooch.id, brooch);
    }
  }

  async getAllBrooches(): Promise<Brooch[]> {
    return Array.from(this.brooches.values());
  }

  async getBroochById(id: string): Promise<Brooch | undefined> {
    return this.brooches.get(id);
  }

  async saveGeneratedBrooch(brooch: Omit<GeneratedBrooch, "id" | "createdAt">): Promise<GeneratedBrooch> {
    const id = randomUUID();
    const generatedBrooch: GeneratedBrooch = {
      ...brooch,
      id,
      createdAt: new Date().toISOString(),
    };
    this.generatedBrooches.set(id, generatedBrooch);
    return generatedBrooch;
  }

  async getGeneratedBrooch(id: string): Promise<GeneratedBrooch | undefined> {
    return this.generatedBrooches.get(id);
  }
}

export const storage = new MemStorage();
