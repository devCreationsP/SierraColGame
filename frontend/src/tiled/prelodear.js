export class prelodear extends Phaser.Scene {

    constructor () {
        super({ key: 'prelodear' })// nombre escena
    }
    preload() {
        // Carga de recursos aquí...
        this.load.image("background", "./assets/fondoBlanco.png")
    }

    create() {
         const background = this.add.image(400, 300, "background"); // Colocar el fondo en el centro de la pantalla
         background.setScale(2); // Escalar el fondo para que cubra toda la pantalla
    
        // // Crear un texto en la posición deseada
        // const text = this.add.text(400, 300, 'Haz clic para continuar', { fontSize: '32px', fill: '#fff' });
        // text.setOrigin(0.5);
    
        // // Hacer que el texto sea interactivo y cambie de color al pasar el mouse sobre él
        // text.setInteractive({ useHandCursor: true });
    
        // // Cuando se haga clic en el texto, llevar al usuario a scene1
        // text.on('pointerdown', () => {
        //     this.scene.start('scene1'); // Iniciar la escena scene1
        // });

        const preguntaText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 200,
            'Bienvenido',
            {
                fontSize: '24px',
                color: '#000000',
                align: 'center'
            }
        );
        preguntaText.setOrigin(0.5);
    
        const opciones = ['Jugar'];
        const opcionRects = []; // Para almacenar los rectángulos de las opciones
        const opcionTexts = []; // Para almacenar los textos de las opciones
    
        opciones.forEach((opcion, index) => {
            const opcionRect = new Phaser.Geom.Rectangle(
                this.cameras.main.centerX - 100, // X de inicio del recuadro
                this.cameras.main.centerY + (index + 1) * 50 - 200, // Y de inicio del recuadro
                200, // Ancho del recuadro
                40 // Alto del recuadro
            );
    
            const opcionText = this.add.text(
                opcionRect.centerX,
                opcionRect.centerY,
                opcion,
                {
                    fontSize: '20px',
                    color: '#000000',
                    align: 'center'
                }
            );
            opcionText.setOrigin(0.5);
            opcionTexts.push(opcionText);
            
            opcionText.setInteractive({ useHandCursor: true });
            opcionText.on('pointerdown', () => {
                opcionText.setColor('#00ff00'); // Cambiar a verde (#00ff00)

                // Obtener referencia a la escena game1
                this.scene.start('scene1');
            });
            const graphics = this.add.graphics();
            graphics.fillStyle(0x333333, 0.1); // Color y opacidad del recuadro
            graphics.fillRectShape(opcionRect);
    
            // Almacenar el rectángulo y el texto en sus respectivos arrays
            opcionRects.push(opcionRect);
        });
    }
    
}