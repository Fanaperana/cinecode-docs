fn step(grid) {
    for cell in grid {
        let n = live_neighbors(cell);
        cell.next = match (cell.alive, n) {
            (true, 2) | (_, 3) => true,
            _ => false,
        };
    }
}
