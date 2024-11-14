import Phaser from 'phaser';
import KeyHandler from '../KeyHandler';

export default class Gameplay extends Phaser.Scene {
    constructor()
    {
        super('Gameplay'); // what am I doing here? i dont get super still
    }
    
    preload() {
        this.load.image('sky', '../assets/sky.png');
        this.load.image('star', '../assets/star.png');
    }
    
    create() {
        this.add.image(400, 300, 'sky');
        this.player = this.physics.add.sprite(100, 450, 'star');
        this.player.setCollideWorldBounds(true);

        this.zombies = this.physics.add.group();
        this.physics.add.collider(this.zombies, this.player)

        const kh = new KeyHandler(this);
        this.keyObject = kh.getKeys();

        this.text = this.add.text(10, 10, '', { fill: '#00ff00' }).setDepth(1);
        this.input.mouse.disableContextMenu();
        this.input.on('pointerdown', function (pointer) {}, this); // TODO: Figure this out
    }

    update() {
        const pointer = this.input.activePointer;

        // debug text
        // this.text.setText([
        //     `x: ${pointer.worldX}`,
        //     `y: ${pointer.worldY}`,
        //     `lmb: ${pointer.leftButtonDown()}`,
        //     `rmb: ${pointer.rightButtonDown()}`,
        //     `mmb: ${pointer.middleButtonDown()}`
        // ]);
        
        // if (pointer.leftButtonDown) 
        // {
        //     var zombie = this.zombies.create(pointer.worldX, pointer.worldY, 'star');
        // }
        
        if (this.keyObject.left.isDown) {
            this.player.setVelocityX(-160);

        }
        else if (this.keyObject.right.isDown) {
            this.player.setVelocityX(160);

        }
        else {
            this.player.setVelocityX(0);
        }
        if (this.keyObject.up.isDown) {
            this.player.setVelocityY(-160);

        }
        else if (this.keyObject.down.isDown) {
            this.player.setVelocityY(160);
        }
        else {
            this.player.setVelocityY(0);
        }
    }
}
