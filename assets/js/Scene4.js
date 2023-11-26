class Scene4 extends Phaser.Scene {
    constructor() {
        super("drawScene");
    }

    create() {
        // Display a "DRAW" message
        this.add.text(config.width / 2, config.height / 2, 'DRAW', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
        }).setOrigin(0.5);
    }
}