import { cn } from '@/lib/cn';
import { withBasePath } from '@/lib/shared';

interface SourceFile {
  path: string;
  role: string;
  language?: string;
  code?: string;
}

interface SourceBundle {
  summary: string;
  files: SourceFile[];
}

const exampleBaseUrl =
  'https://github.com/Fanaperana/cinecode/tree/main/examples/rivers-project';

const manifestFile: SourceFile = {
  path: 'codescene.toml',
  role: 'Project manifest: output size, theme, scene order, transitions, and shader names.',
  language: 'toml',
  code: `scenes = ["scenes/intro.ccs", "scenes/terrain.ccs", "scenes/pathfind.ccs", "scenes/particles.ccs", "scenes/graph.ccs", "scenes/life.ccs", "scenes/boids.ccs", "scenes/tweens.ccs", "scenes/inserts.ccs", "scenes/edit.ccs", "scenes/edit_source.ccs", "scenes/editor_theme.ccs", "scenes/font_set.ccs", "scenes/remove_styles.ccs", "scenes/morph.ccs", "scenes/shapes.ccs", "scenes/effects.ccs"]
theme = "dark_documentary"

[episode]
title = "How Rivers Form"

[output]
fps = 30
width = 1280
height = 720

[shaders]
aurora = "shaders/aurora.wgsl"
glitch = "shaders/glitch.wgsl"
scanlines = "shaders/scanlines.wgsl"

[transition]
kind = "crossfade"
frames = 18`,
};

const sourceBundles: Record<string, SourceBundle> = {
  first_video: {
    summary: 'The starter project created by `cinecode new my-video`: one manifest, one scene script, and one Rust file.',
    files: [
      {
        path: 'codescene.toml',
        role: 'Tells CineCode to render `scenes/intro.ccs` at 1280x720 and 30 fps.',
        language: 'toml',
        code: `scenes = ["scenes/intro.ccs"]
theme = "dark_documentary"

[episode]
title = "my-video"

[output]
fps = 30
width = 1280
height = 720`,
      },
      {
        path: 'scenes/intro.ccs',
        role: 'The storyboard: create a scene, read `src/main.rs`, animate it, and move the camera.',
        language: 'rust',
        code: `let s = scene("Intro", 150);

s.text("Hello, CineCode", 96, 48).font_size(52).glow(0.5).fade_in(0, 18);

let code = s.code(read("src/main.rs"), "rust", 96, 150);
code.font_size(34).shadow(0.5).fade_in(0, 16).typewriter(6, 70);
code.spotlight(2, 0.6, 90, 18);

let cam = s.camera();
cam.focus_on(code, 96, 24, 1.6, 2);
cam.zoom_to(1, 130, 24);`,
      },
      {
        path: 'src/main.rs',
        role: 'The real code being filmed by `read("src/main.rs")`.',
        language: 'rust',
        code: `fn main() {
    let greeting = "Hello, CineCode!";
    println!("{greeting}");
}`,
      },
    ],
  },
  spotlight: {
    summary: 'A small tutorial project: `src/main.rs` is typed, then the script spotlights line 2 and line 3.',
    files: [
      {
        path: 'scenes/intro.ccs',
        role: 'Adds the line spotlight, underline, and camera timing.',
        language: 'rust',
        code: `let s = scene("Intro", 220);

let code = s.code(read("src/main.rs"), "rust", 96, 150);
code.font_size(38).fade_in(0, 16).typewriter(6, 70);

code.spotlight(2, 0.6, 92, 18);
s.underline(code, 2, 98, 12);
code.spotlight(3, 0.6, 150, 24);
code.unfocus(200, 16);`,
      },
      {
        path: 'src/main.rs',
        role: 'The function being explained on screen.',
        language: 'rust',
        code: `fn divide(a: i32, b: i32) -> i32 {
    let result = a / b;
    println!("{a} / {b} = {result}");
    return result;
}`,
      },
    ],
  },
  intro: {
    summary: 'The opening scene from the `rivers-project` example.',
    files: [manifestFile, scene('intro', 'Reads the erosion source, types it in, spotlights line 4, and moves the camera.'), rustSource('erosion', 'The Rust code shown in the opening shot.', `fn erode(height: &mut Grid, rain: f32) {
    for cell in height.cells_mut() {
        let flow = cell.slope() * rain;
        cell.value -= flow * EROSION_RATE;
        cell.deposit(flow * 0.3);
    }
}`)],
  },
  terrain: {
    summary: 'A terrain simulation bound to the line of code that computes a height value.',
    files: [manifestFile, scene('terrain', 'Creates the terrain node, configures the heightmap, and links line 1 to the reveal.'), rustSource('terrain', 'The source snippet shown beside the terrain.', `let height = noise(x, y);
let flow = slope(height) * rain;
erode(&mut height, flow);`)],
  },
  pathfind: {
    summary: 'An A* grid simulation bound to the loop that explores neighbors.',
    files: [manifestFile, scene('pathfind', 'Creates the A* grid, seeds walls, links line 3 to the search, and spotlights path reconstruction.'), rustSource('astar', 'The A* snippet shown in the scene.', `let mut open = BinaryHeap::new();
open.push(start);
while let Some(current) = open.pop() {
    if current == goal { return reconstruct(came_from, goal); }
    for next in neighbors(current) {
        open.push(next);
    }
}`)],
  },
  particles: simulationBundle('particles', 'network', 'A particle stream showing packets moving from code to server.', 'Creates the packet-flow simulation and links it to `forward(packet, hop)`.', `fn route(packet, server) {
    let path = shortest_path(packet, server);
    for hop in path {
        forward(packet, hop);
    }
}`),
  graph: simulationBundle('graph', 'bfs', 'A breadth-first traversal spreading across a graph.', 'Creates the graph simulation and links it to the BFS loop.', `fn bfs(start, graph) {
    let mut queue = VecDeque::from([start]);
    while let Some(node) = queue.pop_front() {
        for next in graph.neighbors(node) {
            if visited.insert(next) {
                queue.push_back(next);
            }
        }
    }
}`),
  life: simulationBundle('life', 'life', 'Conway\'s Game of Life bound to the neighbor-counting logic.', 'Creates the life grid and links it to the update rule.', `fn step(grid) {
    for cell in grid {
        let n = live_neighbors(cell);
        cell.next = match (cell.alive, n) {
            (true, 2) | (_, 3) => true,
            _ => false,
        };
    }
}`),
  boids: simulationBundle('boids', 'boids', 'A flocking simulation bound to separation, alignment, and cohesion.', 'Creates the boids node and links the flocking forces to the code.', `fn flock(boids) {
    for b in boids {
        let sep = separation(b, boids);
        let ali = alignment(b, boids);
        let coh = cohesion(b, boids);
        b.velocity += sep + ali + coh;
    }
}`),
  tweens: simpleSceneBundle('tweens', 'A gallery scene showing easing curves and tween presets.'),
  inserts: simpleSceneBundle('inserts', 'A scene script that creates insert, shift, and spotlight animations.'),
  edit: simpleSceneBundle('edit', 'A complete live-edit scene that types, removes, and retypes code on screen.'),
  edit_source: {
    summary: 'A live refactor scene: the script reads a risky function and animates the inserted guard clause.',
    files: [manifestFile, scene('edit_source', 'Reads `src/edit_source.rs`, spotlights the risky division, then animates the guard insertion.'), rustSource('edit_source', 'The unmodified Rust file used as the starting point for the animation.', `fn normalize(values: &mut [f32]) {
    let max = peak(values);
    for v in values.iter_mut() {
        *v = *v / max;
    }
}`)],
  },
  editor_theme: {
    summary: 'The same Rust source rendered repeatedly with different syntax highlight themes.',
    files: [manifestFile, scene('editor_theme', 'Builds one code panel per highlight theme and sequences them over time.'), rustSource('editor_theme', 'The Rust sample rendered under each theme.', `fn blend(a: u32, b: u32, t: f32) -> u32 {
    let v = a as f32 * (1.0 - t) + b as f32 * t;
    return v.round() as u32;
}

fn main() {
    let theme = "ocean";
    println!("{theme} = {}", blend(0x10, 0xF0, 0.5));
}`)],
  },
  font_set: simpleSceneBundle('font_set', 'A text-node font gallery using system fonts.'),
  remove_styles: simpleSceneBundle('remove_styles', 'A backspace and removal-style gallery.'),
  morph: simpleSceneBundle('morph', 'A word-to-word morph gallery built from text nodes at the same position.'),
  shapes: {
    summary: 'A vector shape and image-import showcase.',
    files: [manifestFile, scene('shapes', 'Draws rectangles, circles, paths, computed polygons, and imports `assets/logo.svg`.'), asset('assets/logo.svg', 'The SVG image imported by `s.image(...)`.')],
  },
  effects: effectsBundle(),
  effects_gpu: effectsBundle(),
  'rivers-full': {
    summary: 'The complete `rivers-project` render. These are the project files that compose the 17-scene documentary.',
    files: [
      manifestFile,
      scene('intro', 'Opening camera move and erosion-code spotlight.'),
      scene('terrain', 'Terrain heightmap simulation.'),
      scene('pathfind', 'A* grid simulation.'),
      scene('particles', 'Packet-routing particle flow.'),
      scene('graph', 'Breadth-first graph traversal.'),
      scene('life', 'Conway life grid.'),
      scene('boids', 'Flocking simulation.'),
      scene('tweens', 'Easing and tween gallery.'),
      scene('inserts', 'Insert animations.'),
      scene('edit', 'Live editing sequence.'),
      scene('edit_source', 'Guard-clause refactor animation.'),
      scene('editor_theme', 'Syntax-theme gallery.'),
      scene('font_set', 'Font gallery.'),
      scene('remove_styles', 'Removal styles.'),
      scene('morph', 'Morph styles.'),
      scene('shapes', 'Shapes and SVG import.'),
      scene('effects', 'GPU shader finale.'),
      rustSource('erosion', 'Source for the intro and effects scenes.'),
      rustSource('terrain', 'Source shown beside the terrain scene.'),
      rustSource('astar', 'Source shown beside the pathfinding scene.'),
      rustSource('network', 'Source shown beside the particles scene.'),
      rustSource('bfs', 'Source shown beside the graph scene.'),
      rustSource('life', 'Source shown beside the Game of Life scene.'),
      rustSource('boids', 'Source shown beside the boids scene.'),
      rustSource('edit_source', 'Source used by the live-refactor scene.'),
      rustSource('editor_theme', 'Source used by the theme gallery.'),
      shader('aurora', 'Animated background shader for the GPU finale.'),
      shader('glitch', 'Region shader placed over the code block.'),
      shader('scanlines', 'Fullscreen overlay shader.'),
      asset('assets/logo.svg', 'SVG imported by the shapes scene.'),
    ],
  },
};

function scene(name: string, role: string): SourceFile {
  return { path: `scenes/${name}.ccs`, role, language: 'rust' };
}

function rustSource(name: string, role: string, code?: string): SourceFile {
  return { path: `src/${name}.rs`, role, language: 'rust', code };
}

function shader(name: string, role: string): SourceFile {
  return { path: `shaders/${name}.wgsl`, role, language: 'wgsl' };
}

function asset(path: string, role: string): SourceFile {
  return { path, role };
}

function simpleSceneBundle(name: string, summary: string): SourceBundle {
  return {
    summary,
    files: [manifestFile, scene(name, 'The scene script that creates the rendered clip.')],
  };
}

function simulationBundle(
  sceneName: string,
  sourceName: string,
  summary: string,
  sceneRole: string,
  code: string,
): SourceBundle {
  return {
    summary,
    files: [manifestFile, scene(sceneName, sceneRole), rustSource(sourceName, 'The source code shown beside the simulation.', code)],
  };
}

function effectsBundle(): SourceBundle {
  return {
    summary: 'The GPU effects scene: a scene script, one Rust source file, and three WGSL shaders registered in the manifest.',
    files: [
      manifestFile,
      scene('effects', 'Creates the background shader, region glitch, overlay shader, and insert animations.'),
      rustSource('erosion', 'The code block distorted by the region shader.', `fn erode(height: &mut Grid, rain: f32) {
    for cell in height.cells_mut() {
        let flow = cell.slope() * rain;
        cell.value -= flow * EROSION_RATE;
        cell.deposit(flow * 0.3);
    }
}`),
      shader('aurora', 'Animated background shader.'),
      shader('glitch', 'Region shader over the code block.'),
      shader('scanlines', 'Fullscreen CRT-style overlay shader.'),
    ],
  };
}

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

function exampleFileUrl(path: string): string {
  return `${exampleBaseUrl}/${path}`;
}

function resolveVideo(src: string): string {
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return withBasePath(src);
  return withBasePath(`/videos/${src}.mp4`);
}

function resolvePoster(src: string, poster?: string): string | undefined {
  if (poster) return poster.startsWith('http') ? poster : withBasePath(poster);
  if (src.startsWith('http')) return undefined;
  return withBasePath(`/videos/posters/${baseName(src)}.jpg`);
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
  const bundle = sourceBundles[baseName(src)];

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
      {bundle ? <SourceBundleDetails bundle={bundle} /> : null}
    </figure>
  );
}

function SourceBundleDetails({ bundle }: { bundle: SourceBundle }) {
  return (
    <details className="rounded-lg border border-fd-border bg-fd-card/60 p-4 text-sm">
      <summary className="cursor-pointer font-medium text-fd-foreground">
        Files that made this video
      </summary>
      <p className="mt-3 text-fd-muted-foreground">{bundle.summary}</p>
      <ul className="mt-3 space-y-2">
        {bundle.files.map((file) => (
          <li key={file.path}>
            <a
              className="font-mono text-fd-primary underline underline-offset-4"
              href={exampleFileUrl(file.path)}
              target="_blank"
              rel="noreferrer"
            >
              {file.path}
            </a>
            <span className="text-fd-muted-foreground"> - {file.role}</span>
            {file.code ? (
              <pre className="mt-2 overflow-x-auto rounded-md border border-fd-border bg-fd-muted/40 p-3 text-xs leading-5">
                <code>{file.code}</code>
              </pre>
            ) : null}
          </li>
        ))}
      </ul>
    </details>
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
