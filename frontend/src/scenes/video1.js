export class video1 extends Phaser.Scene {

    constructor () {
        super (); // nombre escena
        // this.videoPlayed = false;
    }
    preload() {
        this.load.video("starwars", './assets/Starwars.mp4', true)
    }
    create() {
        // Obtiene las dimensiones del canvas del juego

        // Crea el objeto de video con las dimensiones del canvas
        const video = this.add.video(950, 500, 'starwars');

        // Reproduce el video
        video.play();

        video.on('complete' , () =>  {
            this.scene.start('user');
        });
    }
}   