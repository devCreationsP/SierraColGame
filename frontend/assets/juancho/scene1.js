
export class scene1 extends Phaser.Scene {

    constructor () {
        super ({ key: 'scene1' }); // nombre escena
        this.score = 0;
        this.scoreText;
        this.monedero;
        this.gameOver = false;
        this.additionalExecutions = 0;
        
    }
 
    preload () {
        this.load.image("piso", "./assets/floor.png");
        this.load.image("moneda", "./assets/Iconos/puntosPositivos/Recurso28.png");
        this.load.spritesheet("Player" , "./assets/jugador.png", {frameWidth: 48.3, frameHeight: 50})
        this.load.image("blue-flare", "./assets/green.png")
        this.load.image("anonymus" , "./assets/puntosNegativos/Recurso32.png")


        // tiled
        // se cargan las imagenes con las cuales se realiza el proyecto en tiled
        this.load.image('Floor' , "./assets/Fondo/Recurso2.png")
        this.load.image('Pared' , "./assets/Fondo/Pared.png")
    
        this.load.tilemapTiledJSON('tilemap', "./assets/Background.json")
        }

    create () {

        this.physics.world.setBounds(0, 0, 9000, 720);
        
        
        var map = this.make.tilemap({key: 'tilemap'}) // se crea el mapa como objeto, y se lo guarda en la variable map
       
        var tileset = map.addTilesetImage('BackgroundPiso', "Floor") 
        var piso = map.createLayer("Floor" , tileset) // Se crea el piso, con el nombre de la capa asignada en tiled, "PisoTiled"
        piso.setCollisionByProperty({colision:true}) // Se activa la propiedad que brindamos a los bloques en tiled
        

        // creación de paredes
        var tileset2 = map.addTilesetImage('BackgroundPared', "Background")
        var pared = map.createLayer("Background" , tileset2)

        // creacion techo
        var tileset3 = map.addTilesetImage('BackgroundTecho', "Techo")
        var techo = map.createLayer("Techo" , tileset3)

        // creacion columnas
        var tileset4 = map.addTilesetImage('BackgroundColumnas', "Columnas")
        var columnas = map.createLayer("Columnas" , tileset4)

        this.anonymous = this.physics.add.group();

        
        // --------- Sistema de monedas ---------//
   
        const moneda = this.add.image(600, 700 , "moneda").setInteractive();
        const emitZone = { type: 'edge', source: moneda.getBounds(), quantity: 45};
        this.emitter = this.add.particles(0, 0, 'blue-flare', {
            speed: 10,
        
            quantity: 1,
            scale: { start: 0.1, end: 0 },
            advance: 100,
            bledMode: 'ADD',
            emitZone: [ emitZone ]
        });
        moneda.on('pointerover', () => {

            this.emitter.setEmitZone(0);
            this.emitter.fastForward(1500);
        
        });
        
        
        // --------------------------------------// 
        
   
        this.monedero = this.physics.add.group({ 
            key:"moneda",
            repeat: 5,
            setScale:{x:1, y: 1},
            setXY: {x:50, y:940, stepX: 250},
        })
        
        this.monedero.children.iterate(function(monedas) {
            monedas.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
            monedas.setScale(1);
        //     const emitZoneMonedas = { type: 'edge', source: this.monedero.getBounds(), quantity: 45 };
        //     this.emitterMonedas = this.add.particles(0, 0, 'blue-flare', {
        //     speed: 10,
        //     quantity: 1,
        //     scale: { start: 0.1, end: 0 },
        //     advance: 100,
        //     blendMode: 'ADD',
        //     emitZone: [emitZoneMonedas]
        // });
            }
        )



        // this.monedero.children.iterate(function (moneda) {
        //     moneda.on('pointerover', function () {
        //         this.emitterMonedas.setEmitZone(0);
        //         this.emitterMonedas.fastForward(1500);
        //     }, this);
        // }, this);


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
        this.player = this.physics.add.sprite(750, 650, "Player")
        this.player.setScale(3).setSize(16,36).setOffset(7,14)
        this.player.setCollideWorldBounds(false);
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
        this.physics.add.collider(this.player, piso)
        this.physics.add.collider(piso, this.monedero)
        this.physics.add.overlap(this.player, this.anonymous, (player, anonymous) => this.hitBomb(player, anonymous))
        this.physics.add.overlap(this.player, this.monedero,  (player, moneda) => this.collectCoin(player,moneda))
        this.physics.add.overlap(this.player, this.anonymous, (player, anonymous) => this.negative(player,anonymous))   


    }

    
    update() {

         this.scoreText.x = this.player.x - 500; // 16 es el margen izquierdo
        // this.player.setVelocityX(100);
        // this.player.anims.play("caminar", true);
        
        if (this.cursors.right.isDown) {
            // Tecla derecha es presionada, el personaje se desplaza a una velocidad de 250 sobre el eje X
            this.player.anims.play("caminar", true);
            this.player.setVelocityX(250);
            this.player.setOffset(7, 14);
    
            if (this.player.flipX === true) {
                this.player.x += 55;
            }
            this.player.flipX = false;
        } else if (this.cursors.left.isDown) {
            // Tecla izquierda es presionada, el personaje se desplaza a una velocidad de -100 sobre el eje X
            this.player.anims.play("caminar", true);
            this.player.setVelocityX(-250);
            this.player.setOffset(26, 14);
    
            if (this.player.flipX === false) {
                this.player.x -= 55;
            }
            this.player.flipX = true; // Reflejar la imagen hacia el lado izquierdo
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200);
        } else {
            this.player.setVelocityX(0); // No hay tecla presionada, la velocidad del personaje es 0 sobre el eje X
            this.player.anims.play("detenido", true);
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
            anonymous.destroy()
            this.score += -50
            this.scoreText.setText("Score: " + this.score);
        }
    
        collectCoin (player, moneda) {
            moneda.disableBody(true, true)
            this.score += 10;
            this.scoreText.setText("Score: " + this.score);
        }

        hitBomb(player, anonymus) {
            if (!this.gameOver) {
                this.score = 0;
                this.scene.start('gameover');
            }
            else {
                this.scene.start('prelodear')
            }
            
            
        }

}

