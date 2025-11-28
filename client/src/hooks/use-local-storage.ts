import { useState, useEffect, useCallback } from "react";

interface GeneratedBroochLocal {
  id: string;
  imageUrl: string;
  size: string;
  shape: string;
  colors: string[];
  description: string;
  createdAt: string;
}

interface GenerationLimit {
  date: string;
  count: number;
}

const STORAGE_KEYS = {
  MY_BROOCHES: "roughan_my_brooches",
  GENERATION_LIMIT: "roughan_generation_limit",
};

const MAX_GENERATIONS_PER_DAY = 3;

export function useLocalStorage() {
  const [myBrooches, setMyBrooches] = useState<GeneratedBroochLocal[]>([]);
  const [generationLimit, setGenerationLimit] = useState<GenerationLimit>({ date: "", count: 0 });

  useEffect(() => {
    const storedBrooches = localStorage.getItem(STORAGE_KEYS.MY_BROOCHES);
    if (storedBrooches) {
      try {
        setMyBrooches(JSON.parse(storedBrooches));
      } catch (e) {
        console.error("Failed to parse stored brooches:", e);
      }
    }

    const storedLimit = localStorage.getItem(STORAGE_KEYS.GENERATION_LIMIT);
    const today = new Date().toISOString().split("T")[0];
    
    if (storedLimit) {
      try {
        const parsed = JSON.parse(storedLimit);
        if (parsed.date === today) {
          setGenerationLimit(parsed);
        } else {
          const resetLimit = { date: today, count: 0 };
          setGenerationLimit(resetLimit);
          localStorage.setItem(STORAGE_KEYS.GENERATION_LIMIT, JSON.stringify(resetLimit));
        }
      } catch (e) {
        console.error("Failed to parse generation limit:", e);
        const resetLimit = { date: today, count: 0 };
        setGenerationLimit(resetLimit);
        localStorage.setItem(STORAGE_KEYS.GENERATION_LIMIT, JSON.stringify(resetLimit));
      }
    } else {
      const resetLimit = { date: today, count: 0 };
      setGenerationLimit(resetLimit);
      localStorage.setItem(STORAGE_KEYS.GENERATION_LIMIT, JSON.stringify(resetLimit));
    }
  }, []);

  const saveBrooch = useCallback((brooch: GeneratedBroochLocal) => {
    setMyBrooches((prev) => {
      const updated = [brooch, ...prev];
      localStorage.setItem(STORAGE_KEYS.MY_BROOCHES, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeBrooch = useCallback((id: string) => {
    setMyBrooches((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      localStorage.setItem(STORAGE_KEYS.MY_BROOCHES, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const canGenerate = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    if (generationLimit.date !== today) {
      return true;
    }
    return generationLimit.count < MAX_GENERATIONS_PER_DAY;
  }, [generationLimit]);

  const getRemainingGenerations = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    if (generationLimit.date !== today) {
      return MAX_GENERATIONS_PER_DAY;
    }
    return Math.max(0, MAX_GENERATIONS_PER_DAY - generationLimit.count);
  }, [generationLimit]);

  const incrementGenerationCount = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    setGenerationLimit((prev) => {
      const updated = prev.date === today
        ? { date: today, count: prev.count + 1 }
        : { date: today, count: 1 };
      localStorage.setItem(STORAGE_KEYS.GENERATION_LIMIT, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    myBrooches,
    saveBrooch,
    removeBrooch,
    canGenerate,
    getRemainingGenerations,
    incrementGenerationCount,
  };
}

export type { GeneratedBroochLocal };
