export class scene1 extends Phaser.Scene {

    constructor () {
        super ({ key: 'scene1' }); // nombre escena
        this.score = 0;
        this.scoreText;
        
    }
 
    preload () {
     //   this.load.image("Floor", "./assets/floor.png");
        this.load.image("moneda", "./assets/Iconos/puntosPositivos/Recurso28.png");
        this.load.spritesheet("Player" , "./assets/jugador.png", {frameWidth: 48.3, frameHeight: 50})


        // tiled
        // se cargan las imagenes con las cuales se realiza el proyecto en tiled
        this.load.image('Floor' , "./assets/Fondo/Recurso2.png")
        this.load.image('Background' , "./assets/Escenarios.png")
        this.load.image('Objects' , "./assets/Objetos.png")
        this.load.image('Barriers' , "./assets/Obstaculos.png")
        // this.load.image('Monedas' , "./assets/Iconos/puntosPositivos/Recurso28.png")
        // se exporta el mapa creado en tiled y se lo importa al archivo pisoBackground.json    
        this.load.tilemapTiledJSON('tilemap', "./assets/Background.json")
        }

    create () {

        //En la carpeta assets está el proyecto de tiled con la extensión pisoBackground.tmx, de ahí se obtienen los nombres
        
        var map = this.make.tilemap({key: 'tilemap'}) // se crea el mapa como objeto, y se lo guarda en la variable map
   
        // se mapea los datos del objeto map mediante el metodo addTilesetImage
        // Los parametros se establecen con (Nombre de conjunto de patron en el software tiled, Nombre que se le asigna en el preload a la imagen )
       
        var tileset = map.addTilesetImage('BackgroundPiso', "Floor") 
        var piso = map.createLayer("Floor" , tileset) // Se crea el piso, con el nombre de la capa asignada en tiled, "PisoTiled"
        piso.setCollisionByProperty({colision:true}) // Se activa la propiedad que brindamos a los bloques en tiled
        

        // creación de paredes
        var tileset2 = map.addTilesetImage('Background', "Background")
        var pared = map.createLayer("Background" , tileset2)

        // creación de objetos
        var tileset3 = map.addTilesetImage('Objects', "Objects")
        var objects = map.createLayer("Objects" , tileset3)

        // creación de barreras
        var tileset4 = map.addTilesetImage('Barriers', "Barriers")
        var barriers = map.createLayer("Barriers" , tileset4)

        
        // var tileset22 = map.addTilesetImage('BackgroundWord', "Monedas")
        // var coin = map.createLayer("Monedas" , tileset22)
        // coin.setCollisionByExclusion([-1]);
        // this.physics.world.addCollider(this.player, coin, this.collectCoin, null, this)
        
        // --------- Sistema de monedas ---------//
   
                this.monedero = this.physics.add.group({ 
                    key:"moneda",
                    repeat: 5,
                    setScale:{x:1, y: 1},
                    setXY: {x:50, y:550, stepX: 250},
                    // gravityY: 0
                })
                // this.monedero.setGravityY(0);
                // var positions = [
                //     { x: 100, y: 200 },
                //     { x: 1000, y: 400 },
                //     { x: 500, y: 600 },
                //     { x: 700, y: 800 }
                // ];
            
                // this.monedero.children.iterate((moneda, index) => {
                //     if (moneda) {
                //         var aver = moneda.setPosition(positions[index].x, positions[index].y);
                //         console.log(aver)
                //         moneda.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
                //     } else {
                //         console.log(`Moneda ${index} no definida.`);
                //     }
                // });
                
                this.monedero.children.iterate(function(monedas){
                    monedas.setBounce(Phaser.Math.FloatBetween(0.4, 0.8))
                    monedas.setScale(1)
                })

                //  // Posición aleatoria pero fija para las monedas
                // const posicionX = Phaser.Math.Between(100, 1500); // Coordenadas X aleatorias entre 100 y 700
                // const posicionY = Phaser.Math.Between(150, 500); // Coordenadas Y aleatorias entre 100 y 500

                // // Crea las monedas en la posición aleatoria pero fija
                // this.monedero.children.iterate(function (moneda) {
                //     const x = posicionX + Phaser.Math.Between(-200, 550); // Variación aleatoria en X
                //     const y = posicionY + Phaser.Math.Between(-200, 550); // Variación aleatoria en Y
                //     moneda.setX(x);
                //     moneda.setY(y);
                //     moneda.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
                // });
                
                
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
        this.scoreText = this.add.text(16, 16, 'Score : 0', { fontSize: '45px', fill:'black'})
        //player
        this.player = this.physics.add.sprite(500, 900, "Player")
        this.player.setScale(3).setSize(16,36).setOffset(7,14)
        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player);

        //moving
        this.cursors = this.input.keyboard.createCursorKeys();

        // collision

        // this.physics.add.collider(this.floor, this.player)
        this.physics.add.collider(this.player, piso)
        this.physics.add.collider(piso, this.monedero)
        this.physics.add.overlap(this.player, this.monedero, (player, moneda) => this.collectCoin(player,moneda))
        

    }

    update () {

        this.player.setVelocityX(100);
        this.player.anims.play("caminar", true);


        // if(this.cursors.right.isDown){
        //      // Tecla derecha es presionada, el personaje se desplaza a una velocidad de 100 sobre el eje X
        //      this.player.anims.play("caminar", true);
        //      this.player.setVelocityX(250)
        //      this.player.setOffset(7,14);
        //     if(this.player.flipX==true) {
        //         this.player.x=this.player.x+55
        //     }
        //     this.player.flipX=false;
        // }
        // else if(this.cursors.left.isDown) {
        //     this.player.setVelocityX(-100) // Tecla izquierda es presionada, el personaje se desplaza a una velocidad de 100 sobre el eje X
        //     this.player.anims.play("caminar", true);
        //     this.player.setOffset(26,14);
        //     if(this.player.flipX==false) {
        //         this.player.x=this.player.x-55
        //     }
        //     this.player.flipX=true // Reflejar la imagen hacia el lado izquierdo
        // }
        // // else {
        // //     player.setVelocityX(0); // No hay tecla presionada, la velocidad del pesonaje es 0 sobre el eje X
        // //     player.anims.play("detenido", true);
        // // }
        //  if( this.cursors.up.isDown && this.player.body.touching){
        //      this.player.setVelocityY(-100);
        //  }
      }   
      collectCoin (player, moneda) {
        moneda.destroy()
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);
    }
}


        // --------- Sistema de monedas ---------//
        // this.monedero = this.physics.add.group({ 
        //     key:"moneda",
        //     repeat: 5,
        //     setScale:{x:0.1, y: 0.1},
        //     setXY: {x:50, y:50, stepX: 100}
        // })

        // this.monedero.children.iterate(function(monedas){
        //     monedas.setBounce(Phaser.Math.FloatBetween(0.4, 0.8))
        // })

        // --------------------------------------//