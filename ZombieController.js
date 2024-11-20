import Phaser from 'phaser'
import StateMachine from './StateMachine'
import Zombie from './Zombie';

export default class ZombieController {
    constructor(scene, zombiesGroup, keys) {
        this.scene = scene;
        this.zombiesGroup = zombiesGroup;
        this.keys = keys;
        var newZombie = new Zombie(scene, 200, 200, 'zombieIdle');
        this.zombiesGroup.add(newZombie);
    }

    update() {
        
    }
}