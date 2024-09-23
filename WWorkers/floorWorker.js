self.onmessage = function(e) {
    let platformPositions = [];
    for (let i = 0; i < e.data.width; i += e.data.step) {
        platformPositions.push({ x: i, y: e.data.y });
    }
    postMessage(platformPositions);
};
