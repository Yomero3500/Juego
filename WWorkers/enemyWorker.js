self.onmessage = function(e) {
    let enemiesData = [];
    for (let i = 0; i < e.data.count; i++) {
        enemiesData.push({
            x: e.data.startX + i * e.data.stepX, 
            y: e.data.startY,                  
            velocityX: Math.random() * 300 + 100, 
            bounce: 1
        });
    }
    postMessage(enemiesData); 
};
