class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        // get the position of the player's ship using the scene's reference
        let x = scene.player.x;
        let y = scene.player.y - 16;

        super(scene, x, y, "beam");

        // Add gameObject to the scene
        //scene.projectiles.add(this);
        scene.add.existing(this);

        // Play Beam Animation
        this.play("beam_anim");
        scene.physics.world.enableBody(this); //enable spritesheet to have physics
        this.body.velocity.y = - 250; // set velocity to go upwards!
    
        // Add the beam projectiles group
        scene.projectiles.add(this);
    }



    // Update Method
    update() {

        // if beam reaches on top of canvas more than 32 ... destory it!
        if(this.y < 32) {
            this.destroy();
        }

    }
}