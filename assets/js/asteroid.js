// asteroid.js
class Asteroid extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, explosionAnim) {
        super(scene, x, y, key);

        // Set initial properties
        this.speed = Phaser.Math.Between(1, 3);
        this.damage = 20; 

        // Save a reference to the scene and explosion animation in the asteroid instance
        this.scene = scene;
        this.explosionAnim = explosionAnim;

        // Add the asteroid to the scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set up physics properties
        this.setCollideWorldBounds(false); // Allow the asteroid to move out of bounds

        // Enable collisions between the asteroid and astronauts
        scene.physics.add.collider(this, [scene.astronaut1, scene.astronaut2], this.hitAstronaut, null, this);

        // Animation for the asteroid
        scene.anims.create({
            key: 'asteroid_anim',
            frames: scene.anims.generateFrameNumbers(key, { start: 0, end: 3 }), // Assuming 4 frames in the sprite sheet
            frameRate: 20,
            repeat: -1 // loop forever
        });

        // Play the animation
        this.play('asteroid_anim');
    }

    update() {
        // Move the asteroid upward
        this.y -= this.speed;

        // Check if the asteroid is out of the game world, and destroy it if true
        if (this.y < 0) {
            this.destroy();
        }
    }

    hitAstronaut(asteroid, astronaut) {
        // Reduce the astronaut's shield first
        if (astronaut.shield > 0) {
            astronaut.shield -= asteroid.damage;
    
            // If shield becomes negative, deduct the excess from health
            if (astronaut.shield < 0) {
                astronaut.health += astronaut.shield;
                astronaut.shield = 0;
            }
        } else {
            // If shield is depleted, subtract from health
            astronaut.health -= asteroid.damage;
        }
    
        // Play explosion animation at the asteroid's position
        const explosion = this.scene.add.sprite(asteroid.x, asteroid.y, 'explosion');
        explosion.play(this.explosionAnim);
        
        // Play explosion sound
        this.scene.explosionSound.play();

        // Destroy the explosion sprite after the animation is complete
        explosion.on('animationcomplete', () => {
            explosion.destroy();
        });
    
        // Check if the astronaut's health is zero or below
        if (astronaut.health <= 0) {
            // End the game or perform any game over logic here
            console.log(`${astronaut.name} has been defeated! Game over.`);
            
            // Check if both astronauts have zero health for a DRAW
            if (this.scene.astronaut1.health <= 0 && this.scene.astronaut2.health <= 0) {
                this.scene.scene.start('drawScene'); // drawScene
            } else {
                
                // Stop the music!
                this.scene.sound.getAll().forEach(sound => {
                    sound.stop();
                });
                            
                // Pass the winner's name to the winScreen scene
                this.scene.scene.start('winScreen', { winnerName: this.getWinnerName(astronaut) });
            }
        }
    
        // Destroy the asteroid when it collides with an astronaut
        asteroid.destroy();
    }
    

    // method to get the name of the opposite player
    getWinnerName(player) {
        return player === this.scene.astronaut1 ? this.scene.astronaut2.name : this.scene.astronaut1.name;
    }
}
