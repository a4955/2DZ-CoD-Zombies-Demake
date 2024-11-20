import Phaser from 'phaser'
import StateMachine from './StateMachine'

export default class Zombie extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        scene.add.existing(this);
        this.health = 100;
        this.deadDespawnTime = 500;
        this.hitBy = []; // list of bullets this zombie has been hit by, so each only hits once
        this.stateMachine = new StateMachine(null, null, this); //todo: move add states in here
        this.stateMachine.addState("idle", {name: "idle", onEnter: this.idleOnEnter, onUpdate: this.idleOnUpdate});
        this.stateMachine.addState("walking", {name: "walking", onEnter: this.walkingOnEnter, onUpdate: this.walkingOnUpdate});
        this.stateMachine.addState("sprinting", {name: "sprinting", onEnter: this.sprintingOnEnter});
        this.stateMachine.addState("supersprinting", {name: "supersprinting", onEnter: this.supersprintingOnEnter});
        this.stateMachine.addState("attacking", {name: "attacking", onEnter: this.attackingOnEnter});
        this.stateMachine.addState("dying", {name: "dying", onEnter: this.dyingOnEnter});
        this.stateMachine.setState("idle");
    }

    takeDamage(bullet) {
        if (!this.hitBy.includes(bullet)) {
            this.health -= bullet.damage;
            this.hitBy.push(bullet) // TODO: this list could get out of control, figure out how to clean the garbage
        }
    }

    idleOnEnter() {
        this.setTexture("zombieIdle");
    }
    
    idleOnUpdate() {
        this.body.setVelocity(0,0);
    }

    walkingOnEnter() {
        
    }

    walkingOnUpdate() {
        this.scene.physics.moveToObject(this, this.scene.playerContainer, 100);
        // this.body.setVelocity(Phaser.Math.Angle.Between());
    }

    sprintingOnEnter() {

    }

    supersprintingOnEnter() {

    }

    attackingOnEnter() {

    }

    dyingOnEnter() {
        this.setTexture("zombieDying");
        this.body.enable = false;
        // this.scene.physics.world.disable(this);
    }

    update(time, delta) {
        if (this.scene.keys.isDown("ads") && this.stateMachine.currentState.name !== "dying") {
            this.stateMachine.setState("walking")
        }
        if (this.health <= 0) {
            this.stateMachine.setState("dying");
        }
        if (this.stateMachine.currentState.name === "dying") {
            this.deadDespawnTime -= 1;
            if (this.deadDespawnTime <= 0) {
                this.destroy();
            }
        }
        
        this.stateMachine.update(time, delta);
    }
}