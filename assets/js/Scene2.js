class Scene2 extends Phaser.Scene {

    constructor() {
        super("playGame");
    }


    // Create function
    create() {

        // Add background image                 //KEY
        //this.background = this.add.image(0,0,"background");
                                                                                  //KEY  
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");


        // Parallax Scrolling
        this.background.setOrigin(0,0);

        // set scroll factor
        this.background.setScrollFactor(0);

        // Follow Player
        // this.cameras.main.startFollow(this.ship1);



        // Add ships to scene2 with key values.
        // this.ship1 = this.add.image(config.width/2 - 50, config.height/2, "ship");
        // this.ship2 = this.add.image(config.width/2, config.height/2, "ship2");
        // this.ship3 = this.add.image(config.width/2 + 50, config.height/2, "ship3");
        
        // Change Image to Sprite
        this.ship1 = this.add.sprite(config.width/2 - 50, config.height/2, "ship");
        this.ship2 = this.add.sprite(config.width/2, config.height/2, "ship2");
        this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2, "ship3");
        

        // Animate the sprite

        //Ship 1 Animte
        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("ship"),
            frameRate: 20,
            repeat: -1 // loop forever
        });

        //Ship 2 Animte
        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate: 20,
            repeat: -1 // loop forever
        });

        //Ship 3 Animte
        this.anims.create({
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate: 20,
            repeat: -1 // loop forever
        });

        //Explosion Animte
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true // so it disappear when it completes, runonce basically.
        });

        // Test ships animation
        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");

        // Make each ship interactive (to destroy when clicked on! and explosion)
        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        // Add event listener to listens whenever an interactive object is clicked. //destory
        this.input.on('gameobjectdown', this.destroyShip, this);


        //scale image
        this.ship1.setScale(2);

        // flip y image
        this.ship1.flipY = true;

        // Add text to canvas
        this.add.text(20, 20, "Playing Game", {font: "25px Arial", fill: "Yellow"});
    
        
        // add 2 animations for physics
        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 0,
                end: 1
            }),
            frameRate: 26,
            repeat: -1
        });

        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 2,
                end: 3
            }),
            frameRate: 26,
            repeat: -1
        });

        // Power Ups Bag
        this.powerUps = this.physics.add.group();

        // define how many powerups we want in for loop. (how I'll display meteros/comets)
        let maxObjects = 4;
        for (let i = 0; i <= maxObjects; i++) {
            let powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);
        
        
            // random animations for powerups
            if(Math.random() > 0.5) {
                powerUp.play("red");
            } else {
                powerUp.play("gray");
            }


            // Set Velocity of powerups // change velocity
            powerUp.setVelocity(100, 100);

            // Set Barrier/Boundaries for powerups
            powerUp.setCollideWorldBounds(true);

            // Make the powerups bounce
            powerUp.setBounce(1);


        }
    
    }

    // update function
    update() {
        // rotate image continuesly
        this.ship1.angle += 2;


        // Move ship continuesly
        this.moveShip(this.ship1, 1);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 3);

        // Move the background tilesprite y position so it looks like moving!
        this.background.tilePositionY -= 0.5;
    }



    //--- Functions ---//


    // Move Ship
    moveShip(ship, speed) {
        ship.y += speed;  /// I want the reverse! cuz objects/obstacles are going to be from down to up!

        // Rest + Random X position
        if(ship.y > config.height) {
            this.resetShipPos(ship);
        }
    } 

    // Reset Ship Position
    resetShipPos(ship) {
        ship.y = 0;
        let randomX = Phaser.Math.Between(0, config.width); // to set ship on random x-axis
        ship.x = randomX;
    }

    // DestroyShip Callback function
    destroyShip(pointer, gameObject) {
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }



}