import Phaser from 'phaser'

export default class StateMachine {
    constructor(initialState, possibleStates, context) {
        this.initialState = initialState;
        this.possibleStates = possibleStates;
        this.currentState = null;
        this.states = new Map();
        this.context = context // the object calling state machine, so it can be bound
    }

    addState(name, stateConfig) {
        this.states.set(name, {
            name,
            onEnter: stateConfig?.onEnter?.bind(this.context),
            onUpdate: stateConfig?.onUpdate?.bind(this.context),
            onExit: stateConfig?.onExit?.bind(this.context)
        });
    }

    setState(name) {
        if (!this.states.has(name)) {
            return 1
        }
    
        if (this.currentState) {
            if (this.currentState.name === name) {
                return 0
            }
            if(this.currentState.onExit) {
                this.currentState.onExit();
            }
        }

        this.currentState = this.states.get(name);
        
        if (this.currentState.onEnter) {
            this.currentState.onEnter();
        }

        return 0
    }

    update(time, delta) {
        if (!this.currentState) {
            return 1
        }

        if (this.currentState.onUpdate) {
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