import Phaser from 'phaser';
import GameScene from './scenes/Game.js'
import TitleScreen from './scenes/TitleScreen.js'
import UIScene from './scenes/UIScene.js'
import GameOver from './scenes/GameOver.js';


const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 700,
    parent: 'game-container',
    backgroundColor: "#1f1201#140c01",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          //debug: true
        }
      },
    scene: [
        
        TitleScreen,
        GameScene,
        UIScene,
        GameOver
        
    ]
};

export default new Phaser.Game(config);
