import { prelodear } from "../tiled/prelodear.js";
import { scene1 } from "../scenes/scene1.js";
import { user } from "../scenes/user.js"; 
import { video1 } from "../scenes/video1.js"
import { gameOver } from "../scenes/gameOver.js";
import { sceneEvento1 } from "../scenes/sceneEvento1.js";

const config = {
    type: Phaser.AUTO,
    scale: { 
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.ScaleModes.RESIZE,
        width: 1920, 
        height: 1280 },
    dom: {createContainer: true},
    parent: document.body,
    scene: [scene1 , gameOver],
    //scene: [video1,prelodear, user , scene1 , gameOver, sceneEvento1],
    physics: {default: 'arcade', arcade: {gravity: { y: 200 },debug: true}}
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




