self.onmessage = (e) => {
    const action = e.data.action;
    
    if (action === 'play') {
        const audio = new Audio('../assets/SCENARY/track2.mp3'); 
        audio.loop = true;
        audio.play().catch(err => console.error("Error al reproducir la música", err));
        self.postMessage('Music playing');
    } else if (action === 'stop') {
        const audio = new Audio('path/to/music.mp3');
        audio.pause();
        audio.currentTime = 0;
        self.postMessage('Music stopped');
    }
};
