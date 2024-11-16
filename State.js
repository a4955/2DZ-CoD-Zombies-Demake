import Phaser from 'phaser'

export default class State {
    constructor(name, onEnter = null, onUpdate = null, onExit = null) {
        this.name = name;
        this.onEnter = onEnter;
        this.onUpdate = onUpdate;
        this.onExit = onExit;
    }

    enter() {

    }

    update() {

    }

    exit() {

    }
}