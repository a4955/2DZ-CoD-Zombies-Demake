import Phaser from 'phaser';
import config from './config';
import MainMenu from './scenes/MainMenu';
import Gameplay from './scenes/Gameplay';
import PauseMenu from './scenes/PauseMenu';


class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add('MainMenu', MainMenu);
        this.scene.add('Gameplay', Gameplay);
        this.scene.add('PauseMenu', PauseMenu);

        this.scene.start('MainMenu');
    }
}


function startGame() {
    window.game = new Game();
}

window.onload = startGame();


// old
// var game = new Phaser.Game(config);
// var player;

// let inputUp;
// let inputDown;
// let inputLeft;
// let inputRight;

// test for custom controls
// function updateControls (
//     newUp = Phaser.Input.Keyboard.KeyCodes.W, 
//     newDown = Phaser.Input.Keyboard.KeyCodes.S, 
//     newLeft = Phaser.Input.Keyboard.KeyCodes.A, 
//     newRight = Phaser.Input.Keyboard.KeyCodes.D
// )
// {
//     inputLeft = this.input.keyboard.addKey(newLeft);
//     inputDown = this.input.keyboard.addKey(newDown);
//     inputRight = this.input.keyboard.addKey(newRight);
//     inputUp = this.input.keyboard.addKey(newUp);
//}