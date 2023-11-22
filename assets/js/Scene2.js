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


        // Add player with its animation at the end of create function
        this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
        this.player.play("thrust");

        // Create variable to listen to "Keyboard Events" 
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        // Set boundaries for Player's ship!
        this.player.setCollideWorldBounds(true);

        // Assign a key so that the player can shoot!
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Create group to hold all our projectiles
        this.projectiles = this.add.group();
    
    }

    // update function
    update() {
        // rotate image continuesly
        //this.ship1.angle += 2;


        // Move ship continuesly
        //this.moveShip(this.ship1, 1);
        //this.moveShip(this.ship2, 2);
        //this.moveShip(this.ship3, 3);

        // Move the background tilesprite y position so it looks like moving!
        this.background.tilePositionY -= 0.5;

        // Call function to control the player's ship
        this.movePlayerManager();

        // Player ship shoot
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            //console.log("Fire!");
            // Call shootBeam function!
            this.shootBeam();
        }

        // Iterate through each element of projectile group and update it!
        for(let i = 0; i < this.projectiles.getChildren().length; i++) {
            let beam = this.projectiles.getChildren()[i];
            beam.update();
        }

        

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

    // movePlayerManager Callback function (To move player's ship!)
    movePlayerManager() {
        
        // Move Horizontally
        if(this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-gameSettings.playerSpeed);
        } else if(this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed);
        }

        // Move Vertically
        if(this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-gameSettings.playerSpeed);
        } else if(this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        }




    }


    // shootBeam function to shoot the beam. UwU
    shootBeam() {
        //let beam = this.physics.add.sprite(this.player.x, this.player.y, "beam");
    
        // Create variable "Beam" from the "Class Beam" and pass the scene as parameter.
        let beam = new Beam(this);
    
    }



}