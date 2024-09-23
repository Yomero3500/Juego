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
        this.anims.create({
            key: "muerte",
            frames: this.anims.generateFrameNumbers("playerDead",{start:0, end: 2}),
            frameRate:8,
            repeat:1
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

        this.plataformas.create(738,500, "plataforma").setScale(2);
        this.plataformas.create(800,500, "plataforma").setScale(2);
        this.plataformas.create(864,500, "plataforma").setScale(2);
        this.plataformas.create(928,500, "plataforma").setScale(2);

        this.plataformas.create(1038,700, "plataforma").setScale(2);
        this.plataformas.create(1100,700, "plataforma").setScale(2);
        this.plataformas.create(1164,700, "plataforma").setScale(2);
        this.plataformas.create(1228,700, "plataforma").setScale(2);

        this.plataformas.create(1500,900, "plataforma").setScale(2);
        this.plataformas.create(1438,900, "plataforma").setScale(2);
        this.plataformas.create(1564,900, "plataforma").setScale(2);
        this.plataformas.create(1628,900, "plataforma").setScale(2);

        //Suelo
        const floorWorker = new Worker('.//WWorkers/floorWorker.js');
        let sueloY = 1080; 
        let sueloStep = 64; 
        let screenWidth = 1920;

        floorWorker.postMessage({ width: screenWidth, step: sueloStep, y: sueloY });
        floorWorker.onmessage = (e) => {
            const posicionesSuelo = e.data;

            posicionesSuelo.forEach(pos => {
                this.plataformas.create(pos.x, pos.y, "plataforma").setScale(1);
            });

            floorWorker.terminate();
        };

        //Jugador
        this.player = this.physics.add.sprite(100,700, "player");
        this.player.setScale(2.5);
        this.player.setSize(40,90);
        this.player.setOffset(45,40);
        this.player.setCollideWorldBounds(true);
        //Mandos
        this.cursors = this.input.keyboard.createCursorKeys();
        //Puntos
        let puntosTXT = this.add.text(20, 20, "Puntos: 0", { font: "40px Arial", fill: "yellow" });
        this.score = 0;
    
        this.scoreWorker = new Worker('.//WWorkers/scoreWorker.js');
        this.scoreWorker.postMessage('start');
    
        this.scoreWorker.onmessage = (e) => {
            this.score = e.data;
            puntosTXT.setText("Puntos: " + this.score);
        };

        //Enemigo
        const enemyWorker = new Worker('.//WWorkers/enemyWorker.js');
        let enemyCount = 5;   
        let enemyStartX = 100;  
        let enemyStartY = 50;     
        let enemyStepX = 400;     

        enemyWorker.postMessage({
            count: enemyCount,
            startX: enemyStartX,
            startY: enemyStartY,
            stepX: enemyStepX
        });

        enemyWorker.onmessage = (e) => {
            const enemiesData = e.data;
            let enemigos = this.physics.add.group(); 

            enemiesData.forEach(data => {
                let enemy = enemigos.create(data.x, data.y, "enemy");
                enemy.setScale(0.4);
                enemy.setSize(150, 200);
                enemy.setBounce(data.bounce);
                enemy.setVelocityX(data.velocityX);
                enemy.setCollideWorldBounds(true);
            });
            this.physics.add.collider(this.plataformas, enemigos);
            this.physics.add.overlap(enemigos, this.player, this.gameOver, null, this);
            enemyWorker.terminate();
        };

        //Colisiones
        this.physics.add.collider(this.plataformas, this.player)
        this.physics.add.collider(this.plataformas, this.player)
    }

    update(){
        if(this.cursors.right.isDown){
            this.player.setVelocityX(300)
            this.player.anims.play("correr", true)
            this.player.flipX=false;
        } else if(this.cursors.left.isDown){
            this.player.setVelocityX(-300)
            this.player.anims.play("correr", true)
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

    gameOver() {
        this.player.anims.play("muerte", true)
        this.scoreWorker.postMessage('stop');
    
    Swal.fire({
        title: 'Los lacayos te han capturado',
        html: `<div style="font-family: cursive;">
                  <p style="font-size: 24px; color: white;">Te atraparon</p>
                  <p style="font-size: 20px; color: white;">Sobreviviste por: ${this.score} segundo(s), más suerte para la próxima</p>
               </div>`,
        confirmButtonText: 'Intentar otra vez',
        confirmButtonColor: 'gray',
        allowOutsideClick: false,
        background: '#000000',
       
        showClass: {
            popup: 'animate_animated animatefadeInDown animate_faster'
        },
        hideClass: {
            popup: 'animate_animated animatefadeOutUp animate_faster'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload();  
        }
    });
        this.scene.pause();
    }
}