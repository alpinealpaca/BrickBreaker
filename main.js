// JavaScript source code
        var config = {       
            type: Phaser.AUTO, 
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    //gravity: { y: 300 },              
                    debug: false                     
                }                                    
            },
            scene: {
                preload: preload,
                create: create,
                update: update,
                init: init
            }
        };

        var game = new Phaser.Game(config);

 
        //Bricks
        var brickWidth = 80;
        var brickHeight = 56;
        var brickColours = ['brickPink', 'brickGreen', 'brickBlue', 'brickViolet']; 
        
        //Lives + Points
        var g_txtLives;
        var g_txtPoints;

        //Magic ball attempt #2
        var ball;
        var magicBall;
        var currentBall;
        var currentTexture;
        var ballVisible = true; 

        //Menu
        var menuBackground;
        var titleText;
        var playButton;
        var menuActive = true;

        var gameOverBackground;
        var gameOverText;
        var replayButton;

        var levelOverBackground;
        var levelOverText;
        
        function init() {

            this.numCols = 10;
            this.numRows = 4;
            this.lives = 3;
            this.points = 0; 

        }

        function preload ()
        {
            this.load.image('sky', 'assets/sky.png');   
            this.load.image('line', 'assets/lowline.png');  
            this.load.image('ball1', 'assets/bomb3.png');  
            this.load.image('magicball', 'assets/magicball1.png');  
            this.load.image('paddle', 'assets/paddle.png');
            this.load.image('brickRed', 'assets/breakerblockred.png');  
            this.load.image('brickOrange', 'assets/breakerblockorange.png');  
            this.load.image('brickYellow', 'assets/breakerblockyellow.png');  
            this.load.image('brickGreen', 'assets/breakerblockgreen.png');  
            this.load.image('brickBlue', 'assets/breakerblockblue.png');  
            this.load.image('brickDarkBlue', 'assets/breakerblockbluedark.png');  
            this.load.image('brickPurple', 'assets/breakerblockpurple.png'); 
            this.load.image('brickViolet', 'assets/breakerblockviolet.png'); 
            this.load.image('brickPink', 'assets/breakerblockpink.png');  
            this.load.image('brickWhite', 'assets/breakerblockwhite.png');  
            this.load.image('brickBlack', 'assets/breakerblockblack.png');  
            this.load.image('brickBlank', 'assets/breakerblockblank.png');  
            this.load.image('brick', 'assets/breakerblock.png');  
            this.load.image('brickRainbow', 'assets/breakerblockx.png');  
            this.load.image('menubg', 'assets/skysym.png'); 
            this.load.image('gameoverbg', 'assets/skyred.png'); 
            this.load.image('menubrickbg', 'assets/breakerblockbluegiant.png'); 
        }



        function toggleMenu() {
            menuBackground.setVisible(!menuBackground.visible); //menuBackground.setVisible(false); 
            titleText.setVisible(!titleText.visible); //hide or unhide if hidden
            playButton.setVisible(!playButton.visible);
        }



        function loseLife() {
            resetPaddle.call(this);
            this.lives--;
            this.txtLives.setText(g_txtLives + this.lives);
            console.log('Lose life triggered. Lives remaining: ' + this.lives);    
            if (this.lives <= 0) {
                console.log('GAME OVER');
                gameOverBackground = this.add.image(400, 300, 'gameoverbg');
                //gameOverBlock = this.add.image(400, 300, 'menubrickbg');
                //gameOverText.setVisible(true)
                gameOverText = this.add.text(400, 200, 'GAME OVER', {
                    fontSize: '88px',
                    fontFamily: 'Trebuchet MS',
                    color: '#ffffff'
                });
                gameOverText.setOrigin(0.5);

                replayButton = this.add.text(400, 300, 'Menu', {
                    fontSize: '32px',
                    fontFamily: 'Helvetica',
                    color: '#ffffff',
                    backgroundColor: '#212121',
                    padding: {
                        x: 20,
                        y: 10
                    }
                });
                replayButton.setOrigin(0.5);
                replayButton.setInteractive();
                replayButton.on('pointerdown', function () {               
                    this.scene.restart();                  
                }, this);
            }
        }

        function resetPaddle () {
            this.paddle.x = this.cameras.main.centerX;
            this.paddle.y = this.game.config.height - this.paddle.displayHeight; 
            this.ball.x = this.paddle.x;
            this.ball.y = this.paddle.height + 460;
            //this.ball.y = 300;
            isShot = false;
            //console.log('reset');
            followPaddle = true;

        }


        function shootBall (pointer) {      
            if (isShot) {
                return;
            }
            ///console.log('shootball');
            isShot = true; 
            //var velArray = [1, -1];
            //var rand = Phaser.Math.Between(0, velArray.length - 1);
            //var vel = velArray[rand];   
            //var x = this.ball.iniVelX * vel;
            ////var y = this.ball.iniVelY * vel;   
            //this.ball.body.velocity.set(x, y);
            followPaddle = false;
            
        }

        //function swapBall() {          
            //if (currentBall === ball) {
                //this.ball.setVisible(false);
                //ballVisible = false;
              //  if ('ball' in this) { // Check if ball exists
                //    console.log('vis');
                    //this.ball.setVisible(ballVisible); // Update visibility
                    //ball.setVisible(true);

                  //  console.log(ball);
                //}
                //else {
                //    console.log('error');
                //}
                //magicBall.setVisible(true);
                //currentBall = magicBall;
                //console.log('swapball');
            //} else {
                //ball.setVisible(true);
                //magicBall.setVisible(false);
                //currentBall = ball;
            //}
        //}

        

        // // C R E A T E 
        function create ()
        //create: function () {
        {
            this.add.image(400, 300, 'sky');   
            this.add.image(400, 590, 'line');      

            
            //text var
            g_txtLives = "Lives: ";
            g_txtPoints = "Points: ";
            var initialLives = 3;
            var initialPoints = 0;

            
            //BALL

            this.ball = this.physics.add.sprite(0, 0, 'ball1');

            currentTexture = 'ball1'; 
            
            this.ball.isShot = false;

            magicBall = this.physics.add.sprite(50, 500, 'magicball').setVisible(false);

            currentBall = ball; //for swapBall()

            //Ball physics
            this.ball.body.enable = true;
            this.ball.setBounce(1);
            this.ball.setCollideWorldBounds(true);
            this.ball.body.velocity.x = 200;
            this.ball.body.velocity.y = 200;

            this.physics.world.setBounds(0, 0, 800, 575); //world edge physics

            ////this.block = this.physics.add.sprite(400, 300, 'brick');

            //PADDLE          
            this.prevX = this.input.x; 
            //this.paddleVelX = 500 / 1000; //keyboard only
            this.paddle = this.physics.add.sprite(0, 0, 'paddle'); 
            this.paddle.setOrigin(0.5, 1); //set anchor to bottom centre.
            
            this.paddle.body.immovable = true;

            this.paddleHalf = this.paddle.width / 2;   
            // Position the paddle at the bottom center of the screen
            this.paddle.x = this.game.config.width / 2;
            this.paddle.y = this.game.config.height;

            //console.log("Before executing the line of code");

            resetPaddle.call(this);
            

            

            //BRICKS

            this.bricks = this.physics.add.group();
            //this.blocks = this.physics.add.group();

            //adding slice takes only that many from the array to make a new smaller one
            brickColours.slice(0, 4).forEach(function(colour, i) {
                var bricksForRow = this.bricks.createMultiple({
                    key: colour,
                    repeat: this.numCols - 1,
                    setXY: { x: 40, y: i * brickHeight + 28, stepX: brickWidth }
                });
            }, this);
            
            
            // Enable collisions for each brick in the group
            this.bricks.children.iterate(function (brick) {
                brick.body.enable = true;
                brick.body.immovable = true;
                //brick.setCollideWorldBounds(true); // Optional: Enable world bounds collision for bricks
                //brick.setBounce(1); // Optional: Set bounce for bricks
                //brick.setInteractive(); // Optional: Enable interaction with bricks
            });

            
            

            // Optionally, you can set additional properties for each brick in the group
            // Example: Set a custom data property for each brick
            ///this.bricks.children.iterate(function (brick) {
            ///    brick.setData('health', 1); // Set a 'health' property for each brick
            ///});


            this.removeBrick = function (ball, brick) {                               
                this.points += 10;
                txtPoints.setText(g_txtPoints + this.points);
                
                //this.sfxHitBrick.play();

                brick.destroy(); // Destroy the brick sprite

                if (this.bricks.getChildren().length <= 0) {
                    console.log("Level complete!");

                    Background = this.add.image(400, 300, 'sky');
  
                    levelOverText = this.add.text(400, 200, 'LEVEL COMPLETE', {
                        fontSize: '88px',
                        fontFamily: 'Trebuchet MS',
                        color: '#ffffff'
                    });
                    levelOverText.setOrigin(0.5);

                    replayButton = this.add.text(400, 300, 'Menu', {
                        fontSize: '32px',
                        fontFamily: 'Helvetica',
                        color: '#ffffff',
                        backgroundColor: '#212121',
                        padding: {
                            x: 20,
                            y: 10
                        }
                    });
                    replayButton.setOrigin(0.5);
                    replayButton.setInteractive();
                    replayButton.on('pointerdown', function () {               
                        this.scene.restart();                  
                    }, this);




                }
            }

            //COLLISIONS

            //>>setupCollisionLogic(currentTexture); //<<<<

            this.physics.add.collider(this.ball, this.paddle, this.handleBallPaddleCollision, null, this);
            //this.physics.add.collider(this.ball, this.bricks, this.handleBallBrickCollision, null, this);
            this.physics.add.collider(this.ball, this.bricks, this.removeBrick, null, this);
            
            ///this.physics.add.overlap(this.magicBall, this.bricks, this.removeBrick, null, this);


            
            
            this.ball.setCollideWorldBounds(true); //Enable world bounds checking for the ball sprite           
            this.ball.on('worldbounds', loseLife);//this.ball.on('worldbounds', loseLife.bind(this));//this.ball.on('worldbounds', () => loseLife());  //Add event listener for the world bounds event

            
            //TEXT
            var txtLives = this.add.text(10, this.sys.game.config.height - 6, g_txtLives + initialLives, {
                fontFamily: 'Helvetica',
                fontSize: '18px',
                color: '#ffffff'
            });
            txtLives.setOrigin(0, 1); //Align text to the bottom left
            this.txtLives = txtLives; //Assign txtLives to a property of 'this' so it can be accessed from other functions

            var txtPoints = this.add.text(this.sys.game.config.width - 10, this.sys.game.config.height - 6, g_txtPoints + initialPoints, {
                fontFamily: 'Trebuchet MS',
                fontSize: '18px',
                color: '#ffffff'
            });
            txtPoints.setOrigin(1, 1);
            //\\///\\\\/////\\\\\/////\\\\\\
            //MENU\\
            menuBackground = this.add.image(400, 300, 'menubg');

            titleText = this.add.text(400, 200, 'Rainbow Blocks', {
                fontSize: '88px',
                fontFamily: 'Rhodium Libre',
                color: '#a023dd'
            });
            titleText.setOrigin(0.5);

            playButton = this.add.text(400, 300, 'Play', {
                fontSize: '32px',
                fontFamily: 'Helvetica',
                color: '#eeeeff',
                backgroundColor: '#212121',
                padding: {
                    x: 20,
                    y: 10
                }
            });
            playButton.setOrigin(0.5);
            playButton.setInteractive(); //Enable input events for the button
            playButton.on('pointerdown', function () {
                
                menuActive = false; 

                //LISTENERS
                //pointer down event listener
                this.input.on('pointerdown', function(pointer) {
                    shootBall(pointer);
                }, this);//this.input.on('pointerdown', this.shootBall, this);

                toggleMenu(); 
            }, this);

            //Game Over Text           
            

        }










        let isShot = false;

        let followPaddle = true;

        //loselife Logic
        var bottomOfScreen = 550;
        var lastLifeLostTime = 0; 
        var firstFall = false;

        function update ()        
        {   
            if (followPaddle) {
                    // Update the ball's position to follow the paddle
                    this.ball.x = this.paddle.x; // or this.input.x
                    this.ball.y = 521;
            }

            if (!menuActive) { // Logic for the game after menu is hidden
    
                //console.log('Ball Y-coordinate:', this.ball.y);
                var time = this.time.now;    
                if (this.ball.y > bottomOfScreen) {
                    if (!firstFall || time - lastLifeLostTime > 2000) {
 
                        loseLife.call(this);
                        lastLifeLostTime = time; 
                        firstFall = true; 
                    }
                }

                


                if (this.input.keyboard.checkDown(this.input.keyboard.addKey('B'), 500)) { 
                    //swapBall();
                    ///this.ball.setVisible(false);

                    if (currentBall === ball) {

                        this.ball.setVisible(false);
                        //ballVisible = false;
                        //if ('ball' in this) { // Check if ball exists
                            //console.log('vis');
                            //this.ball.setVisible(ballVisible); // Update visibility
                            //ball.setVisible(true);

                            //console.log(ball);
                        //}
                        //else {
                        //    console.log('error');
                        //}
                
                        currentBall = magicBall;
                        magicBall.setVisible(true);

                        console.log('swapball');
                } else {
                    this.ball.setVisible(true);
                    magicBall.setVisible(false);
                    currentBall = ball;
                }
                }


                // Check for mouse movement
                if (this.prevX !== this.input.x) {

                    this.paddle.x = this.input.x;
                } else { // If no mouse movement, check keyboard input
                    const cursors = this.input.keyboard.createCursorKeys();
        
                    //// Move paddle based on keyboard input
                    //if (cursors.right.isDown && !cursors.left.isDown) {
                    //    this.paddle.x += this.paddleVelX * this.time.delta / 1000;
                    //} else if (cursors.left.isDown && !cursors.right.isDown) {
                    //    this.paddle.x -= this.paddleVelX * this.time.delta / 1000;
                    //}
                }
    
                // Update previous mouse position
                this.prevX = this.input.x;
  
                // Limit paddle movement within screen bounds
                const halfPaddleWidth = this.paddle.width / 2;
                const screenWidth = this.game.config.width;
    
                if (this.paddle.x - halfPaddleWidth < 0) {
                    this.paddle.x = halfPaddleWidth;
                }

                if (this.paddle.x + halfPaddleWidth > screenWidth) {
                    this.paddle.x = screenWidth - halfPaddleWidth;
                }




                //TEXT VALUES
                ///this.physics.world.collide(this.ball, this.bottomBoundary, function() {
                    // Decrement the number of lives
                ///    updatedLives--;

                    // Update the text content of txtLives with the updated number of lives
                ///    txtLives.text = g_txtLives + updatedLives;

                    // Reset the ball and paddle positions
                    //this.resetPaddle();
                    //this.resetBall();
                ///}, null, this);


                //txtLives.text = g_txtLives + updatedLives;
                //txtPoints.text = g_txtPoints + updatedPoints;

                //BALL
                if (!this.ball.isShot) {
                    //this.ball.x = this.paddle.x;
                }
            }
            
        }
