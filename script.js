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
