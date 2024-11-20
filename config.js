import Phaser from 'phaser';

export default {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    // fps: {
    //     target: 165,
    //     min: 30,
    //     forceSetTimeOut: true,
    // } // TODO: make a framerate option
};
