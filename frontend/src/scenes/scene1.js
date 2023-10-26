class scene1 extends Phaser.Scene {

    constructor () {
        super ("scene1"); // nombre escena
    }
 
    preload () {
        this.load.image("Background","./src/assets/Background.png"); // decimos donde esta la imagen a phaser
        this.load.image("Floor", "./src/assets/floor.png");
        this.load.spritesheet("Player" , "./src/assets/jugador.png", {frameWidth: 48.3, frameHeight: 50})
    }

    create () {

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

        //background
        var fondo = this.add.image(400,300,"Background"); // agregamos el fondo a la escena
        fondo.setScale(1.9);//escalamos el fondo 

        //Floor
        floor = this.physics.add.staticGroup()
        floor.create(200, 500, "Floor").setScale(6,1.5).setSize(185,45).setOffset(-75,-5)
        floor.create(500, 400, "Floor").setScale(6,1.5).setSize(185,45).setOffset(-75,-5)
        floor.create(150, 250, "Floor").setScale(6,1.5).setSize(185,45).setOffset(-75,-5)
        floor.create(600, 100, "Floor").setScale(6,1.5).setSize(185,45).setOffset(-75,-5)
        floor.create(85, 575, "Floor").setScale(80,1.5).setSize(800,45).setOffset(-75,-10)

        //player
        player = this.physics.add.sprite(250, 380, "Player")
        player.setScale(3).setSize(16,36).setOffset(7,14)
        player.setCollideWorldBounds(true);

        //moving
        cursors = this.input.keyboard.createCursorKeys();

        // collision

        this.physics.add.collider(floor, player)
    }

    update () {

        if(cursors.right.isDown){
            player.setVelocityX(300) // Tecla derecha es presionada, el personaje se desplaza a una velocidad de 100 sobre el eje X
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