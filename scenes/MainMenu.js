import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        // this.input.keyboard.once ()
        // {
        this.scene.start('Gameplay')
        // }

    }
}
