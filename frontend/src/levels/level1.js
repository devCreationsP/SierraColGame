class level1 extends Phaser.Scene
        {
            preload ()
            {


            }
    
            create ()
            {
                
            }
        }
    
        const config = {
            type: Phaser.AUTO,

            scale: {
                // mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: 9999,
                height: 1024,
            },
            
            scene: [scene1],
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 },
                    debug: true
                }
            }
        };
    
        const game = new Phaser.Game(config);
        var player;
        var cursors;
        var floor;