import { prelodear } from "../tiled/prelodear.js";
import { scene1 } from "../scenes/scene1.js";
import { gameOver} from "../scenes/gameOver.js"
import { user } from "../scenes/user.js";

const config = {
    type: Phaser.AUTO,
    scale: {
        // mode: Phaser.Scale.ScaleModes.RESIZE,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1280
        
    },
    // dom: {
    //     createContainer: true
    // },
    scene: [prelodear,user , scene1 , gameOver],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    }
};
const game = new Phaser.Game(config);
class level1 extends Phaser.Scene {
    preload() {
        // ...
    }

    create() {
        // ...
    }
}


var player;
var cursors;
var floor;


