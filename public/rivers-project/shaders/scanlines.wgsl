// scanlines.wgsl — a fullscreen CRT post-process applied over the whole frame.
//
// An overlay shader (`overlay_shader`): it samples the fully composited frame
// (`src`) and adds CRT scanlines, a vignette, and a subtle flicker — a retro
// finishing pass on top of everything.

fn shade(uv: vec2<f32>, local: vec2<f32>, frag: vec2<f32>) -> vec4<f32> {
    var col = textureSample(src, samp, uv).rgb;

    // Scanlines tied to physical pixel rows.
    let line = sin(uv.y * u.resolution.y * 3.14159) * 0.5 + 0.5;
    col = col * (1.0 - 0.08 * line);

    // Gentle vignette toward the corners.
    let d = distance(uv, vec2<f32>(0.5, 0.5));
    col = col * smoothstep(0.9, 0.35, d);

    // Faint flicker.
    col = col * (1.0 - 0.02 * sin(u.time * 28.0));
    return vec4<f32>(col, 1.0);
}
