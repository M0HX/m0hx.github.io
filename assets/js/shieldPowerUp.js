// shieldPowerUp.js
class ShieldPowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        // Set initial properties
        this.shieldAmount = 10;

        // Save a reference to the scene in the power-up instance
        this.scene = scene;

        // Add the power-up to the scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set up physics properties
        this.setCollideWorldBounds(false);

        // Enable collisions between the power-up and astronauts using overlap
        scene.physics.add.overlap(this, [scene.astronaut1, scene.astronaut2], this.collectPowerUp, null, this);

        // Set a timer to destroy the power-up after 5 seconds
        scene.time.delayedCall(5000, this.destroyPowerUp, [], this);
    }

    collectPowerUp(powerUp, astronaut) {
        // Increase astronaut's shield, but ensure it doesn't exceed the maximum value
        astronaut.shield = Math.min(astronaut.shield + this.shieldAmount, 100);

        // Play shield pickup sound
        this.scene.shieldPickupSound.play();

        // Destroy the power-up when collected
        this.destroy();
    }

    destroyPowerUp() {
        // Destroy the power-up after 5 seconds
        this.destroy();
    }
}

