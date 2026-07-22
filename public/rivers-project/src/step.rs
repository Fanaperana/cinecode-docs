fn step(grid: &mut Grid) {
    let rain = 0.2;
    erode(grid, rain);
    settle(grid);
}
