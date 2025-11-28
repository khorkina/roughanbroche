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

      // Build color descriptions for the prompt
      // Supports both hex values (from color palette) and color IDs (legacy)
      const colorDescriptions = colors
        .map((color) => {
          // Check if it's a hex value
          if (color.startsWith("#")) {
            return `color ${color}`;
          }
          // Check if it's a known color ID
          const knownColor = colorOptions.find((c) => c.id === color);
          return knownColor ? knownColor.name.toLowerCase() : color;
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
Primary colors: ${colorDescriptions}. 
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
        response_format: "b64_json",
      });

      const b64Data = response.data?.[0]?.b64_json;

      if (!b64Data) {
        throw new Error("No image data returned from OpenAI");
      }

      // Convert base64 to data URL for direct display
      const imageUrl = `data:image/png;base64,${b64Data}`;

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

  // Serve generated brooch image directly
  app.get("/api/generated/:id/image", async (req, res) => {
    try {
      const brooch = await storage.getGeneratedBrooch(req.params.id);
      if (!brooch) {
        return res.status(404).json({ error: "Generated brooch not found" });
      }
      
      // Extract base64 data from data URI
      const base64Data = brooch.imageUrl.replace(/^data:image\/png;base64,/, '');
      const imageBuffer = Buffer.from(base64Data, 'base64');
      
      res.set('Content-Type', 'image/png');
      res.set('Cache-Control', 'public, max-age=3600');
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error serving generated brooch image:", error);
      res.status(500).json({ error: "Failed to serve image" });
    }
  });

  return httpServer;
}
