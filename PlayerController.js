import Phaser from 'phaser'
import StateMachine from './StateMachine'

export default class PlayerController {
    constructor(scene, player, keys, gunController, playerContainer) {
        this.scene = scene;
        this.player = player;
        this.keys = keys;
        this.gunController = gunController;
        this.playerContainer = playerContainer;

        this.stateMachine = new StateMachine(null, null, this); //todo: move add states in here

        this.stateMachine.addState("idle", {name: "idle", onEnter: this.idleOnEnter});
        this.stateMachine.addState("walking", {name: "walking", onEnter: this.walkingOnEnter, onUpdate: this.walkingOnUpdate});
        this.stateMachine.setState("idle");
    }

    idleOnEnter() {
        this.player.setTexture('playerIdle');
        this.playerContainer.body.setVelocity(0, 0);
    }

    walkingOnEnter() {
        this.player.setTexture('playerWalking')
    }

    walkingOnUpdate() {
        let x = 0;
        let y = 0;
        if (this.keys.isDown('left')) {
            x += -160
        }
        if (this.keys.isDown('right')) {
            x += 160
        }
        if (this.keys.isDown('up')) {
            y += -160
        }
        if (this.keys.isDown('down')) {
            y += 160
        }
        this.playerContainer.body.setVelocity(x, y);
    }

    update(time, delta) {
        let left = this.keys.isDown('left');
        let right = this.keys.isDown('right');
        let down = this.keys.isDown('down');
        let up = this.keys.isDown('up');
        if (left != right || down != up) { // In this case, != acts as XOR
            this.stateMachine.setState("walking");
        } 
        else {
            this.stateMachine.setState("idle");
        }

        let rad = Phaser.Math.Angle.Between(this.playerContainer.x, this.playerContainer.y, this.keys.getPointerX(), this.keys.getPointerY());
        this.playerContainer.setRotation(rad);
        
        this.stateMachine.update(time, delta);
    }
}
