export class sceneEvento1 extends Phaser.Scene {
    constructor() {
        super({ key: 'sceneEvento1' });
    }

    preload() {
        this.load.image('Outlook', "./assets/Outlook.png");
        this.load.tilemapTiledJSON('tilemap', "./assets/Outlook.json");
    }

    create() {

        this.add.image(500, 300, "Outlook").setScale(1);
      //  var map = this.make.tilemap({ key: 'tilemap' });
      //  var tileset = map.addTilesetImage('Outlook', "Outlook");
      //  var Outlook = map.createLayer("Outlook", tileset);

        this.input.keyboard.on('keydown-E', this.onEKeyPressed, this);
        this.input.keyboard.on('keydown-R', this.onRKeyPressed, this);
        this.input.keyboard.on('keydown-I', this.onIKeyPressed, this);

        

    }

    onEKeyPressed() {
        // Acción a realizar cuando se presiona la tecla "E"
        console.log('Tecla "E" presionada');
        // Agrega aquí el código que deseas ejecutar para la tecla "E".
        const scene1 = this.scene.get('scene1');
        scene1.sumarPuntos(50)
        this.scene.switch('scene1');
        this.scene.stop('sceneEvento1');
    }
    
    onRKeyPressed() {
        // Acción a realizar cuando se presiona la tecla "R"
        console.log('Tecla "R" presionada en sceneEvento1');
        const scene1 = this.scene.get('scene1');
        scene1.sumarPuntos(50)
        this.scene.switch('scene1');
        this.scene.stop('sceneEvento1');
        // Agrega aquí cualquier otra acción relacionada con la tecla "R".
    }
    
    onIKeyPressed() {
        // Acción a realizar cuando se presiona la tecla "I"
        console.log('Tecla "I" presionada');
        // Agrega aquí el código que deseas ejecutar para la tecla "I".
        const scene1 = this.scene.get('scene1');
        scene1.sumarPuntos(50)
        this.scene.switch('scene1');
        this.scene.stop('sceneEvento1');
    }
    

}






// var map = this.make.tilemap({ key: 'tilemap' });
// var tileset = map.addTilesetImage('Outlook', "Outlook");
// var Outlook = map.createLayer("Outlook", tileset);

// // Crear un rectángulo clickeable en la posición (900, 900)
// var clickableRect1 = this.add.rectangle(330, 520, 100, 20);
// clickableRect1.setInteractive(); // Habilitar interacción

// // Asignar una función al hacer clic en el rectángulo
// clickableRect1.on('pointerdown', this.handleRectClick, this);

// var clickableRect2 = this.add.rectangle(350, 340, 150, 20);
// clickableRect2.setInteractive(); // Habilitar interacción

// // Asignar una función al hacer clic en el rectángulo
// clickableRect2.on('pointerdown', this.handleRectClick1, this);

// var clickableRect3 = this.add.rectangle(750, 60, 30, 30);
// clickableRect3.setInteractive(); // Habilitar interacción

// // Asignar una función al hacer clic en el rectángulo
// clickableRect3.on('pointerdown', this.handleRectClick2, this);




// handleRectClick(pointer) {
// // Lógica a ejecutar al hacer clic en el rectángulo
// console.log('Hiciste clic en el rectángulo1');

// }
// handleRectClick1(pointer) {
// // Lógica a ejecutar al hacer clic en el rectángulo
// console.log('Hiciste clic en el rectángulo2');
// }
// handleRectClick2(pointer) {
// // Lógica a ejecutar al hacer clic en el rectángulo
// console.log('Hiciste clic en el rectángulo3');
// }