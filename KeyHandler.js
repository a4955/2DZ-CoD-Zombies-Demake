import Phaser from 'phaser';

const defaultControls = {
    'up' : "W",
    'down' : "S",
    'left' : "A",
    'right' : "D",
    'shoot' : "lmb"
}

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
        
        this.pointer = scene.input.activePointer;
    }

    getKeys() {
        return this.keyObjects;
    }

    isDown(input) {
        switch (this.controls[input]) { 
            case 'lmb':
                return this.pointer.leftButtonDown()
            case 'rmb':
                return this.pointer.rightButtonDown()
            case 'mmb':
                return this.pointer.middleButtonDown()
            default: 
                return this.keyObjects[input].isDown
            }
        
    }

    // removeKey(input) {
    //     this.keyObjects[input] = null;
    // } TODO: 

    setKeys(input, key) {
        this.controls[input] = key
        this.keyObjects = this.scene.input.keyboard.addKeys(this.controls)
    }
    
    
}