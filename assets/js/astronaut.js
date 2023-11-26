class Astronaut extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, name) {
        super(scene, x, y, key);

        // Set initial properties
        this.name = name; // Add the name property
        this.health = 100; // health
        this.shield = 50; // shield
        this.speed = 200; // speed

        // Add the Astronaut to the scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set up physics properties
        this.setCollideWorldBounds(true);
    }

    update(cursors) {
        // Use cursors to control the astronaut's movement
        if (cursors.left.isDown) {
            this.setVelocityX(-this.speed);
        } else if (cursors.right.isDown) {
            this.setVelocityX(this.speed);
        } else {
            this.setVelocityX(0);
        }

        if (cursors.up.isDown) {
            this.setVelocityY(-this.speed);
        } else if (cursors.down.isDown) {
            this.setVelocityY(this.speed);
        } else {
            this.setVelocityY(0);
        }
    }
}
