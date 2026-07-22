def erode(grid, rain):
    for cell in grid:
        flow = cell.slope() * rain
        cell.value -= flow * RATE
