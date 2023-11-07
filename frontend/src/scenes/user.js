export class user extends Phaser.Scene {

    constructor () {
        super ({ key: 'user' }); // nombre escena
    }

    preload() {
        this.load.html('nameform', './assets/loginform.html');
        this.load.image("fondoBlanco", "./assets/fondoBlanco.png")
    }

    create() {

        const background = this.add.image(400, 300, "fondoBlanco"); // Colocar el fondo en el centro de la pantalla
        background.setScale(2);
    
        var text = this.add.text(600, 100, 'Por favor, ingresa tu nombre:', { font: '24px Arial', fill: '#000000' });
        text.setOrigin(0.5, 0.5);
        const element = this.add.dom(900, 600).createFromCache('nameform');
        element.setPerspective(800);
        element.addListener('click');
        element.on('click', function (event)
        {

            if (event.target.name === 'loginButton')
            {
                const inputUsername = this.getChildByName('username');
                const inputPassword = this.getChildByName('password');

                //  Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');
                    
                    //  Tween the login form out
                    this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });
                    
                    
                    this.scene.scene.start('scene1')
                    this.scene.tweens.add({
                        targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                        onComplete: function ()
                        {      
                            element.setVisible(false);        
                        }            
                    });

                    //  Populate the text with whatever they typed in as the username!
                    text.setText(`Welcome ${inputUsername.value}`);
                    
                }
                else
                {
                    //  Flash the prompt
                    this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                }
            }

        });
        
        this.tweens.add({
            targets: element,
            y: 300,
            duration: 3000,
            ease: 'Power3'
        });
    }
}