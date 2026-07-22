let height = noise(x, y);
let flow = slope(height) * rain;
erode(&mut height, flow);
