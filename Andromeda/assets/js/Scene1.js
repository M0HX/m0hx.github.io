class Scene1 extends Phaser.Scene {

    constructor() {
        super("bootGame");
    }



    // preload function
    preload() {          //Key          //URL
        this.load.image("background", "assets/imgs/background.png");
    
        // Add Ships
            //this.load.image("ship", "assets/imgs/ship.png");
            //this.load.image("ship2", "assets/imgs/ship2.png");
            //this.load.image("ship3", "assets/imgs/ship3.png");

        // change to spritesheet
        this.load.spritesheet("ship", "assets/imgs/spritesheets/ship.png", { 
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("ship2", "assets/imgs/spritesheets/ship2.png", { 
            frameWidth: 32,
            frameHeight: 16
        });

        this.load.spritesheet("ship3", "assets/imgs/spritesheets/ship3.png", { 
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet("explosion", "assets/imgs/spritesheets/explosion.png", { 
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("power-up", "assets/imgs/spritesheets/power-up.png", { 
            frameWidth: 16,
            frameHeight: 16
        });

    }



    // create function
    create() {

        this.add.text(20, 20, "Loading Game...");
        this.scene.start("playGame"); // switch to scene 2.. start game.
    

        

    }


}