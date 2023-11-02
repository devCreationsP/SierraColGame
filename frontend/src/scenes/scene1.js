
export class scene1 extends Phaser.Scene {

    constructor () {
        super ({ key: 'scene1' }); // nombre escena
        this.score = 0;
        this.scoreText;
        this.additionalExecutions = 0;
        
    }
 
    preload () {
        this.load.image("piso", "./assets/floor.png");
        this.load.image("moneda", "./assets/Iconos/puntosPositivos/Recurso28.png");
        this.load.spritesheet("Player" , "./assets/jugador.png", {frameWidth: 48.3, frameHeight: 50})
        this.load.image("anonymus" , "./assets/puntosNegativos/Recurso32.png")


        // tiled
        // se cargan las imagenes con las cuales se realiza el proyecto en tiled
        this.load.image('Piso' , "./assets/Fondo/Recurso2.png")
        this.load.image('Pared' , "./assets/Fondo/Pared.png")
        this.load.image('Techo' , "./assets/Fondo/Techo.png")
        this.load.image('Luces' , "./assets/Fondo/Luces.png")
        this.load.image('Columnas' , "./assets/Fondo/Columnas.png")
        this.load.image('Escritorios' , "./assets/Objetos/Recurso33.png")
        this.load.image('Archivo' , "./assets/Objetos/Recurso24.png")
        this.load.image('Archivo2' , "./assets/Objetos/Recurso25.png")
        this.load.image('Reloj' , "./assets/Objetos/Recurso30.png")
        this.load.image('Basura' , "./assets/Objetos/Recurso27.png")
        this.load.image('Agua' , "./assets/Objetos/Recurso32.png")
        this.load.image('Sillon1' , "./assets/Objetos/Recurso29.png")
        this.load.image('Sillon2' , "./assets/Objetos/Recurso28.png")
        this.load.image('Estante' , "./assets/Objetos/Recurso26.png")
        this.load.image('Planta' , "./assets/Objetos/Recurso31.png")
        this.load.image('Planta2' , "./assets/Objetos/Recurso23.png")
        this.load.image('Pizarra' , "./assets/Objetos/Recurso34.png")
        this.load.image('Impresora' , "./assets/Objetos/Recurso35.png")
        this.load.image('Ventana1' , "./assets/Ventanas/Recurso12.png")
        this.load.image('Ventana2' , "./assets/Ventanas/Recurso13.png")
        this.load.image('Ventana3' , "./assets/Ventanas/Recurso14.png")
        this.load.image('Ventana4' , "./assets/Ventanas/Recurso15.png")
        // this.load.image('Monedas' , "./assets/Iconos/puntosPositivos/Recurso28.png")
        // se exporta el mapa creado en tiled y se lo importa al archivo pisoBackground.json    
        this.load.tilemapTiledJSON('tilemap', "./assets/Background.json")
        }

    create () {

        this.physics.world.setBounds(0, 0, 9000, 720);

        //En la carpeta assets está el proyecto de tiled con la extensión pisoBackground.tmx, de ahí se obtienen los nombres
        
        var map = this.make.tilemap({key: 'tilemap'}) // se crea el mapa como objeto, y se lo guarda en la variable map
   
        // se mapea los datos del objeto map mediante el metodo addTilesetImage
        // Los parametros se establecen con (Nombre de conjunto de patron en el software tiled, Nombre que se le asigna en el preload a la imagen )
       
        var tileset = map.addTilesetImage('BackgroundPiso', "Piso") 
        var piso = map.createLayer("Piso" , tileset) // Se crea el piso, con el nombre de la capa asignada en tiled, "PisoTiled"
        piso.setCollisionByProperty({colision:true}) // Se activa la propiedad que brindamos a los bloques en tiled
        

        // creación de paredes
        var tileset2 = map.addTilesetImage('BackgroundPared', "Pared")
        var pared = map.createLayer("Pared" , tileset2)

        // creacion techo
        var tileset3 = map.addTilesetImage('BackgroundTecho', "Techo")
        var techo = map.createLayer("Techo" , tileset3)

        // creacion columnas
        var tileset4 = map.addTilesetImage('BackgroundColumnas', "Columnas")
        var columnas = map.createLayer("Columnas" , tileset4)

        var tileset5 = map.addTilesetImage('BackgroundVentana1', "Ventana1")
        var columnas = map.createLayer("Ventana1" , tileset5)

        var tileset6 = map.addTilesetImage('BackgroundVentana2', "Ventana2")
        var columnas = map.createLayer("Ventana2" , tileset6)
        
        var tileset7 = map.addTilesetImage('BackgroundVentana3', "Ventana3")
        var columnas = map.createLayer("Ventana3" , tileset7)
        
        var tileset8 = map.addTilesetImage('BackgroundVentana4', "Ventana4")
        var columnas = map.createLayer("Ventana4" , tileset8)

        var tileset9 = map.addTilesetImage('BackgroundLuces', "Luces")
        var columnas = map.createLayer("Luces" , tileset9)

        var tileset10 = map.addTilesetImage('BackgroundEscritorio', "Escritorios")
        var columnas = map.createLayer("Escritorios" , tileset10)

        var tileset11 = map.addTilesetImage('BackgroundArchivo', "Archivo")
        var columnas = map.createLayer("Archivo1" , tileset11)

        var tileset22 = map.addTilesetImage('BackgroundArchivo2', "Archivo2")
        var columnas = map.createLayer("Archivo2" , tileset22)

        var tileset12 = map.addTilesetImage('BackgroundReloj', "Reloj")
        var columnas = map.createLayer("Reloj" , tileset12)

        var tileset13 = map.addTilesetImage('BackgroundBasura', "Basura")
        var columnas = map.createLayer("Basura" , tileset13)

        var tileset14 = map.addTilesetImage('BackgroundAgua', "Agua")
        var columnas = map.createLayer("Agua" , tileset14)

        var tileset15 = map.addTilesetImage('BackgroundSillon1', "Sillon1")
        var columnas = map.createLayer("Sillon1" , tileset15)

        var tileset16 = map.addTilesetImage('BackgroundSillon2', "Sillon2")
        var columnas = map.createLayer("Sillon2" , tileset16)

        var tileset17 = map.addTilesetImage('BackgroundEstante', "Estante")
        var columnas = map.createLayer("Estante" , tileset17)

        var tileset18 = map.addTilesetImage('BackgroundPlanta', "Planta")
        var columnas = map.createLayer("Planta" , tileset18)

        var tileset19 = map.addTilesetImage('BackgroundPlanta2', "Planta2")
        var columnas = map.createLayer("Planta2" , tileset19)

        var tileset20 = map.addTilesetImage('BackgroundPizarra', "Pizarra")
        var columnas = map.createLayer("Pizarra" , tileset20)

        var tileset21 = map.addTilesetImage('BackgroundImpresora', "Impresora")
        var columnas = map.createLayer("Impresora" , tileset21)

        this.anonymous = this.physics.add.group();

        
        // --------- Sistema de monedas ---------//
   
                this.monedero = this.physics.add.group({ 
                    key:"moneda",
                    repeat: 50,
                    setScale:{x:1, y: 1},
                    setXY: {x:50, y:550, stepX: 250},
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
        this.physics.add.overlap(this.player, this.monedero, (player, moneda) => this.collectCoin(player,moneda))
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
        if (this.score >= (60 * (this.additionalExecutions + 1))) {
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
            anonymus.setCollideWorldBounds(true);
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
            moneda.destroy()
            this.score += 10;
            this.scoreText.setText("Score: " + this.score);
        }
}

