class Scene3 extends Phaser.Scene {
    constructor() {
        super("winScreen");
    }

    init(data) {
        // Extract the winner's name from the data passed during scene start
        this.winnerName = data.winnerName;
    }

    preload() {
        // Preload the winner's image
        this.load.image(this.winnerName, `assets/imgs/spritesheets/${this.winnerName}.png`);

        // Preload the new sound for Scene3
        this.load.audio("winSound", ["assets/sounds/wow.ogg", "assets/sounds/wow.mp3"]);
    }

    create() {
        // Display the winner's image
        const winnerImage = this.add.image(config.width / 2, config.height / 3, this.winnerName);
        winnerImage.setOrigin(0.5);

        // Display the winner's name below the image
        const text = this.add.text(config.width / 2, (config.height / 3) * 2, `Winner: ${this.winnerName}`, {
            font: "32px Arial",
            fill: "#fff",
        });
        text.setOrigin(0.5);

        // Play the new sound
        this.newSound = this.sound.add("winSound", { volume: 0.5 });
        this.newSound.play();

        // Create "Play Again" text button
        const playAgainText = this.add.text(config.width / 2, (config.height / 3) * 2.5, "Play Again", {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff', // Set text color to white
        }).setOrigin(0.5);

        // Set the text as interactive
        playAgainText.setInteractive();

        // Add events for text interactivity
        playAgainText.on('pointerover', () => {
            playAgainText.setColor('#00cccc'); // Change text color to cyan on hover
        });

        playAgainText.on('pointerout', () => {
            playAgainText.setColor('#ffffff'); // Reset text color to white when not hovered
        });

        playAgainText.on('pointerdown', () => this.playAgain()); // Play again when clicked
    }

    playAgain() {
        this.scene.start("playGame");
    }
}
