import Phaser from 'phaser';

export default class Gameplay extends Phaser.Scene
{   
    constructor ()
    {
        super('Gameplay'); // what am I doing here? i dont get super still
    }
    
    preload ()
    {
        this.load.image('sky', '../assets/sky.png');
        this.load.image('star', '../assets/star.png');
    }
    
    create ()
    {

        this.add.image(400, 300, 'sky');
        this.player = this.physics.add.sprite(100, 450, 'star');
        this.player.setCollideWorldBounds(true);
        
        this.inputLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.inputDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.inputRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.inputUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        
        this.text = this.add.text(10, 10, '', { fill: '#00ff00' }).setDepth(1);
        this.input.mouse.disableContextMenu();
        this.input.on('pointerdown', function (pointer) {}, this);
    }

    update ()
    {
        
        const pointer = this.input.activePointer;

        // debug text
        this.text.setText([
            `x: ${pointer.worldX}`,
            `y: ${pointer.worldY}`,
            `lmb: ${pointer.leftButtonDown()}`,
            `rmb: ${pointer.rightButtonDown()}`,
            `mmb: ${pointer.middleButtonDown()}`
        ]);
        
        if (this.inputLeft.isDown)
        {
            this.player.setVelocityX(-160);

        }
        else if (this.inputRight.isDown)
        {
            this.player.setVelocityX(160);

        }
        else 
        {
            this.player.setVelocityX(0);
        }
        if (this.inputUp.isDown)
        {
            this.player.setVelocityY(-160);

        }
        else if (this.inputDown.isDown)
        {
            this.player.setVelocityY(160);
        }
        else 
        {
            this.player.setVelocityY(0);
        }
    }
}
