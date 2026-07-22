fn route(packet, server) {
    let path = shortest_path(packet, server);
    for hop in path {
        forward(packet, hop);
    }
}
