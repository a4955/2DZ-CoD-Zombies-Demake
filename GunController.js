import Phaser from 'phaser'
import StateMachine from './StateMachine'
import Bullet from './Bullet';

export default class GunController {
    constructor(scene, playerContainer, gun, keys, bulletsGroup) {
        this.scene = scene;
        this.playerContainer = playerContainer;
        this.gun = gun;
        this.keys = keys;
        this.bulletsGroup = bulletsGroup;
        this.freeToShoot = 0;
        this.gunDelay = 150; //TODO
        this.bulletSpeed = 200; //TODO
        this.damage = 13;
        this.pierce = 5;
        this.stateMachine = new StateMachine(null, null, this); //todo: move add states in here
        this.stateMachine.addState("idle", {name: "idle", onEnter: this.idleOnEnter});
        this.stateMachine.addState("shooting", {name: "shooting", onEnter: this.shootingOnEnter, onUpdate: this.shootingOnUpdate, onExit: this.shootingOnExit});
        this.setPosition(10, 11); // TODO: this only applies to the first gun, make a more robust implementation
    }

    idleOnEnter() {
        this.gun.setTexture('gun')
    }
    
    shootingOnEnter() {
        this.gun.setTexture('gunShooting')
    }

    shootingOnUpdate() {

    }

    shootingOnExit() {
        
    }

    hitEntity(bullet) {
        pierce -= 1;
        if (this.pierce < 1) {
            bullet.destroy();
        }
    }

    canShoot(time, delta) {
        if (this.freeToShoot < time) {
            this.freeToShoot = time + this.gunDelay;
            return true;
        }
        return false;
    }

    shootBullet() {
        let rotation = Phaser.Math.DegToRad(this.playerContainer.angle);
        new Bullet(this.scene, this.gun.body.transform.x, this.gun.body.transform.y, 'bullet', rotation, this.bulletSpeed, this.damage, this.pierce);
        // TODO: Figure out where bullet should come from, center or gun
    }

    setPosition(x, y, rotation = null) {
        this.gun.setPosition(x,y);
        if (rotation) {
            this.gun.setRotation(rotation);
        }
    }

    setRotation(rotation) {
        this.gun.setRotation(rotation);
    }

    update(time, delta) {
        if (this.keys.isDown('shoot')) {
            this.stateMachine.setState("shooting");
        }
        else {
            this.stateMachine.setState("idle");
        }
        
        if (this.stateMachine.currentState.name === "shooting" && this.canShoot(time, delta)) {
            this.shootBullet();
        }

        // var i = "";
        // var bulletChildren = this.bulletsGroup.getChildren();
        // for (i in bulletChildren) {
        //     bulletChildren[i].lifetime += 1;
        //     if (bulletChildren[i].lifetime > 500) {
        //         bulletChildren[i].destroy();
        //     }
        // }

        this.stateMachine.update(time, delta);
    }
}
