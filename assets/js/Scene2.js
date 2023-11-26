class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    preload() {
        this.load.image("background", "assets/imgs/background.png");
        this.load.image('apollo', 'assets/imgs/spritesheets/Apollo.png');
        this.load.image('aurora', 'assets/imgs/spritesheets/Aurora.png');

        // Load the image for the asteroid
        this.load.spritesheet('asteroid_gray', 'assets/imgs/spritesheets/asteroid_gray.png', {
            frameWidth: 16,
            frameHeight: 16,
        });

        // Load the explosion spritesheet
        this.load.spritesheet('explosion', 'assets/imgs/spritesheets/explosion.png', {
            frameWidth: 16, 
            frameHeight: 16
        });

        // Load health power-up spritesheet
        this.load.spritesheet('healthPowerUp', 'assets/imgs/spritesheets/health.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        // Load shield power-up spritesheet
        this.load.spritesheet('shieldPowerUp', 'assets/imgs/spritesheets/shield.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        // Load the explosion sound
        this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);

        // Load the health pickup sound
        this.load.audio("audio_health_pickup", ["assets/sounds/healthPickup.ogg", "assets/sounds/healthPickup.mp3"]);

        // Load the shield pickup sound
        this.load.audio("audio_shield_pickup", ["assets/sounds/shieldPickup.ogg", "assets/sounds/shieldPickup.mp3"]);


        // Load the MUSIC!
        this.load.audio("background_music", ["assets/sounds/rickroll.ogg", "assets/sounds/rickroll.mp3"]);


    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);

        // Create astronauts for player 1 and player 2
        this.astronaut1 = new Astronaut(this, config.width / 4, config.height / 4, 'apollo', 'Apollo');
        this.astronaut2 = new Astronaut(this, (3 * config.width) / 4, config.height / 4, 'aurora', 'Aurora');

        // Set up input for player 1 (WASD keys)
        this.cursors1 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Set up input for player 2 (Arrow keys)
        this.cursors2 = this.input.keyboard.createCursorKeys();

        // Create an invisible sprite as the barrier
        this.barrier = this.physics.add.sprite(config.width / 2, config.height / 2, null);
        this.barrier.setSize(5, config.height); // Set the size of the barrier (thinner)
        this.barrier.setImmovable(true); // Make the barrier immovable
        this.barrier.setVisible(false); // Make the barrier invisible

        // Enable collisions between astronauts and the barrier
        this.physics.add.collider(this.astronaut1, this.barrier);
        this.physics.add.collider(this.astronaut2, this.barrier);

        // Create a graphics object for the barrier
        this.barrierGraphics = this.add.graphics();

        // Set the fill color and alpha for the barrier (light shade of white)
        this.barrierGraphics.fillStyle(0xeeeeee, 0.5); // Light shade of white with 0.5 alpha (transparency)

        // Draw the filled rectangle for the barrier
        this.barrierGraphics.fillRect(config.width / 2 - 2.5, 0, 5, config.height); // Thinner

        // Enable physics for the graphics object
        this.physics.world.enable(this.barrierGraphics);

        // Make the graphics object immovable
        this.barrierGraphics.body.setImmovable(true);

        // Enable collisions between astronauts
        this.physics.add.collider(this.astronaut1, this.astronaut2);

        // Create asteroids group
        this.asteroidsGroup = this.physics.add.group();

        // Set a timer to create random asteroids at intervals
        this.asteroidTimer = this.time.addEvent({
            delay: 1000, // Set the delay between asteroid creation
            callback: this.spawnAsteroid,
            callbackScope: this,
            loop: true, // Set to true for continuous asteroid creation
        });

        // Create health power-up group
        this.healthPowerUpsGroup = this.physics.add.group();

        // Create shield power-up group
        this.shieldPowerUpsGroup = this.physics.add.group();

        // Set a timer to create random health power-ups at intervals
        this.healthPowerUpTimer = this.time.addEvent({
            delay: 20000, // Set the delay between health power-up creation 
            callback: this.spawnHealthPowerUp,
            callbackScope: this,
            loop: true, // Set to true for continuous power-up creation
        });


        // Set a timer to create random shield power-ups at intervals
        this.shieldPowerUpTimer = this.time.addEvent({
            delay: 22000, // Set the delay between shield power-up creation
            callback: this.spawnShieldPowerUp,
            callbackScope: this,
            loop: true, // Set to true for continuous power-up creation
        });

        // Create text objects to display player information
        this.player1InfoText = this.add.text(16, 16, '', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
        });

        this.player2InfoText = this.add.text(config.width - 16, 16, '', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            align: 'right',
        });
        this.player2InfoText.setOrigin(1, 0); // Align text to the top right

        // Set transparency using setAlpha method
        this.player1InfoText.setAlpha(0.3);
        this.player2InfoText.setAlpha(0.3);

        // Load the explosion spritesheet
        this.load.spritesheet('explosion', 'assets/imgs/spritesheets/explosion.png', {
            frameWidth: 16, frameHeight: 16
        });

        // Create explosion animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 4 }), // Assuming 5 frames in the sprite sheet
            frameRate: 20,
            repeat: 0 // Play only once
        });

        // Create explosion sound
        this.explosionSound = this.sound.add("audio_explosion");

        // Create health pickup sound
        this.healthPickupSound = this.sound.add("audio_health_pickup");

        // Create shield pickup sound
        this.shieldPickupSound = this.sound.add("audio_shield_pickup");

        // Play MUSIC ! :D
        this.backgroundMusic = this.sound.add("background_music", { loop: true, volume: 0.5 });
        this.backgroundMusic.play();
    }

    update() {
        this.background.tilePositionY += 0.7;

        // Call update method for both astronauts
        this.astronaut1.update(this.cursors1);
        this.astronaut2.update(this.cursors2);

        // Update asteroids
        this.asteroidsGroup.getChildren().forEach((asteroid) => {
            asteroid.update();
        });

        // Update health power-ups
        this.healthPowerUpsGroup.getChildren().forEach((powerUp) => {
            // update logic for power-ups if needed
        });

        // Update shield power-ups
        this.shieldPowerUpsGroup.getChildren().forEach((powerUp) => {
            // update logic for shield power-ups if needed
        });

        // Update player information text
        this.player1InfoText.setText(`Player 1\nName: ${this.astronaut1.name}\nHealth: ${this.astronaut1.health}\nShield: ${this.astronaut1.shield}`);
        this.player2InfoText.setText(`Player 2\nName: ${this.astronaut2.name}\nHealth: ${this.astronaut2.health}\nShield: ${this.astronaut2.shield}`);
    }

    spawnAsteroid() {
        // Define safe zone in the middle of the canvas with increased width
        const safeZoneWidth = this.game.config.width / 3;

        // Define the barrier width to avoid spawning asteroids on the barrier
        const barrierWidth = 5;

        // Calculate the maximum distance from the barrier on both sides
        const maxDistanceFromBarrier = Math.min(safeZoneWidth - barrierWidth, safeZoneWidth * 2 - barrierWidth);

        // The safe zone range to avoid the region occupied by the barrier
        const safeZoneRange = [
            Phaser.Math.Between(barrierWidth, maxDistanceFromBarrier),
            Phaser.Math.Between(safeZoneWidth * 2 + barrierWidth, safeZoneWidth * 3 - barrierWidth)
        ];

        // Randomly choose a spawn position within the safe zone
        const randomX = Phaser.Math.Between(safeZoneRange[0], safeZoneRange[1]);

        // Always spawn at the bottom
        const startY = this.game.config.height;
        const randomY = startY;

        // Create a new asteroid instance with the correct spritesheet and explosion animation
        const asteroid = new Asteroid(this, randomX, randomY, 'asteroid_gray', this.anims.get('explode'));
        this.asteroidsGroup.add(asteroid);
    }

    // Function to spawn health power-up
    spawnHealthPowerUp() {
        const randomX = Phaser.Math.Between(0, this.game.config.width);
        const randomY = Phaser.Math.Between(0, this.game.config.height);

        const healthPowerUp = new HealthPowerUp(this, randomX, randomY, 'healthPowerUp');
        this.healthPowerUpsGroup.add(healthPowerUp);
    }

    // Function to spawn shield power-up
    spawnShieldPowerUp() {
        const randomX = Phaser.Math.Between(0, this.game.config.width);
        const randomY = Phaser.Math.Between(0, this.game.config.height);

        const shieldPowerUp = new ShieldPowerUp(this, randomX, randomY, 'shieldPowerUp');
        this.shieldPowerUpsGroup.add(shieldPowerUp);
    }

}