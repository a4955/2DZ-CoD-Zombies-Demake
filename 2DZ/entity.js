import Phaser from 'phaser'

export default class Zombie extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

    }

    create() {

    }

    update() {
        this.x += 1
    }

}