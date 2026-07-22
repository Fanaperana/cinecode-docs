fn bfs(start, graph) {
    let mut queue = VecDeque::from([start]);
    while let Some(node) = queue.pop_front() {
        for next in graph.neighbors(node) {
            if visited.insert(next) {
                queue.push_back(next);
            }
        }
    }
}
