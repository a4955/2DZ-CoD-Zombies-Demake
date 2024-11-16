import Phaser from 'phaser';
import KeyHandler from '../KeyHandler';
import StateMachine from '../StateMachine';
import PlayerController from '../PlayerController';

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

        this.keys = new KeyHandler(this);
        this.keys.setKeys('shoot', 'lmb')

        this.playerController = new PlayerController(this.player, this.keys);

        this.text = this.add.text(10, 10, '', { fill: '#00ff00' }).setDepth(1);
        this.input.mouse.disableContextMenu();
        this.input.on('pointerdown', function (pointer) {}, this); // TODO: Figure this out
    }

    update() {
        // const pointer = this.input.activePointer;

        // debug text
        // this.text.setText([
        //     `x: ${pointer.worldX}`,
        //     `y: ${pointer.worldY}`,
        //     `lmb: ${pointer.leftButtonDown()}`,
        //     `rmb: ${pointer.rightButtonDown()}`,
        //     `mmb: ${pointer.middleButtonDown()}`
        // ]);
        
        this.playerController.update();

        // if (this.keys.isDown('shoot')) 
        // {
        //     var zombie = this.zombies.create(pointer.worldX, pointer.worldY, 'star');
        // }
        
        // if (this.keys.isDown('left')) {
        //     console.log("a")
        //     this.player.setVelocityX(-160);
        // }
        // else if (this.keys.isDown('right')) {
        //     this.player.setVelocityX(160);

        // }
        // else {
        //     this.player.setVelocityX(0);
        // }
        // if (this.keys.isDown('up')) {
        //     this.player.setVelocityY(-160);

        // }
        // else if (this.keys.isDown('down')) {
        //     this.player.setVelocityY(160);
        // }
        // else {
        //     this.player.setVelocityY(0);
        // }
    }
}
