import Link from 'next/link';
import { Video } from '@/components/video';
import { engineRepoUrl } from '@/lib/shared';

const quadrants = [
  {
    title: 'Tutorials',
    href: '/docs/tutorials',
    blurb: 'Learning-oriented lessons. Start here and render your first video.',
    icon: '🎓',
  },
  {
    title: 'How-to guides',
    href: '/docs/how-to',
    blurb: 'Task-oriented recipes for getting a specific job done.',
    icon: '🛠️',
  },
  {
    title: 'Reference',
    href: '/docs/reference',
    blurb: 'Every function, flag, and parameter — described precisely.',
    icon: '📖',
  },
  {
    title: 'Explanation',
    href: '/docs/explanation',
    blurb: 'Understanding-oriented discussion of how and why CineCode works.',
    icon: '💡',
  },
];

const features = [
  ['Pure Rust', 'No Node.js, no browser, no headless Chrome. One binary + ffmpeg.'],
  ['Deterministic', 'The same project renders the same pixels, every time, on every OS.'],
  ['Code-first', 'Code is a first-class visual object: type it, edit it, spotlight it.'],
  ['Living diagrams', 'Terrain, A*, particles, graphs, Game of Life and boids bind to code.'],
  ['Cinematic camera', 'Pan, zoom and rack-focus to choreograph a documentary.'],
  ['GPU shaders', 'Drop in WGSL effects and a bloom post-process with one flag.'],
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 py-16">
      <div className="flex w-full max-w-4xl flex-col items-center text-center">
        <span className="mb-4 rounded-full border border-fd-border px-3 py-1 text-xs text-fd-muted-foreground">
          🎬 Programming documentaries, rendered from code
        </span>
        <h1 className="bg-gradient-to-b from-fd-foreground to-fd-muted-foreground bg-clip-text text-4xl font-bold text-transparent sm:text-6xl">
          CineCode
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-fd-muted-foreground">
          A pure-Rust, deterministic cinematic engine for turning source code
          into beautiful, reproducible programming videos.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs/tutorials/your-first-video"
            className="rounded-lg bg-fd-primary px-5 py-2.5 font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            Render your first video →
          </Link>
          <Link
            href="/docs"
            className="rounded-lg border border-fd-border px-5 py-2.5 font-medium transition-colors hover:bg-fd-accent"
          >
            Read the docs
          </Link>
          <a
            href={engineRepoUrl}
            className="rounded-lg border border-fd-border px-5 py-2.5 font-medium transition-colors hover:bg-fd-accent"
          >
            GitHub
          </a>
        </div>

        <div className="mt-12 w-full">
          <Video
            src="rivers-full"
            autoPlay
            caption="“How Rivers Form” — the full 17-scene example documentary, rendered by CineCode."
          />
        </div>
      </div>

      <section className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(([title, blurb]) => (
          <div
            key={title}
            className="rounded-xl border border-fd-border bg-fd-card p-5 text-left"
          >
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-fd-muted-foreground">{blurb}</p>
          </div>
        ))}
      </section>

      <section className="mt-20 w-full max-w-4xl">
        <h2 className="text-center text-2xl font-bold">
          Documentation, the Diátaxis way
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-fd-muted-foreground">
          Four kinds of documentation for four kinds of need — so you always
          land in the right place.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {quadrants.map((q) => (
            <Link
              key={q.title}
              href={q.href}
              className="group rounded-xl border border-fd-border bg-fd-card p-6 text-left transition-colors hover:bg-fd-accent"
            >
              <div className="text-2xl">{q.icon}</div>
              <h3 className="mt-3 font-semibold group-hover:text-fd-primary">
                {q.title}
              </h3>
              <p className="mt-1 text-sm text-fd-muted-foreground">{q.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-20 text-sm text-fd-muted-foreground">
        Built with{' '}
        <a className="underline" href="https://fumadocs.dev">
          Fumadocs
        </a>
        . Every clip on this site is real, unedited CineCode output.
      </footer>
    </main>
  );
}
