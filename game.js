// Game scenes...


        import MenuScene from './menu.js';
        import MainScene from './main.js';

        // Define game configuration
        var config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: [MenuScene, MainScene] // Include scene classes in the array
        };

        // Create game instance
        var game = new Phaser.Game(config);