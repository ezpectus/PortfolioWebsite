/**
 * GitHub data at build time. Every call has a static fallback —
 * a rate-limited or offline build must still succeed.
 * CI sets GITHUB_TOKEN (automatic secret); locally builds run unauthenticated.
 */
const OWNER = "ezpectus";
const token = import.meta.env.GITHUB_TOKEN;

const headers: Record<string, string> = {
  "User-Agent": "portfolio-build",
  Accept: "application/vnd.github+json",
};
if (token) headers.Authorization = `Bearer ${token}`;

export interface CommitWindow {
  count: number;
  first: string; // ISO date
  last: string; // ISO date
}

const windowCache = new Map<string, CommitWindow | null>();

export async function getPublicRepoCount(fallback: number): Promise<number> {
  try {
    const r = await fetch(`https://api.github.com/users/${OWNER}`, { headers });
    if (!r.ok) return fallback;
    const n = (await r.json()).public_repos;
    return typeof n === "number" ? n : fallback;
  } catch {
    return fallback;
  }
}

export async function getCommitWindow(repo: string): Promise<CommitWindow | null> {
  if (windowCache.has(repo)) return windowCache.get(repo)!;
  let out: CommitWindow | null = null;
  try {
    const r = await fetch(`https://api.github.com/repos/${OWNER}/${repo}/commits?per_page=1`, {
      headers,
    });
    if (r.ok) {
      const latest = (await r.json()) as { commit?: { author?: { date?: string } } }[];
      const last = latest[0]?.commit?.author?.date;
      if (last) {
        const m = (r.headers.get("link") ?? "").match(/page=(\d+)>; rel="last"/);
        const count = m ? Number(m[1]) : 1;
        let first = last;
        if (m) {
          const r2 = await fetch(
            `https://api.github.com/repos/${OWNER}/${repo}/commits?per_page=1&page=${count}`,
            { headers },
          );
          if (r2.ok) {
            const oldest = (await r2.json()) as {
              commit?: { author?: { date?: string } };
            }[];
            first = oldest[0]?.commit?.author?.date ?? last;
          }
        }
        out = { count, first, last };
      }
    }
  } catch {
    /* fall through → null */
  }
  windowCache.set(repo, out);
  return out;
}

/** "https://github.com/ezpectus/foo" → "foo"; trailing dot stripped (TaskManager_App.) */
export function repoFromUrl(url: string | undefined): string | null {
  const m = url?.match(/github\.com\/ezpectus\/([^/?#]+)/);
  const name = m?.[1];
  return name ? name.replace(/\.$/, "") : null;
}

/** ISO date → month index where Jul 2025 = 0. */
export function monthIndex(iso: string): number {
  const d = new Date(iso);
  return (d.getUTCFullYear() - 2025) * 12 + d.getUTCMonth() - 6;
}
