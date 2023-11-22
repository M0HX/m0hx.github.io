class Explosion extends Phaser.GameObjects.Sprite {
    // Play the "Explode" Animation
    constructor(scene, x, y) {
        super(scene, x, y, "explosion");

        scene.add.existing(this);
        this.play("explode");
    }
}