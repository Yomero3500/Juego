var config = {
    type: Phaser.AUTO,
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    physics:{
        default: "arcade",
        arcade: {
            gravity: { y: 800},
            debug: true
        }
    },
    backgroundColor: 0x000000,
    scene: [Escena1, Escena2],
    pixelArt: true
}

window.onload = function() {
    var game = new Phaser.Game(config);
}