import Phaser from 'phaser';

const defaultControls = {
    'up' : "W",
    'down' : "S",
    'left' : "A",
    'right' : "D",
    'shoot' : "lmb"
}

const pointer = this.input.activePointer;

export default class KeyHandler {
    constructor(scene, customControls = null) {
        this.scene = scene;
        if (customControls) {
            this.controls = customControls
        }
        else {
            this.controls = defaultControls;
        }

        this.keyObjects = this.scene.input.keyboard.addKeys(this.controls);
    }

    getKeys() {
        return this.keyObjects;
    }

    // removeKey(input) {
    //     this.keyObjects[input] = null;
    // } TODO: 

    setKeys(input, key) {
        this.controls[input] = key
        this.keyObjects = this.scene.input.keyboard.addKeys(this.controls)
    }
    
    
}