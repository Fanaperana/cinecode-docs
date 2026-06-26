export const appName = 'CineCode';
export const appTagline =
  'A pure-Rust, deterministic cinematic engine for programming documentaries.';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

/**
 * Base path the site is served under. Empty in development and on root-domain
 * hosts; set to `/cinecode-docs` for the GitHub Pages project site via the
 * `NEXT_PUBLIC_BASE_PATH` build env var.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Prefix an absolute, app-root-relative path with the configured base path. */
export function withBasePath(path: string): string {
  if (!path.startsWith('/')) return path;
  return `${basePath}${path}`;
}

export const gitConfig = {
  user: 'Fanaperana',
  repo: 'cinecode-docs',
  branch: 'main',
};

/** The repository that holds the CineCode engine itself. */
export const engineRepoUrl = 'https://github.com/Fanaperana/cinecode';
