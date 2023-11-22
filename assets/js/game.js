// Game Settings
let gameSettings = {
    playerSpeed: 200,
}

// Setup Config
let config = {
    width: 720,
    height: 500,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2, Scene3],
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        aspectRatio: 1, // Set the aspect ratio (width / height)
    },
    // Enable Physics support
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}


// New Phaser Game Object
let game = new Phaser.Game(config);

// Function to add multiple <br> elements below the canvas
function addLineBreaks(count) {
    for (let i = 0; i < count; i++) {
        const brElement = document.createElement('br');
        document.body.appendChild(brElement);
    }
}

// Listen for the 'ready' event which indicates that the game has started
game.events.on('ready', function() {
    // Call the addLineBreaks function to add 5 <br> below the canvas
    addLineBreaks(5);
});
