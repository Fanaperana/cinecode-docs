// aurora.wgsl — an animated background gradient (a "plasma"/aurora field).
//
// A background shader: it ignores `src` and paints the whole frame beneath the
// content. Driven by `u.time`; `u.params.x` shifts the hue.
//
// Contract: every shader defines `fn shade(uv, local, frag) -> vec4<f32>`.
// `uv` is frame-normalized (0..1, y down), `local` is 0..1 within the region,
// `frag` is the pixel coordinate. Available globals: `u` (uniforms), `src`
// (frame beneath) and `samp` (sampler).

fn hash(p: vec2<f32>) -> f32 {
    return fract(sin(dot(p, vec2<f32>(127.1, 311.7))) * 43758.5453);
}

fn noise(p: vec2<f32>) -> f32 {
    let i = floor(p);
    let f = fract(p);
    let a = hash(i);
    let b = hash(i + vec2<f32>(1.0, 0.0));
    let c = hash(i + vec2<f32>(0.0, 1.0));
    let d = hash(i + vec2<f32>(1.0, 1.0));
    let w = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, w.x), mix(c, d, w.x), w.y);
}

fn shade(uv: vec2<f32>, local: vec2<f32>, frag: vec2<f32>) -> vec4<f32> {
    let t = u.time * 0.15;
    var p = uv * 3.0;
    p.y = p.y + t;
    var v = noise(p) * 0.5;
    v = v + noise(p * 2.0 + t) * 0.25;
    v = v + noise(p * 4.0 - t) * 0.125;

    let hue = u.params.x;
    let band = smoothstep(0.2, 0.9, v);
    let deep = vec3<f32>(0.02, 0.05, 0.12);
    let mid = vec3<f32>(0.10 + hue, 0.45, 0.55);
    let hi = vec3<f32>(0.45, 0.20, 0.60);
    var col = mix(deep, mid, band);
    col = mix(col, hi, smoothstep(0.6, 1.0, v) * 0.6);
    // Soft vertical vignette so the content reads clearly.
    col = col * (1.0 - 0.35 * abs(uv.y - 0.5));
    return vec4<f32>(col, 1.0);
}
