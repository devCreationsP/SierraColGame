
export class scene1 extends Phaser.Scene {

    constructor () {
        super ({ key: 'scene1' }); // nombre escena
        this.score = 0;
        this.scoreText;
        this.monedero;
        this.gameOver = false;
        this.additionalExecutions = 0;
        this.onGround = false;
        this.checkPointX = 0;
        
    }
 
    preload () {
        this.load.spritesheet("Player" , "./assets/jugador.png", {frameWidth: 48.3, frameHeight: 50})
        this.load.image("word", "./assets/Iconos/puntosPositivos/Recurso28.png");
        this.load.image("excel", "./assets/Iconos/puntosPositivos/Recurso27.png");
        this.load.image("skype", "./assets/Iconos/puntosPositivos/Recurso15.png");
        this.load.image("outlook", "./assets/Iconos/puntosPositivos/Recurso23.png");
        this.load.image("note", "./assets/Iconos/puntosPositivos/Recurso25.png");
        this.load.image("powerpoint", "./assets/Iconos/puntosPositivos/Recurso24.png");
        this.load.image("blue-flare", "./assets/green.png")
        this.load.image("anonymus" , "./assets/puntosNegativos/Recurso32.png")
        this.load.audio("soundpick", "src/sounds/mario-coin.ogg")
        this.load.audio("soundpunch", "src/sounds/punch.ogg")


        // tiled
        // se cargan las imagenes con las cuales se realiza el proyecto en tiled
        this.load.image('Floor' , "./assets/Fondo/Recurso2.png")
        this.load.image('Background' , "./assets/Escenarios.png")
        this.load.image('Barriers' , "./assets/Obstaculos.png")
        this.load.image('Objects' , "./assets/Objetos.png")
    
        this.load.tilemapTiledJSON('tilemap', "./assets/Background.json")
        }

    create () {

        this.physics.world.setBounds(0, 0, 9000, 720);
        
        const graphics = this.physics.world.createDebugGraphic();

        this.add.existing(graphics);
        
        var map = this.make.tilemap({key: 'tilemap'}) // se crea el mapa como objeto, y se lo guarda en la variable map
       
        var tileset = map.addTilesetImage('BackgroundPiso', "Floor") 
        var piso = map.createLayer("Floor" , tileset) // Se crea el piso, con el nombre de la capa asignada en tiled, "PisoTiled"
        piso.setCollisionByProperty({colision:true}) // Se activa la propiedad que brindamos a los bloques en tiled
        

        // creación de paredes
        var tileset2 = map.addTilesetImage('Background', "Background")
        var pared = map.createLayer("Background" , tileset2)

        // creacion columnas
        var tileset4 = map.addTilesetImage('Barriers', "Barriers")
        var obstaculos = map.createLayer("Barriers" , tileset4)
        obstaculos.setCollisionByProperty({colision:true})

        var tileset4 = map.addTilesetImage('Objects', "Objects")
        var objetos = map.createLayer("Objects" , tileset4)

        this.monedero = this.physics.add.group()
        this.monedero.create(200, 940, "skype");
        this.monedero.create(500, 940, "word");
        this.monedero.create(1000, 940, "note");
        this.monedero.create(1500, 940, "skype");
        this.monedero.create(2375, 500, "skype").setScale(1);
        this.monedero.create(2750, 940, "powerpoint");
        this.monedero.create(3100, 940, "word");
        this.monedero.create(3500, 940, "note");
        this.monedero.create(3950, 500, "outlook");   
        this.monedero.children.iterate(function(monedas) {
            monedas.setScale(1.5);   
        });

        
        this.anonymous = this.physics.add.group();

        this.soundCoin = this.sound.add('soundpick')
        this.soundPunch = this.sound.add('soundpunch')

        // --------------------------------------// 
        //animation
        this.anims.create({
            key: "detenido", // nombre de la animacion
            frames: this.anims.generateFrameNumbers("Player",{start:0,end:3}),// desde que frame hasta que frame
            frameRate:7,// velocidad de animacion
            repeat:-1// si se va a reptir y cuantas veces, al estar en -1 se repite infinito
        });

        this.anims.create({
            key: "caminar",
            frames: this.anims.generateFrameNumbers("Player",{start:4,end:8}),
            frameRate:10,
            repeat:-1
        });


        //Score
        this.scoreText = this.add.text(100, 380, 'Score : 0', { fontSize: '45px', fill:'black'})
        // this.scoreText.setScrollFactor(1)
        //player

        if(this.checkPointX === 0){
            this.player = this.physics.add.sprite(750, 900, "Player")
        }
        else {
            this.player = this.physics.add.sprite(this.checkPointX, 900, "Player")
        }

        this.player.setScale(3).setSize(16,36).setOffset(7,14)
        this.player.setCollideWorldBounds(false);
        this.player.setGravityY(250)
        this.cameras.main.startFollow(this.player);

        // Luego, en cualquier momento en el que desees cambiar la altura de la cámara, puedes llamar a la función así:
        // ajustarAlturaCamara(alturaDeseada);

        //moving
        this.cursors = this.input.keyboard.createCursorKeys();

        // collision

        // this.physics.add.collider(this.floor, this.player)
        // Establecer colisión con el piso
        this.physics.add.collider(this.player, piso, () => {
            this.onGround = true;
        });

    // Configurar el evento onWorldBounds para verificar si el personaje toca el piso
        this.player.body.onWorldBounds = true;
        this.player.body.world.on('worldbounds', (body) => {
        if (body.gameObject === piso) {
            this.onGround = true;
        }
        });

        // collision

        this.physics.add.collider(piso, this.monedero)
        this.physics.add.collider(this.anonymous, piso)
        this.physics.add.overlap(this.player, this.monedero,  (player, moneda) => this.collectCoin(player,moneda))
        this.physics.add.overlap(this.player, this.anonymous, (player, anonymous) => this.negative(player,anonymous))   
        this.physics.add.collider(obstaculos, this.monedero)
        this.physics.add.collider(this.player, obstaculos)
        

    }

    
    update() {
        // const velocidadCamara = 200;

        // // Mueve la cámara automáticamente hacia la derecha
        // this.cameras.main.scrollX += velocidadCamara * this.time.deltaTime / 1000;

        // Ajusta la altura de la cámara como lo hacías antes
        this.ajustarAlturaCamara.call(this, 200);


         this.scoreText.x = this.player.x - 500; // 16 es el margen izquierdo
        // this.player.setVelocityX(100);
        // this.player.anims.play("caminar", true);
        
        if (this.cursors.right.isDown) {
            // Tecla derecha es presionada, el personaje se desplaza a una velocidad de 250 sobre el eje X
            this.player.anims.play("caminar", true);
            this.player.setVelocityX(400);
            this.player.setOffset(7, 14);
    
            if (this.player.flipX === true) {
                this.player.x += 55;
            }
            this.player.flipX = false;
        } else if (this.cursors.left.isDown) {
            // Tecla izquierda es presionada, el personaje se desplaza a una velocidad de -100 sobre el eje X
            this.player.anims.play("caminar", true);
            this.player.setVelocityX(100);
            this.player.setOffset(26, 14);
        } else if (this.cursors.up.isDown && this.onGround) {
            this.player.setVelocityY(-300);
            this.onGround = false;

        } else {
            this.player.setVelocityX(250); // No hay tecla presionada, la velocidad del personaje es 0 sobre el eje X
            this.player.anims.play("caminar", true);
       }

       if (this.cursors.up.isDown && this.onGround && this.cursors.right.isDown) {
           // Salto
           this.player.setVelocityY(-300); // Ajusta la velocidad del salto según tus necesidades
           this.onGround = false; // Establece la variable en false para evitar saltos adicionales en el aire
       }

       if (this.cursors.up.isDown && this.onGround && this.cursors.left.isDown) {
           // Salto
           this.player.setVelocityY(-300); // Ajusta la velocidad del salto según tus necesidades
           this.onGround = false; // Establece la variable en false para evitar saltos adicionales en el aire
       }
        
            // Verifica si el score es un múltiplo de 30 y está en el rango de 30 a 60
        if (this.score >= (10 * (this.additionalExecutions + 1))) {
            for (var i = -1; i < this.additionalExecutions; i++) {
                this.negativePoints();
            }
            this.additionalExecutions++;
        }
            

    }

        negativePoints() {
            var x = this.player.x + 400;
        
            var y = Phaser.Math.Between(0, 1260); // Asegurarse de que la altura no supere 1080
            var anonymus = this.anonymous.create(x, y, 'anonymus');
            anonymus.setBounce(1);
            // anonymus.setCollideWorldBounds(true);
            anonymus.setVelocity(Phaser.Math.Between(-200, 200), 20);
        
            // Puedes configurar la duración durante la cual se muestra la imagen y luego eliminarla si lo deseas
            this.time.delayedCall(100000, function() {
                anonymus.destroy();
            }, [], this);

 
        }
    
        negative(player, anonymous){
            this.soundPunch.play();
            anonymous.destroy()
            this.score += -20;
            player.setTint(0xff0000)
            setTimeout(function() {
                player.clearTint();
                }, 500);
            this.scoreText.setText("Score: " + this.score);
            this.checkPoint();

            if(this.score < 0){
                this.physics.pause();
                this.gameOver = true;
                this.score = 0;
                this.additionalExecutions = 0;
                this.scoreText.setText("Score: " + this.score);
                this.scene.start('gameover');
            }
        }
    
        collectCoin (player, moneda) {
            this.soundCoin.play();
            player.setTint(0x00FF00);
            setTimeout(function() {
            player.clearTint();
            }, 500);
            moneda.disableBody(true, true)
            this.score += 10;
            this.scoreText.setText("Score: " + this.score);
  
        }

        checkPoint (){
            this.checkPointX = this.player.x;
        }

        ajustarAlturaCamara(altura) {
            this.cameras.main.setFollowOffset(0, altura);
        }

}

