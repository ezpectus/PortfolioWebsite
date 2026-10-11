/** Prefix a site path with the configured base ("/" locally/Netlify, "/PortfolioWebsite/" on Pages). */
export const u = (p: string): string =>
  import.meta.env.BASE_URL.replace(/\/$/, "") + "/" + p.replace(/^\//, "");
