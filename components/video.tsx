import { cn } from '@/lib/cn';

export interface VideoProps {
  /**
   * Either a bare name (e.g. `"terrain"` → `/videos/terrain.mp4`),
   * a path under `/videos`, or a full absolute/remote URL.
   */
  src: string;
  /** Optional poster override. By default we look for `/videos/posters/<name>.jpg`. */
  poster?: string;
  /** Caption shown beneath the player. */
  caption?: string;
  /** Autoplay (muted) when the page loads. Off by default to keep pages light. */
  autoPlay?: boolean;
  /** Loop playback. On by default — these are short demo clips. */
  loop?: boolean;
  /** Show native controls. On by default. */
  controls?: boolean;
  className?: string;
}

function baseName(src: string): string {
  return src
    .replace(/^.*\//, '')
    .replace(/\.mp4$/i, '');
}

function resolveVideo(src: string): string {
  if (src.startsWith('http') || src.startsWith('/')) return src;
  return `/videos/${src}.mp4`;
}

function resolvePoster(src: string, poster?: string): string | undefined {
  if (poster) return poster;
  if (src.startsWith('http')) return undefined;
  return `/videos/posters/${baseName(src)}.jpg`;
}

/**
 * Embed a rendered CineCode output video. Every clip on this site is real
 * engine output rendered straight from the `rivers-project` example.
 */
export function Video({
  src,
  poster,
  caption,
  autoPlay = false,
  loop = true,
  controls = true,
  className,
}: VideoProps) {
  const videoSrc = resolveVideo(src);
  const posterSrc = resolvePoster(src, poster);

  return (
    <figure className={cn('my-6 flex flex-col gap-2', className)}>
      <video
        className="w-full rounded-xl border border-fd-border bg-black shadow-lg shadow-black/20"
        src={videoSrc}
        poster={posterSrc}
        controls={controls}
        loop={loop}
        muted
        playsInline
        autoPlay={autoPlay}
        preload="metadata"
      >
        Your browser does not support the video tag.{' '}
        <a href={videoSrc}>Download the clip</a>.
      </video>
      {caption ? (
        <figcaption className="text-center text-sm text-fd-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * A responsive grid of videos — handy for "every variant side by side"
 * galleries (themes, simulations, easing curves, …).
 */
export function VideoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
  );
}
