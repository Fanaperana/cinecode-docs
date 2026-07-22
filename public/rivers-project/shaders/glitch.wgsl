// glitch.wgsl — a region effect that samples and distorts what's beneath it.
//
// An overlay/region shader: place it over a block of code, a title, or any
// area, and it RGB-splits + jitters that region (a "datamosh"/chromatic glitch).
// `u.params.x` is the intensity; `u.time` animates it.

fn rand(p: f32) -> f32 {
    return fract(sin(p * 78.233) * 43758.5453);
}

fn shade(uv: vec2<f32>, local: vec2<f32>, frag: vec2<f32>) -> vec4<f32> {
    // Pulse the intensity so it flickers rather than sits static.
    let amt = u.params.x * (0.45 + 0.55 * abs(sin(u.time * 6.0)));

    // Per-row horizontal jitter, quantized into scan bands.
    let band = floor(local.y * 18.0);
    let jitter = (rand(band + floor(u.time * 12.0)) - 0.5) * amt * 0.05;

    // Chromatic aberration: sample R/G/B at slightly different offsets.
    let r = textureSample(src, samp, uv + vec2<f32>(jitter + amt * 0.004, 0.0)).r;
    let g = textureSample(src, samp, uv + vec2<f32>(jitter, 0.0)).g;
    let b = textureSample(src, samp, uv + vec2<f32>(jitter - amt * 0.004, 0.0)).b;
    var col = vec3<f32>(r, g, b);

    // Occasional bright scan flash.
    col = col + amt * 0.04 * rand(band * 7.0 + floor(u.time * 20.0));
    return vec4<f32>(col, 1.0);
}
