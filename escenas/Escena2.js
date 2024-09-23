class Escena2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create(){
        this.anims.create({
            key: "quieto",
            frames: this.anims.generateFrameNumbers("player",{start:0, end: 5}),
            frameRate:8,
            repeat:-1
        })
        this.anims.create({
            key: "caminar",
            frames: this.anims.generateFrameNumbers("playerWalk",{start:0, end: 7}),
            frameRate:8,
            repeat:-1
        })
        this.anims.create({
            key: "correr",
            frames: this.anims.generateFrameNumbers("playerRun",{start:0, end: 7}),
            frameRate:8,
            repeat:-1
        })

        //Fondo
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0)
        //Plataformas
        this.plataformas = this.physics.add.staticGroup()
        this.plataformas.create(500,900, "plataforma").setScale(2);
        this.plataformas.create(438,900, "plataforma").setScale(2);
        this.plataformas.create(564,900, "plataforma").setScale(2);
        this.plataformas.create(628,900, "plataforma").setScale(2);

        this.plataformas.create(1500,700, "plataforma").setScale(2);
        this.plataformas.create(1438,700, "plataforma").setScale(2);
        this.plataformas.create(1564,700, "plataforma").setScale(2);
        this.plataformas.create(1628,700, "plataforma").setScale(2);

        //Suelo
        this.plataformas.create(0,1080, "plataforma").setScale(1);
        this.plataformas.create(64,1080, "plataforma").setScale(1);
        this.plataformas.create(128,1080, "plataforma").setScale(1);
        this.plataformas.create(192,1080, "plataforma").setScale(1);
        this.plataformas.create(256,1080, "plataforma").setScale(1);
        this.plataformas.create(320,1080, "plataforma").setScale(1);
        this.plataformas.create(384,1080, "plataforma").setScale(1);
        this.plataformas.create(448,1080, "plataforma").setScale(1);
        this.plataformas.create(512,1080, "plataforma").setScale(1);
        this.plataformas.create(576,1080, "plataforma").setScale(1);
        this.plataformas.create(640,1080, "plataforma").setScale(1);
        this.plataformas.create(704,1080, "plataforma").setScale(1);
        this.plataformas.create(768,1080, "plataforma").setScale(1);
        this.plataformas.create(832,1080, "plataforma").setScale(1);
        this.plataformas.create(896,1080, "plataforma").setScale(1);
        this.plataformas.create(960,1080, "plataforma").setScale(1);
        this.plataformas.create(1024,1080, "plataforma").setScale(1);
        this.plataformas.create(1088,1080, "plataforma").setScale(1);
        this.plataformas.create(1152,1080, "plataforma").setScale(1);
        this.plataformas.create(1216,1080, "plataforma").setScale(1);
        this.plataformas.create(1280,1080, "plataforma").setScale(1);
        this.plataformas.create(1344,1080, "plataforma").setScale(1);
        this.plataformas.create(1408,1080, "plataforma").setScale(1);
        this.plataformas.create(1472,1080, "plataforma").setScale(1);
        this.plataformas.create(1536,1080, "plataforma").setScale(1);
        this.plataformas.create(1600,1080, "plataforma").setScale(1);
        this.plataformas.create(1664,1080, "plataforma").setScale(1);
        this.plataformas.create(1728,1080, "plataforma").setScale(1);
        //Jugador
        this.player = this.physics.add.sprite(100,100, "player");
        this.player.setScale(2.5);
        this.player.setSize(40,90);
        this.player.setOffset(45,40);
        this.player.setCollideWorldBounds(true);
        //Mandos
        this.cursors = this.input.keyboard.createCursorKeys();
        //Colisiones
        this.physics.add.collider(this.plataformas, this.player)
        this.physics.add.collider(this.plataformas, this.player)

        this.add.text(20, 20, "Jugando...", {font: "25px Arial", fill:"yellow"});
    }

    update(){
        if(this.cursors.right.isDown){
            this.player.setVelocityX(200)
            this.player.anims.play("caminar", true)
            this.player.flipX=false;
        } else if(this.cursors.left.isDown){
            this.player.setVelocityX(-200)
            this.player.anims.play("caminar", true)
            this.player.flipX=true;
        }
        else{
            this.player.setVelocityX(0)
            this.player.anims.play("quieto", true);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-600)
        }
    }
}