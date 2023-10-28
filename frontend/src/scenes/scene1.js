class scene1 extends Phaser.Scene {

    constructor () {
        super ("scene1"); // nombre escena
    }
 
    preload () {
        this.load.image("piso", "./assets/floor.png");
        this.load.spritesheet("Player" , "./assets/jugador.png", {frameWidth: 48.3, frameHeight: 50})


        // tiled
        // se cargan las imagenes con las cuales se realiza el proyecto en tiled
        this.load.image('Floor' , "./assets/Fondo/Recurso2.png")
        this.load.image('Pared' , "./assets/Fondo/Pared.png")
        // se exporta el mapa creado en tiled y se lo importa al archivo pisoBackground.json    
        this.load.tilemapTiledJSON('tilemap', "./assets/pisoBackground.json")
        }

    create () {

        //En la carpeta assets está el proyecto de tiled con la extensión .tmx, de ahí se obtienen los nombres
        
        var map = this.make.tilemap({key: 'tilemap'}) // se crea el mapa como objeto, y se lo guarda en la variable map
        // se mapea los datos del objeto map mediante el metodo addTilesetImage
        // Los parametros se establecen con (Nombre de conjunto de patron en el software tiled, Nombre que se le asigna en el preload a la imagen )
        var tileset = map.addTilesetImage('PisoBackground', "Floor") 
        var piso = map.createLayer("PisoTiled" , tileset) // Se crea el piso, con el nombre de la capa asignada en tiled, "PisoTiled"
        piso.setCollisionByProperty({colision:true}) // Se activa la propiedad que brindamos a los bloques en tiled
        

        // creación de pareces
        var tileset2 = map.addTilesetImage('ParedBackground', "Pared")
        var pared = map.createLayer("ParedTiled" , tileset2)
        

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



        // Floor
        floor = this.physics.add.staticGroup()
        // floor.create(200, 800, "piso").setScale(6,1.5).setSize(185,45).setOffset(-75,-5)
        floor.create(500, 700, "piso").setScale(6,1.5).setSize(185,45).setOffset(-75,-5)
        floor.create(150, 600, "piso").setScale(6,1.5).setSize(185,45).setOffset(-75,-5)
        // floor.create(600, 100, "piso").setScale(6,1.5).setSize(185,45).setOffset(-75,-5)
        // floor.create(85, 575, "piso").setScale(80,1.5).setSize(800,45).setOffset(-75,-10)

        //player
        player = this.physics.add.sprite(250, 380, "Player")
        player.setScale(3).setSize(16,36).setOffset(7,14)
        player.setCollideWorldBounds(true);

        //moving
        cursors = this.input.keyboard.createCursorKeys();

        // collision

        this.physics.add.collider(floor, player)
        this.physics.add.collider(player, piso)
    }

    update () {

        if(cursors.right.isDown){
            player.setVelocityX(100) // Tecla derecha es presionada, el personaje se desplaza a una velocidad de 100 sobre el eje X
            player.anims.play("caminar", true);
            player.setOffset(7,14);
            if(player.flipX==true) {
                player.x=player.x+55
            }
            player.flipX=false;
        }
        else if(cursors.left.isDown) {
            player.setVelocityX(-100) // Tecla izquierda es presionada, el personaje se desplaza a una velocidad de 100 sobre el eje X
            player.anims.play("caminar", true);
            player.setOffset(26,14);
            if(player.flipX==false) {
                player.x=player.x-55
            }
            player.flipX=true // Reflejar la imagen hacia el lado izquierdo
        }
        else {
            player.setVelocityX(0); // No hay tecla presionada, la velocidad del pesonaje es 0 sobre el eje X
            player.anims.play("detenido", true);
        }
        if( cursors.up.isDown && player.body.touching){
            player.setVelocityY(-100);
        }
    }   

}