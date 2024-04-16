//Menu Scene

        var config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: [MenuScene, GameScene] // Include the menu scene and game scene
        };

        // Create the game instance
        var game = new Phaser.Game(config);  
        

        var MenuScene = new Phaser.Class({

            Extends: Phaser.Scene,

            initialize:

            function MenuScene() {
                Phaser.Scene.call(this, { key: 'MenuScene' });
            },

            preload: function () {
                // Preload menu assets, such as images and fonts
            },

            create: function () {
                // Add background image
                this.add.image(400, 300, 'background');

                // Add title text
                var titleText = this.add.text(400, 200, 'My Game', {
                    fontSize: '48px',
                    fontFamily: 'Arial',
                    color: '#ffffff'
                });
                titleText.setOrigin(0.5);

                // Add play button
                var playButton = this.add.text(400, 300, 'Play', {
                    fontSize: '32px',
                    fontFamily: 'Arial',
                    color: '#ffffff',
                    backgroundColor: '#000000',
                    padding: {
                        x: 20,
                        y: 10
                    }
                });
                playButton.setOrigin(0.5);
                playButton.setInteractive(); // Enable input events for the button
                playButton.on('pointerdown', function () {
                    // Transition to the game scene when the button is clicked
                    this.scene.start('GameScene');
                }, this);
            }
        });

        export default MenuScene;
         
        