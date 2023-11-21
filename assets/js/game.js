// window.onload = function() {
//     let game = new Phaser.Game();
// }


// Setup Config
let config = {
    width: 256,
    height: 272,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2, Scene3],
    mode: Phaser.Scale.Center,  // Scale.Center | Scale.FIT | Scale.CENTER_BOTH
    scale: {autoCenter: Phaser.Scale.CENTER_BOTH}, // Center Game

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
