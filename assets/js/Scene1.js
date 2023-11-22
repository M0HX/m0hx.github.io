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


        // Load Player to the scene
        this.load.spritesheet("player", "assets/imgs/spritesheets/player.png", {
            frameWidth: 16,
            frameHeight: 24
        });

        // Load the Beam sprite to the scene
        this.load.spritesheet("beam", "assets/imgs/spritesheets/beam.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        // Load Bitmap Font Files
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

        // Load Audio Files
                    // resource name ,  both audio files
        this.load.audio("audio_beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);

        this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
        this.load.audio("audio_pickup", ["assets/sounds/pickup.ogg", "assets/sounds/pickup.mp3"]);
        this.load.audio("music", ["assets/sounds/sci-fi_platformer12.ogg", "assets/sounds/sci-fi_platformer12.mp3"]);
        

    }



    // create function
    create() {

        this.add.text(20, 20, "Loading Game...");
        this.scene.start("playGame"); // switch to scene 2.. start game.
    

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

        // Thrust Animation for player
        this.anims.create({
            key: "thrust",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1
        });

        // Beam Animation for player
        this.anims.create({
            key: "beam_anim",
            frames: this.anims.generateFrameNumbers("beam"),
            frameRate: 20,
            repeat: -1
        });
        

       

    }
}