let mut open = BinaryHeap::new();
open.push(start);
while let Some(current) = open.pop() {
    if current == goal { return reconstruct(came_from, goal); }
    for next in neighbors(current) {
        open.push(next);
    }
}
