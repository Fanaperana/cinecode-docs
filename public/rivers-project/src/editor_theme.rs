// blend two hex channels by a factor t
fn blend(a: u32, b: u32, t: f32) -> u32 {
    let v = a as f32 * (1.0 - t) + b as f32 * t;
    return v.round() as u32;
}

fn main() {
    let theme = "ocean";
    println!("{theme} = {}", blend(0x10, 0xF0, 0.5));
}
