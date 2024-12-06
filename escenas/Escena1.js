class Escena1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload(){
        this.load.image("background", ".//assets/SCENARY/Battleground1.png");
        this.load.image("plataforma", ".//assets/SCENARY/plataforma.png");
        this.load.spritesheet("player", ".//assets/PLAYER/Idle.png", {frameWidth:128, frameHeight:128});
        this.load.spritesheet("playerWalk", ".//assets/PLAYER/Walk.png", {frameWidth:128, frameHeight:128});
        this.load.spritesheet("playerDead", ".//assets/PLAYER/Dead.png", {frameWidth:128, frameHeight:128});
        this.load.spritesheet("playerRun", ".//assets/PLAYER/Run.png", {frameWidth:128, frameHeight:128});
        this.load.image("enemy", ".//assets/ENEMIES/enemigo.png", {frameWidth:520, frameHeight:420});
    }

    create() {
        // Mostrar texto para indicar que el juego está cargando
        this.add.text(20, 20, "Cargando juego...");

        // Esperar un clic del usuario para iniciar la siguiente escena
        this.input.once('pointerdown', () => {
            this.scene.start("playGame");
        });
    }
}
