import Phaser from 'phaser'

export default class StateMachine {
    constructor(initialState, possibleStates) {
        this.initialState = initialState;
        this.possibleStates = possibleStates;
        this.currentState = null;
        this.states = new Map();
    }

    addState(name, onEnter = null, onUpdate = null, onExit = null) {
        // var state = new State(name, onEnter, onUpdate, onExit);
        this.states.set(name, onEnter, onUpdate, onExit);
    }

    setState(name) {
        if(!this.states.has(name)) {
            return 1
        }
        
        if(this.currentState.onExit) {
            this.currentState.onExit()
        } 
        
        this.currentState = this.states.get(name);
        
        if(this.currentState.onEnter) {
            this.currentState.onEnter()
        } 

        return 0
    }

    update(time, delta) {
        if(!this.currentState) {
            return 1
        }

        if(this.currentState.onUpdate) {
            this.currentState.onUpdate(time, delta);
        }

        return 0
    }

    // step() {
    //     if(this.state === null) {
    //         this.state = this.initialState
    //         this.possibleStates[this.state].enter(...this.stateArgs)
    //     }
    //     this.possibleStates[this.state].execute(...this.stateArgs)
    // }
}