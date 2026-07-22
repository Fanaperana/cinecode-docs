func erode(g []Cell, rain float64) {
	for _, c := range g {
		c.Value -= c.Slope() * rain
	}
}
