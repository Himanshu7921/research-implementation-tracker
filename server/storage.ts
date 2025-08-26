import { type ResearchPaper, type InsertResearchPaper, type ResearchProject, type InsertResearchProject, type GithubRepo, type InsertGithubRepo } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Research Papers
  getResearchPapers(): Promise<ResearchPaper[]>;
  getResearchPaper(id: string): Promise<ResearchPaper | undefined>;
  createResearchPaper(paper: InsertResearchPaper): Promise<ResearchPaper>;
  updateResearchPaperViews(id: string): Promise<void>;
  
  // Research Projects
  getResearchProjects(): Promise<ResearchProject[]>;
  getResearchProject(id: string): Promise<ResearchProject | undefined>;
  createResearchProject(project: InsertResearchProject): Promise<ResearchProject>;
  
  // GitHub Repositories
  getGithubRepos(): Promise<GithubRepo[]>;
  getFeaturedGithubRepos(): Promise<GithubRepo[]>;
  createGithubRepo(repo: InsertGithubRepo): Promise<GithubRepo>;
}

export class MemStorage implements IStorage {
  private papers: Map<string, ResearchPaper>;
  private projects: Map<string, ResearchProject>;
  private repos: Map<string, GithubRepo>;

  constructor() {
    this.papers = new Map();
    this.projects = new Map();
    this.repos = new Map();

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample Research Papers
    const papers: ResearchPaper[] = [
      {
        id: randomUUID(),
        title: "Neural & Statistical Language Modeling Project",
        abstract: "Journey from statistical bigram models to deep neural networks for character-level language modeling, inspired by Bengio et al. (2003). Implemented progressively from count-based models → shallow NNs → embedding-based MLPs → deep MLPs with BatchNorm. Key learnings include evolution from counts to parameters, one-hot to embeddings, shallow to deep architectures, and vanilla to BatchNorm implementations for faster, stable training.",
        authors: ["Himanshu Sharma"],
        venue: "Personal Research Implementation",
        date: new Date("2024-08-01"),
        status: "completed",
        tags: ["Neural Networks", "Language Modeling", "Deep Learning", "Statistical Models", "BatchNorm"],
        pdfUrl: "https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf",
        codeUrl: "https://github.com/Himanshu7921/GenerateMore",
        demoUrl: "#",
        views: 0,
        downloads: 0,
        citations: 0,
        createdAt: new Date(),
      }
    ];

    papers.forEach(paper => this.papers.set(paper.id, paper));

    // Research Projects
    const projects: ResearchProject[] = [
      {
        id: randomUUID(),
        title: "Transformers for NLP",
        description: "Implementing transformer architectures for natural language processing tasks including attention mechanisms, positional encoding, and multi-head attention for text generation and understanding.",
        status: "in-progress",
        progress: 30,
        startDate: new Date("2024-06-01"),
        expectedCompletion: new Date("2024-10-31"),
        actualCompletion: null,
        tags: ["Transformers", "NLP", "Deep Learning", "Attention"],
        category: "current",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Deep Convolutional Neural Networks",
        description: "Implementing and experimenting with deep CNN architectures for computer vision tasks, including ResNet, VGG, and custom architectures for image classification and object detection.",
        status: "in-progress",
        progress: 50,
        startDate: new Date("2024-05-15"),
        expectedCompletion: new Date("2024-09-30"),
        actualCompletion: null,
        tags: ["Deep Learning", "CNN", "Computer Vision", "ResNet"],
        category: "current",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Quantum Machine Learning Algorithms",
        description: "Investigating hybrid quantum-classical algorithms for machine learning applications with focus on optimization and speedup.",
        status: "planned",
        progress: 0,
        startDate: new Date("2025-01-01"),
        expectedCompletion: new Date("2025-08-31"),
        actualCompletion: null,
        tags: ["Quantum Computing", "Machine Learning", "Optimization"],
        category: "future",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Neuromorphic Computing Applications",
        description: "Exploring brain-inspired computing architectures for energy-efficient AI processing and learning.",
        status: "planned",
        progress: 0,
        startDate: new Date("2024-07-01"),
        expectedCompletion: new Date("2025-03-31"),
        actualCompletion: null,
        tags: ["Hardware", "AI", "Efficiency"],
        category: "future",
        createdAt: new Date(),
      }
    ];

    projects.forEach(project => this.projects.set(project.id, project));

    // GitHub Repositories
    const repos: GithubRepo[] = [
      {
        id: randomUUID(),
        name: "GenerateMore",
        description: "Neural & Statistical Language Modeling Project - Journey from statistical bigram models to deep neural networks for character-level language modeling, inspired by Bengio et al. (2003).",
        language: "Python",
        stars: 5,
        url: "https://github.com/Himanshu7921/GenerateMore",
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        featured: true,
        createdAt: new Date(),
      }
    ];

    repos.forEach(repo => this.repos.set(repo.id, repo));
  }

  async getResearchPapers(): Promise<ResearchPaper[]> {
    return Array.from(this.papers.values()).map(paper => ({
      ...paper,
      date: new Date(paper.date),
      pdfUrl: paper.pdfUrl || null,
      codeUrl: paper.codeUrl || null,
      demoUrl: paper.demoUrl || null,
      createdAt: new Date(paper.createdAt!)
    })).sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async getResearchPaper(id: string): Promise<ResearchPaper | undefined> {
    const paper = this.papers.get(id);
    if (!paper) return undefined;
    return {
      ...paper,
      date: new Date(paper.date),
      pdfUrl: paper.pdfUrl || null,
      codeUrl: paper.codeUrl || null,
      demoUrl: paper.demoUrl || null,
      createdAt: new Date(paper.createdAt!)
    };
  }

  async createResearchPaper(insertPaper: InsertResearchPaper): Promise<ResearchPaper> {
    const id = randomUUID();
    const paper: ResearchPaper = {
      ...insertPaper,
      id,
      views: 0,
      downloads: 0,
      citations: 0,
      createdAt: new Date(),
    };
    this.papers.set(id, paper);
    return paper;
  }

  async updateResearchPaperViews(id: string): Promise<void> {
    const paper = this.papers.get(id);
    if (paper) {
      paper.views = (paper.views ?? 0) + 1;
      this.papers.set(id, paper);
    }
  }

  async getResearchProjects(): Promise<ResearchProject[]> {
    return Array.from(this.projects.values()).map(project => ({
      ...project,
      startDate: new Date(project.startDate),
      expectedCompletion: project.expectedCompletion ? new Date(project.expectedCompletion) : null,
      actualCompletion: project.actualCompletion ? new Date(project.actualCompletion) : null,
      progress: project.progress ?? 0,
      createdAt: new Date(project.createdAt!)
    })).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getResearchProject(id: string): Promise<ResearchProject | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    return {
      ...project,
      startDate: new Date(project.startDate),
      expectedCompletion: project.expectedCompletion ? new Date(project.expectedCompletion) : null,
      actualCompletion: project.actualCompletion ? new Date(project.actualCompletion) : null,
      progress: project.progress ?? 0,
      createdAt: new Date(project.createdAt!)
    };
  }

  async createResearchProject(insertProject: InsertResearchProject): Promise<ResearchProject> {
    const id = randomUUID();
    const project: ResearchProject = {
      ...insertProject,
      id,
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async getGithubRepos(): Promise<GithubRepo[]> {
    return Array.from(this.repos.values()).map(repo => ({
      ...repo,
      description: repo.description || null,
      language: repo.language || null,
      stars: repo.stars ?? 0,
      featured: repo.featured ?? false,
      updatedAt: new Date(repo.updatedAt),
      createdAt: new Date(repo.createdAt!)
    })).sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0));
  }

  async getFeaturedGithubRepos(): Promise<GithubRepo[]> {
    return Array.from(this.repos.values()).filter(repo => repo.featured).map(repo => ({
      ...repo,
      description: repo.description || null,
      language: repo.language || null,
      stars: repo.stars ?? 0,
      featured: repo.featured ?? false,
      updatedAt: new Date(repo.updatedAt),
      createdAt: new Date(repo.createdAt!)
    })).sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0));
  }

  async createGithubRepo(insertRepo: InsertGithubRepo): Promise<GithubRepo> {
    const id = randomUUID();
    const repo: GithubRepo = {
      ...insertRepo,
      id,
      createdAt: new Date(),
    };
    this.repos.set(id, repo);
    return repo;
  }
}

export const storage = new MemStorage();
