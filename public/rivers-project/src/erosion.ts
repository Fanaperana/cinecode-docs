function erode(grid: Cell[], rain: number) {
  for (const cell of grid) {
    const flow = cell.slope() * rain;
    cell.value -= flow * RATE;
  }
}
