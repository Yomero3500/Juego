let score = 0;
let counting = true;

function startCounting() {
    setInterval(() => {
        if (counting) {
            score++;
            postMessage(score); 
        }
    }, 1000);
}

self.onmessage = function(e) {
    if (e.data === 'start') {
        counting = true;
        startCounting();
    } else if (e.data === 'stop') {
        counting = false;
    }
};
