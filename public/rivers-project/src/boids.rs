fn flock(boids) {
    for b in boids {
        let sep = separation(b, boids);
        let ali = alignment(b, boids);
        let coh = cohesion(b, boids);
        b.velocity += sep + ali + coh;
    }
}
