// JavaScript source code

        var config = {       //or const game = new Phaser.Game({ to make it constant/unchangeable
            type: Phaser.AUTO, //Rendering context(webgl, canvas)|  ../ = up a folder
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        var game = new Phaser.Game(config);

        var score = 0
        var scoreText;

        function preload ()
        {
            this.load.image('sky', 'assets/sky.png');
            this.load.image('ground', 'assets/platform3.png');
            this.load.image('ground2', 'assets/platform4.png');
            this.load.image('ground3', 'assets/platform5.png');
            this.load.image('star', 'assets/spaceblock1.png');
            this.load.image('bomb', 'assets/bomb3.png');
            this.load.spritesheet('sheep', 'assets/spritesheep9.png',
                { frameWidth: 62, frameHeight: 48 }
            );
        }

        function create ()
        {
            this.add.image(400, 300, 'sky');

            platforms = this.physics.add.staticGroup();

            platforms.create(400, 568, 'ground').setScale(2).refreshBody();

            platforms.create(600, 400, 'ground2');
            platforms.create(50, 250, 'ground3');
            platforms.create(750, 260, 'ground2');
            platforms.create(230, 340, 'ground3');

            //this.add.image(192, 31, 'star').setScale(0.5);


            stars = this.physics.add.group({  //creating a dynamic physics group so the they move/bounce
                key: 'star',
                repeat: 11, //create 11 more
                setXY: { x: 12, y: 0, stepX: 70 } //creates each starting at xy and with a gap of stepx.
            });

            stars.children.iterate(function (child) {

                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.8); //give random bounce value between .4 & .8. (0 = no bounce, 1= full)

            });

            this.physics.add.collider(stars, platforms);           

            //PLAYER
            player = this.physics.add.sprite(100, 450, 'sheep');

            player.setBounce(0.2);
            player.setCollideWorldBounds(true);

            player.body.setGravityY(50)
            this.physics.add.collider(player, platforms);

            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('sheep', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'turn',
                frames: [ { key: 'sheep', frame: 4 } ],
                frameRate: 20
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('sheep', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1 //-1 loops it
            });

            this.physics.add.overlap(player, stars, collectStar, null, this); //check player collides with star. if yes do function CollectStar('')

            cursors = this.input.keyboard.createCursorKeys();//\\<<>>\\//

            scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        
            bombs = this.physics.add.group();

            this.physics.add.collider(bombs, platforms);
            this.physics.add.collider(player, bombs, hitBomb, null, this); //run hitbomb() if player hit
        }

        function collectStar (player, star)
        {
            star.disableBody(true, true);

            score += 10;
            scoreText.setText('Score: ' + score);

            if (stars.countActive(true) === 0) //if all stars are collected, spawn more
            {
                stars.children.iterate(function (child) {

                    child.enableBody(true, child.x, 0, true, true);

                });
            }
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400); //spawn bomb at random x away from player

                var bomb = bombs.create(x, 16, 'bomb').setScale(0.5);
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }

        function hitBomb (player, bomb)
        {
            this.physics.pause(); //stop game

            player.setTint(0xff0000); //turn player red

            player.anims.play('turn');

            gameOver = true;
        }



        function update ()
        {
            if (cursors.left.isDown)
            {
                player.setVelocityX(-160);

                player.anims.play('left', true);
            }
            else if (cursors.right.isDown)
            {
                player.setVelocityX(160);

                player.anims.play('right', true);
            }
            else
            {
                player.setVelocityX(0);

                player.anims.play('turn');
            }

            if (cursors.up.isDown && player.body.touching.down)
            {
                player.setVelocityY(-330);
            }
        }