import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateBroochSchema, colorOptions } from "@shared/schema";
import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Get all brooches
  app.get("/api/brooches", async (req, res) => {
    try {
      const brooches = await storage.getAllBrooches();
      res.json(brooches);
    } catch (error) {
      console.error("Error fetching brooches:", error);
      res.status(500).json({ error: "Failed to fetch brooches" });
    }
  });

  // Get single brooch by ID
  app.get("/api/brooches/:id", async (req, res) => {
    try {
      const brooch = await storage.getBroochById(req.params.id);
      if (!brooch) {
        return res.status(404).json({ error: "Brooch not found" });
      }
      res.json(brooch);
    } catch (error) {
      console.error("Error fetching brooch:", error);
      res.status(500).json({ error: "Failed to fetch brooch" });
    }
  });

  // Generate custom brooch image using DALL-E
  app.post("/api/generate", async (req, res) => {
    try {
      const validationResult = generateBroochSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: validationResult.error.errors 
        });
      }

      const { size, shape, colors, description } = validationResult.data;

      // Build color names for the prompt
      const colorNames = colors
        .map((id) => {
          const color = colorOptions.find((c) => c.id === id);
          return color ? color.name.toLowerCase() : id;
        })
        .join(", ");

      // Build size description
      const sizeDesc = {
        S: "small, delicate, 3cm",
        M: "medium, 5cm",
        L: "large, statement piece, 7cm",
        XL: "extra large, dramatic, 10cm",
      }[size];

      // Create the DALL-E prompt
      const prompt = `Photorealistic image of a handmade beaded brooch in the shape of a ${shape}. 
Size: ${sizeDesc}. 
Primary colors: ${colorNames}. 
Style: ${description}. 
The brooch is made of tiny glass beads, intricate beadwork, artisanal craftsmanship. 
Professional jewelry photography, white background, sharp focus, high detail, luxury product photography.
The beads should be clearly visible, showing the texture and craftsmanship of handmade beadwork.`;

      console.log("Generating brooch with prompt:", prompt);

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });

      const imageUrl = response.data[0].url;

      if (!imageUrl) {
        throw new Error("No image URL returned from OpenAI");
      }

      // Save the generated brooch
      const generatedBrooch = await storage.saveGeneratedBrooch({
        imageUrl,
        size,
        shape,
        colors,
        description,
      });

      res.json(generatedBrooch);
    } catch (error) {
      console.error("Error generating brooch:", error);
      
      if (error instanceof OpenAI.APIError) {
        return res.status(500).json({ 
          error: "Image generation failed", 
          details: error.message 
        });
      }
      
      res.status(500).json({ error: "Failed to generate brooch design" });
    }
  });

  // Get generated brooch by ID
  app.get("/api/generated/:id", async (req, res) => {
    try {
      const brooch = await storage.getGeneratedBrooch(req.params.id);
      if (!brooch) {
        return res.status(404).json({ error: "Generated brooch not found" });
      }
      res.json(brooch);
    } catch (error) {
      console.error("Error fetching generated brooch:", error);
      res.status(500).json({ error: "Failed to fetch generated brooch" });
    }
  });

  return httpServer;
}
