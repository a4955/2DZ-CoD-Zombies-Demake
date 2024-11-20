import Phaser from 'phaser';
import KeyHandler from '../KeyHandler';
import StateMachine from '../StateMachine';
import PlayerController from '../PlayerController';
import GunController from '../GunController';
import Bullet from '../Bullet';
import ZombieController from '../ZombieController';
import Zombie from '../Zombie';

export default class Gameplay extends Phaser.Scene {
    constructor()
    {
        super('Gameplay');
    }
    
    preload() {
        this.load.image('sky', '../assets/sky.png');
        this.load.image('playerIdle', '../assets/playerIdle.png');
        this.load.image('playerWalking', '../assets/playerWalking.png');
        this.load.image('gun', '../assets/gun.png');
        this.load.image('gunShooting', '../assets/gunShooting.png');
        this.load.image('bullet', '../assets/bullet.png');
        this.load.image('zombieIdle', '../assets/zombieIdle.png')
        this.load.image('zombieDying', '../assets/zombieDying.png')
    }
    
    create() {
        this.add.image(400, 300, 'sky');
        this.player = this.physics.add.sprite(0, 0, 'playerIdle');
        this.gun = this.physics.add.sprite(0, 0, 'gun')
        this.playerContainer = this.add.container(100, 200);
        this.playerContainer.width = 20;
        this.playerContainer.height = 20;
        this.playerContainer.add(this.player)
        this.playerContainer.add(this.gun)
        this.physics.world.enable(this.playerContainer); // Give playercontainer width and height
        this.playerContainer.body.setCollideWorldBounds(true);
        this.bulletsGroup = this.physics.add.group({
            classType: Phaser.GameObjects.Sprite,
            maxSize: 100,
            runChildUpdate: true,
        });
        this.zombiesGroup = this.physics.add.group({
            classType: Phaser.GameObjects.Sprite,
            maxSize: 100,
            runChildUpdate: true,
        });

        this.keys = new KeyHandler(this);

        this.gunController = new GunController(this, this.playerContainer, this.gun, this.keys, this.bulletsGroup);
        this.playerController = new PlayerController(this, this.player, this.keys, this.gunController, this.playerContainer);
        this.zombieController = new ZombieController(this, this.zombiesGroup, this.keys);

        this.physics.add.collider(this.zombiesGroup, this.playerContainer);
        this.physics.add.overlap(this.zombiesGroup, this.bulletsGroup, (zombie, bullet) => {zombie.takeDamage(bullet)});
        // body.setCircle(radius, offsetX, offsetY); //TODO


        this.text = this.add.text(10, 10, '', { fill: '#00ff00' }).setDepth(1);
        this.input.mouse.disableContextMenu();
        this.input.on('pointerdown', function (pointer) {}, this); // TODO: Figure out what this does
    }

    update(time, delta) {
        this.playerController.update(time, delta);
        this.gunController.update(time, delta);
        this.zombieController.update(time, delta)
        // console.log(this.game.loop.actualFps)
    }
}
