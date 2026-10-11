import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    year: z.string(),
    role: z.string(),
    stack: z.array(z.string()),
    repo: z.url(),
    live: z.url().optional(),
    order: z.number(),
    tagline: z.string(),
    metric: z.string(),
    commits: z.number().optional(),
    diagram: z.enum(["hft", "logs", "sorting", "http206", "yamlgraph", "forge", "guarddog"]),
  }),
});

export const collections = { projects };
