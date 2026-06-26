# CineCode Documentation

The official documentation site for [**CineCode**](https://github.com/Fanaperana/cinecode)
— a pure-Rust, deterministic cinematic engine for turning source code into
programming documentaries.

Built with [Fumadocs](https://fumadocs.dev) and structured with the
[Diátaxis](https://diataxis.fr) framework. Every video embedded in the docs is
**real, unedited CineCode output**.

## Structure

The documentation is organized into the four Diátaxis quadrants under
`content/docs/`:

| Section | Need it serves |
| --- | --- |
| **Tutorials** | Learning — hands-on lessons from install to a finished film. |
| **How-to guides** | Tasks — focused recipes for a specific job. |
| **Reference** | Information — precise descriptions of every command, key, and function. |
| **Explanation** | Understanding — the ideas and architecture behind the engine. |

## Development

```bash
npm install        # runs `fumadocs-mdx` via postinstall
npm run dev        # start the dev server at http://localhost:3000
npm run build      # production build
npm run types:check
```

Open http://localhost:3000 to view the site.

## Project layout

```text
cinecode-docs/
├── app/                 # Next.js App Router (home page, docs routes, OG, llms.txt)
├── components/
│   ├── mdx.tsx          # registers MDX components (incl. <Video>)
│   └── video.tsx        # <Video> / <VideoGrid> for embedding rendered output
├── content/docs/        # all documentation (Diátaxis MDX + meta.json)
├── lib/                 # shared config, source loader, layout options
└── public/videos/       # rendered example clips + poster thumbnails
```

## Embedding videos

Drop an MP4 in `public/videos/<name>.mp4` (and an optional poster at
`public/videos/posters/<name>.jpg`), then reference it by name in any MDX page:

```mdx
<Video src="terrain" caption="Terrain heightmap bound to code." />
```

The clips here are rendered from the
[`rivers-project`](https://github.com/Fanaperana/cinecode/tree/main/examples/rivers-project)
example:

```bash
cinecode render examples/rivers-project -o public/videos/rivers-full.mp4
```

## License

Documentation content follows the license of the
[CineCode engine repository](https://github.com/Fanaperana/cinecode).
