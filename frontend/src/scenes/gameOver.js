export class gameOver extends Phaser.Scene {

    constructor () {
        super ({ key: 'gameover' }); // nombre escena
        
    }
    preload() {
        this.load.image("gameover", "./assets/gameover.jpg")
    }
    create() {
        const background = this.add.image(670, 300, "gameover"); // Colocar el fondo en el centro de la pantalla
        background.setScale(0.7);
    
        this.input.on('pointerdown', function (pointer) {
            this.restartGame();
        }, this);
    }

    restartGame() {
        // Cambiar a la escena 'preload'
        this.scene.start('prelodear');
    }
}   