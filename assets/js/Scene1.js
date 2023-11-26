class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("background", "assets/imgs/background.png");
    }

    create() {
        // Display background image as a tile sprite
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);

        // Create text for "START GAME"
        const startText = this.add.text(config.width / 2, config.height / 2, "START GAME", {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff', // Set text color to white
            align: 'center',
        }).setOrigin(0.5);

        // Set the text as interactive
        startText.setInteractive();

        // Add events for text interactivity
        startText.on('pointerover', () => {
            startText.setColor('#00cccc'); // Change text color to cyan on hover
        });

        startText.on('pointerout', () => {
            startText.setColor('#ffffff'); // Reset text color to white when not hovered
        });

        startText.on('pointerdown', () => this.startGame()); // Start game when clicked

        // Center the text on the screen
        Phaser.Display.Align.In.Center(startText, this.add.zone(config.width / 2, config.height / 2, config.width, config.height));
    }

    update() {
        // Update the background position for scrolling effect
        this.background.tilePositionY += 0.5;
    }

    startGame() {
        this.scene.start("playGame");
    }
}
