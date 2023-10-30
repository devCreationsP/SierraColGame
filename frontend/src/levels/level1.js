import { prelodear } from "../tiled/prelodear.js";
import { scene1 } from "../scenes/scene1.js";

const config = {
    type: Phaser.AUTO,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1024,
    },
    scene: [prelodear, scene1],
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
