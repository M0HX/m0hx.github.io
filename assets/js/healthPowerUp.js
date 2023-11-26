// healthPowerUp.js
class HealthPowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        // Set initial properties
        this.healingAmount = 10;

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
        // Increase astronaut's health, but ensure it doesn't exceed the maximum value
        astronaut.health = Math.min(astronaut.health + this.healingAmount, 100);

        // Play health pickup sound
        this.scene.healthPickupSound.play();

        // Destroy the power-up when collected
        this.destroy();
    }

    destroyPowerUp() {
        // Destroy the power-up after 5 seconds
        this.destroy();
    }
}

