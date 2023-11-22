class Scene2 extends Phaser.Scene {

    constructor() {
        super("playGame");
    }


    // Create function
    create() {
                                                                             //KEY  
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");

        // Parallax Scrolling
        this.background.setOrigin(0,0);

        // set scroll factor
        this.background.setScrollFactor(0);

        // Follow Player
        // this.cameras.main.startFollow(this.ship1);


        this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "ship");
        this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
        this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, "ship3");

        // 3.1 add the ships to a group with physics
        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship1);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);

        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");

        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();


        this.input.on('gameobjectdown', this.destroyShip, this);

        
        this.add.text(20, 20, "Playing game", {
            font: "25px Arial",
            fill: "yellow"
        });


        this.physics.world.setBoundsCollision();
        this.powerUps = this.physics.add.group();

        
        for (let i = 0; i < gameSettings.maxPowerups; i++) {
            let powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);
      
            if (Math.random() > 0.5) {
              powerUp.play("red");
            } else {
              powerUp.play("gray");
            }
      
            powerUp.setVelocity(gameSettings.powerUpVel, gameSettings.powerUpVel);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }
        
        
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

        // Enable collisions
        //this.physics.add.collider(this.projectiles, this.powerUps);
    
        // Destory the shot once it collides with object
        this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp) {
            projectile.destroy();
        });

         // Player can pick powerups
        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);

        // Overlap player with enemies
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);

        // Add overlaps with callback functions
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
        
    }

    // update function
    update() {
        // rotate image continuesly
        //this.ship1.angle += 2;


        // Move ship continuesly
        this.moveShip(this.ship1, 1);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 3);

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



    // Remove powerup when taken
    pickPowerUp(player, powerUp) {
        // make it inactive and hide it
        powerUp.disableBody(true, true);
    }

    // Reset position of player and enemy when they crash each other
    hurtPlayer(player, enemy) {
        this.resetShipPos(enemy);
        player.x = config.width / 2 - 8;
        player.y = config.height - 64;
    }

    // Reset ship position when hit
    hitEnemy(projectile, enemy) {
        projectile.destroy();
        this.resetShipPos(enemy);
    }


}