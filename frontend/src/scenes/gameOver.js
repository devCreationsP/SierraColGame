export class gameOver extends Phaser.Scene {

    constructor () {
        super ({ key: 'gameover' }); // nombre escena
        
    }
    preload() {
        this.load.image("gameover", "./assets/GameOber.png")
    }
    create() {
        const background = this.add.image(1000, 400, "gameover"); // Colocar el fondo en el centro de la pantalla
        background.setScale(0.8);
    
        this.input.on('pointerdown', function (pointer) {
            this.restartGame();
        }, this);
    }

    restartGame() {
        // Cambiar a la escena 'preload'
        this.scene.start('scene1');
    }
}   