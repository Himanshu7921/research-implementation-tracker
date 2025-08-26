import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const researchPapers = pgTable("research_papers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  abstract: text("abstract").notNull(),
  authors: text("authors").array().notNull(),
  venue: text("venue").notNull(),
  date: timestamp("date").notNull(),
  status: varchar("status", { enum: ["published", "under-review", "accepted", "completed"] }).notNull(),
  tags: text("tags").array().notNull(),
  pdfUrl: text("pdf_url"),
  codeUrl: text("code_url"),
  demoUrl: text("demo_url"),
  views: integer("views").default(0),
  downloads: integer("downloads").default(0),
  citations: integer("citations").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const researchProjects = pgTable("research_projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: varchar("status", { enum: ["in-progress", "completed", "planned", "paused"] }).notNull(),
  progress: integer("progress").default(0),
  startDate: timestamp("start_date").notNull(),
  expectedCompletion: timestamp("expected_completion"),
  actualCompletion: timestamp("actual_completion"),
  tags: text("tags").array().notNull(),
  category: varchar("category", { enum: ["current", "future"] }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const githubRepos = pgTable("github_repos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  language: text("language"),
  stars: integer("stars").default(0),
  url: text("url").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertResearchPaperSchema = createInsertSchema(researchPapers).omit({
  id: true,
  createdAt: true,
  views: true,
  downloads: true,
  citations: true,
});

export const insertResearchProjectSchema = createInsertSchema(researchProjects).omit({
  id: true,
  createdAt: true,
});

export const insertGithubRepoSchema = createInsertSchema(githubRepos).omit({
  id: true,
  createdAt: true,
});

export type InsertResearchPaper = z.infer<typeof insertResearchPaperSchema>;
export type InsertResearchProject = z.infer<typeof insertResearchProjectSchema>;
export type InsertGithubRepo = z.infer<typeof insertGithubRepoSchema>;

export type ResearchPaper = typeof researchPapers.$inferSelect;
export type ResearchProject = typeof researchProjects.$inferSelect;
export type GithubRepo = typeof githubRepos.$inferSelect;
