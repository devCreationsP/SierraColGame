import { prelodear } from "../tiled/prelodear.js";
import { scene1 } from "../scenes/scene1.js";
import { gameOver} from "../scenes/gameOver.js"

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE,
       autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1280
    },
    scene: [prelodear, scene1 , gameOver],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    }
};

class level1 extends Phaser.Scene {
    preload() {
        // ...
    }

    create() {
        // ...
    }
}

const game = new Phaser.Game(config);
var player;
var cursors;
var floor;


