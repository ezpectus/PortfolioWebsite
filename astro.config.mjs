import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Canonical host — Netlify/override via SITE_URL; defaults to Pages.
  site: process.env.SITE_URL ?? "https://ezpectus.github.io",
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
