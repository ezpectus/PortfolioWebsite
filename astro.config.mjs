import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Canonical host: explicit SITE_URL → Netlify's built-in URL → live site.
  // Netlify is the canonical deploy; Pages (if enabled) is the mirror.
  site:
    process.env.SITE_URL ??
    process.env.URL ??
    "https://denys-stepanenko.netlify.app",
  // Pages serves project repos at /<repo>/ — CI sets DEPLOY_BASE=/PortfolioWebsite.
  // Netlify/local build with no env → base "/".
  base: process.env.DEPLOY_BASE ?? "/",
  integrations: [sitemap()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
