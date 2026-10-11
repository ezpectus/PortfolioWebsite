import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://ezpectus.github.io",
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
