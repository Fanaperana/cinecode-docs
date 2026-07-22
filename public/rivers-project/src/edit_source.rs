fn normalize(values: &mut [f32]) {
    let max = peak(values);
    for v in values.iter_mut() {
        *v = *v / max;
    }
}
