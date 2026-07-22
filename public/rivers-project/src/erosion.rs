fn erode(height: &mut Grid, rain: f32) {
    for cell in height.cells_mut() {
        let flow = cell.slope() * rain;
        cell.value -= flow * EROSION_RATE;
        cell.deposit(flow * 0.3);
    }
}
