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