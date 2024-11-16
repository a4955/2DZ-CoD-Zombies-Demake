import Phaser from 'phaser'
import StateMachine from './StateMachine'

export default class PlayerController {
    constructor(player, keys) {
        this.player = player;
        this.keys = keys;
        this.stateMachine = new StateMachine(null, null, this);
        this.stateMachine.addState("idle", {name: "idle", onEnter: this.idleOnEnter});
        this.stateMachine.addState("walking", {name: "walking", onUpdate: this.walkingOnUpdate});
        this.stateMachine.setState("idle");
    }

    idleOnEnter() {
        this.player.setVelocityX(0);
    }

    walkingOnUpdate() {
        if (this.keys.isDown('left')) {
            this.player.setVelocityX(-160);
        }
        else if (this.keys.isDown('right')) {
            this.player.setVelocityX(160);
        }
        else {
            this.player.setVelocityX(0);
        }
        if (this.keys.isDown('up')) {
            this.player.setVelocityY(-160);
        }
        else if (this.keys.isDown('down')) {
            this.player.setVelocityY(160);
        }
        else {
            this.player.setVelocityY(0);
        }
    }

    update(time, delta) {
        if (
            this.keys.isDown('left') ||
            this.keys.isDown('right') ||
            this.keys.isDown('down') ||
            this.keys.isDown('up')
        ) {
            this.stateMachine.setState("walking");
        }
        else {
            this.stateMachine.setState("idle");
        }

        this.stateMachine.update(time, delta);
    }
}
