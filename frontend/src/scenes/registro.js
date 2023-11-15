export class registro extends Phaser.Scene {

    constructor() {
        super({ key: 'registro' }); // nombre de la escena
    }

    preload() {
        this.load.html('registrationform', './assets/registro.html');
        this.load.image("fondoBlanco", "./assets/fondoBlanco.png");
    }

    create() {
        const background = this.add.image(400, 300, "fondoBlanco"); // Colocar el fondo en el centro de la pantalla
        background.setScale(2);

        var text = this.add.text(400, 50, 'Por favor, completa el formulario de registro:', { font: '24px Arial', fill: '#000000' });
        text.setOrigin(0.5, 0.5);

        const element = this.add.dom(900, 300).createFromCache('registrationform');
        element.setPerspective(800);
        element.addListener('click');
        element.on('click', function (event) {
            if (event.target.name === 'registerButton') {
                const inputPreguntaSecreta = this.getChildByName('preguntaSecreta');
                const inputRespuestaSecreta = this.getChildByName('respuestaSecreta');
                const inputNombreCompleto = this.getChildByName('nombreCompleto');
                const inputSexo = this.getChildByName('sexo');
                const inputFechaNacimiento = this.getChildByName('fechaNacimiento');
                const inputPassword = this.getChildByName('password');

                // Validar que se haya seleccionado una pregunta secreta
                if (inputPreguntaSecreta.value === '') {
                    alert('Por favor, selecciona una pregunta secreta.');
                    return;
                }

                // Validar que se haya ingresado una respuesta a la pregunta secreta
                if (inputRespuestaSecreta.value === '') {
                    alert('Por favor, ingresa la respuesta a la pregunta secreta.');
                    return;
                }

                // Validar que se haya ingresado el nombre completo
                if (inputNombreCompleto.value === '') {
                    alert('Por favor, ingresa tu nombre completo.');
                    return;
                }

                // Validar que se haya seleccionado el sexo
                if (inputSexo.value === '') {
                    alert('Por favor, selecciona tu sexo.');
                    return;
                }

                // Validar que se haya ingresado la fecha de nacimiento
                if (inputFechaNacimiento.value === '') {
                    alert('Por favor, ingresa tu fecha de nacimiento.');
                    return;
                }

                // Validar que se haya ingresado la contraseña
                if (inputPassword.value === '') {
                    alert('Por favor, ingresa tu contraseña.');
                    return;
                }

                // Ahora puedes hacer lo que desees con los datos del formulario, por ejemplo, enviarlos a un servidor.
                // Finalmente, redirigir a la siguiente escena si la validación es exitosa.
                this.scene.scene.start('user');
            }
        });

        this.tweens.add({
            targets: element,
            y: 450,
            duration: 2000,
            ease: 'Power3'
        });
    }
}