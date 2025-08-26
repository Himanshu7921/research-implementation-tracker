import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Research Papers endpoints
  app.get("/api/research-papers", async (req, res) => {
    try {
      const papers = await storage.getResearchPapers();
      res.json(papers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch research papers" });
    }
  });

  app.get("/api/research-papers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const paper = await storage.getResearchPaper(id);
      if (!paper) {
        return res.status(404).json({ message: "Research paper not found" });
      }
      // Increment views
      await storage.updateResearchPaperViews(id);
      res.json(paper);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch research paper" });
    }
  });

  // Research Projects endpoints
  app.get("/api/research-projects", async (req, res) => {
    try {
      const projects = await storage.getResearchProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch research projects" });
    }
  });

  app.get("/api/research-projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const project = await storage.getResearchProject(id);
      if (!project) {
        return res.status(404).json({ message: "Research project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch research project" });
    }
  });

  // GitHub repositories endpoints
  app.get("/api/github-repos", async (req, res) => {
    try {
      const repos = await storage.getGithubRepos();
      res.json(repos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch GitHub repositories" });
    }
  });

  app.get("/api/github-repos/featured", async (req, res) => {
    try {
      const repos = await storage.getFeaturedGithubRepos();
      res.json(repos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured GitHub repositories" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, institution, inquiry, message } = req.body;
      
      // In a real application, you would send an email or store the message
      console.log("Contact form submission:", { name, email, institution, inquiry, message });
      
      res.json({ message: "Thank you for your message! I will get back to you soon." });
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
