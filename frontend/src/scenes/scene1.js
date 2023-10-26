class scene1 extends Phaser.Scene {

    constructor () {
        super ("scene1"); // nombre escena
    }
 
    preload () {
        this.load.image("Background","./src/assets/Background.png"); // decimos donde esta la imagen a phaser
        this.load.image("Floor", "./src/assets/floor.png");
        this.load.spritesheet("Player" , "./src/assets/jugador.png", {frameWidth: 48.8, frameHeight: 50})
    }

    create () {
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
        player.setScale(2.5).setSize(15,35).setOffset(7,14)
        player.setCollideWorldBounds(true);

        //moving
        cursors = this.input.keyboard.createCursorKeys();

        // collision

        this.physics.add.collider(floor, player)
    }

    update () {

        if(cursors.right.isDown){
            player.setVelocityX(300) // Tecla derecha es presionada, el personaje se desplaza a una velocidad de 100 sobre el eje X
        }
        else if(cursors.left.isDown) {
            player.setVelocityX(-100) // Tecla izquierda es presionada, el personaje se desplaza a una velocidad de 100 sobre el eje X
        }
        else {
            player.setVelocityX(0); // No hay tecla presionada, la velocidad del pesonaje es 0 sobre el eje X
        }
        if( cursors.up.isDown && player.body.touching){
            player.setVelocityY(-100);
        }
    }   

}