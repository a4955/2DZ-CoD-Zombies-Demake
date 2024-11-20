import Phaser from 'phaser'

export default class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, key, rotation, speed, damage, pierce, width, height) {
        super(scene, x, y, key)
        scene.add.existing(this);
        this.scene = scene;
        this.rotation = rotation;
        this.speed = speed;
        this.damage = damage;
        this.pierce = pierce;
        this.lifetime = 0;
        // this.width = width;
        // this.height = height;
        this.angle = scene.playerContainer.angle;
        scene.bulletsGroup.add(this)
        this.body.setVelocity(Math.cos(rotation) * this.speed, Math.sin(rotation) * this.speed);
    }

    update() {
        this.lifetime += 1;
        if (this.lifetime > 500) {
            this.destroy();
        }
    }
}