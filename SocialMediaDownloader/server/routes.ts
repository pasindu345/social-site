import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints for proxying video download requests
  app.get('/api/youtube', async (req, res) => {
    try {
      const url = req.query.url as string;
      
      if (!url) {
        return res.status(400).json({ error: true, message: 'URL parameter is required' });
      }

      const response = await fetch(`https://yt-vid.hazex.workers.dev/?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      res.json(data);
    } catch (error) {
      console.error('YouTube API error:', error);
      res.status(500).json({ error: true, message: 'Failed to fetch video information' });
    }
  });

  app.get('/api/facebook', async (req, res) => {
    try {
      const url = req.query.url as string;
      
      if (!url) {
        return res.status(400).json({ error: true, message: 'URL parameter is required' });
      }

      const response = await fetch(`https://facebook-downloader.apis-bj-devs.workers.dev/?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      res.json(data);
    } catch (error) {
      console.error('Facebook API error:', error);
      res.status(500).json({ error: true, message: 'Failed to fetch video information' });
    }
  });

  app.get('/api/tiktok', async (req, res) => {
    try {
      const url = req.query.url as string;
      
      if (!url) {
        return res.status(400).json({ error: true, message: 'URL parameter is required' });
      }

      const response = await fetch(`https://tiktok-dl.akalankanime11.workers.dev/?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      res.json(data);
    } catch (error) {
      console.error('TikTok API error:', error);
      res.status(500).json({ error: true, message: 'Failed to fetch video information' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
