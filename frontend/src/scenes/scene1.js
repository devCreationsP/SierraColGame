
export class scene1 extends Phaser.Scene {

    constructor () {
        super ({ key: 'scene1' }); // nombre escena
        this.score = 0;
        this.scoreText;
        this.additionalExecutions = 0;
        this.gameOver = false;
        this.onGround = false;
    }
 
    preload () {

            this.load.image("piso", "./assets/floor.png");
            this.load.image("moneda", "./assets/Iconos/puntosPositivos/Recurso28.png");
            this.load.spritesheet("Player" , "./assets/jugador.png", {frameWidth: 48.3, frameHeight: 50})
            this.load.image("anonymus" , "./assets/puntosNegativos/Recurso32.png")

                // creación de paredes
            this.load.image('Floor' , "./assets/Fondo/Recurso2.png")
            this.load.image('Background' , "./assets/Escenarios.png")
            this.load.image('Barriers' , "./assets/Obstaculos.png")
            this.load.image('Objects' , "./assets/Objetos.png")
            this.load.tilemapTiledJSON('tilemap', "./assets/Background.json")
        }

    create () {

        this.physics.world.setBounds(0, 0, 9000, 720);

        // Crea un gráfico de depuración para ver las colisiones
        const graphics = this.physics.world.createDebugGraphic();

        // Agrega el gráfico de depuración a la escena
        this.add.existing(graphics);

        // se mapea los datos del objeto map mediante el metodo addTilesetImage
        // Los parametros se establecen con (Nombre de conjunto de patron en el software tiled, Nombre que se le asigna en el preload a la imagen )
       
        var map = this.make.tilemap({key: 'tilemap'}) // se crea el mapa como objeto, y se lo guarda en la variable map
       
        var tileset = map.addTilesetImage('BackgroundPiso', "Floor") 
        var piso = map.createLayer("Floor" , tileset) // Se crea el piso, con el nombre de la capa asignada en tiled, "PisoTiled"
        piso.setCollisionByProperty({colision:true}) // Se activa la propiedad que brindamos a los bloques en tiled
        var tileset2 = map.addTilesetImage('Background', "Background")
        var pared = map.createLayer("Background" , tileset2)
        
        var tileset4 = map.addTilesetImage('Barriers', "Barriers")
        var columnas = map.createLayer("Barriers" , tileset4)

        var tileset4 = map.addTilesetImage('Objects', "Objects")
        var columnas = map.createLayer("Objects" , tileset4)




        this.anonymous = this.physics.add.group();

       // this.physics.world.setBoundsCollision(true, true, false, true);

        
        // --------- Sistema de monedas ---------//
   
        this.monedero = this.physics.add.group({ 
            key:"moneda",
            repeat: 50,
            setScale:{x:1, y: 1},
            setXY: {x:50, y:720, stepX: 250},
            // gravityY: 0
        })
                
         this.monedero.children.iterate(function(monedas){
            monedas.setBounce(0.2)
            monedas.setScale(1)
        })
                
                
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
        this.player = this.physics.add.sprite(750, 900, "Player")
        this.player.setScale(3).setSize(16,36).setOffset(7,14)
        this.player.setCollideWorldBounds(false);
        this.player.setGravityY(250); // Ajusta el valor según tus necesidades
        this.cameras.main.startFollow(this.player);

        // Función para ajustar la altura de la cámara
        function ajustarAlturaCamara(altura) {
            this.cameras.main.setFollowOffset(0, altura);
        }

        // Llamar a la función para establecer la altura inicial de la cámara
        ajustarAlturaCamara.call(this, 200);

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

        this.physics.add.collider(piso, this.monedero)
        this.physics.add.collider(this.anonymous, piso)
        this.physics.add.overlap(this.player, this.monedero, (player, moneda) => this.collectCoin(player,moneda))
        this.physics.add.overlap(this.player, this.anonymous, (player, anonymous) => this.negative(player,anonymous))
        

    }

    update() {
        this.scoreText.x = this.player.x - 500; // 16 es el margen izquierdo
        this.player.setVelocityX(200);
        this.player.anims.play("caminar", true);

        if (this.cursors.up.isDown && this.onGround) {
            // Salto
            this.player.setVelocityY(-300); // Ajusta la velocidad del salto según tus necesidades
            this.onGround = false; // Establece la variable en false para evitar saltos adicionales en el aire
        }

            // Verifica si el score es un múltiplo de 30 y está en el rango de 30 a 60
        if (this.score >= (60 * (this.additionalExecutions + 1))) {
            for (var i = -1; i < this.additionalExecutions; i++) {
                this.negativePoints();
            }
            this.additionalExecutions++;
        }
            

    }

        negativePoints() {
            var x = this.player.x + 900;
        
            var y = Phaser.Math.Between(780, 880); // Asegurarse de que la altura no supere 1080
            var anonymus = this.anonymous.create(x, y, 'anonymus');
            anonymus.setBounce(2);
           // anonymus.setCollideWorldBounds(true);
            anonymus.setVelocity(Phaser.Math.Between(-750, -800), 50);
        
            // Puedes configurar la duración durante la cual se muestra la imagen y luego eliminarla si lo deseas
            this.time.delayedCall(15000, function() {
                anonymus.destroy();
            }, [], this);
        }
    
        negative(player, anonymous){
            anonymous.destroy()
            this.score += -100
            this.scoreText.setText("Score: " + this.score);

            if(this.score < 0){
                this.physics.pause();
                player.setTint(0xff0000)
                this.gameOver = true;
                this.score = 0;
                this.additionalExecutions = 0;
                this.scoreText.setText("Score: " + this.score);
                this.scene.start('gameover');
            }
        }
    
        collectCoin (player, moneda) {
            moneda.destroy()
            this.score += 10;
            this.scoreText.setText("Score: " + this.score);
        }

}



//------------------Control personaje -------------//

        // if (this.cursors.right.isDown) {
        //     // Tecla derecha es presionada, el personaje se desplaza a una velocidad de 250 sobre el eje X
        //     this.player.anims.play("caminar", true);
        //     this.player.setVelocityX(250);
        //     this.player.setOffset(7, 14);
    
        //     if (this.player.flipX === true) {
        //         this.player.x += 55;
        //     }
        //     this.player.flipX = false;
        // } else if (this.cursors.left.isDown) {
        //     // Tecla izquierda es presionada, el personaje se desplaza a una velocidad de -100 sobre el eje X
        //     this.player.anims.play("caminar", true);
        //     this.player.setVelocityX(-250);
        //     this.player.setOffset(26, 14);
    
        //     if (this.player.flipX === false) {
        //         this.player.x -= 55;
        //     }
        //     this.player.flipX = true; // Reflejar la imagen hacia el lado izquierdo
        // } else if (this.cursors.up.isDown) {
        //     this.player.setVelocityY(-200);
        // } else {
        //     this.player.setVelocityX(0); // No hay tecla presionada, la velocidad del personaje es 0 sobre el eje X
        //     this.player.anims.play("detenido", true);
        // }