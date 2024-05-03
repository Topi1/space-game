import Phaser from "phaser";

import WebFontFile from "./WebFontFile.js";




export default class GameOver extends Phaser.Scene
{
    constructor() {
        super("scene-gameover")
    }
    preload() {
        this.load.addFile(new WebFontFile(this.load, [
            'Bruno Ace SC',
            'Potta One',
            'VT323'
        ]))
     
    }

    create() {

        this.gameOverText = this.add.text(300,300, "GAME OVER", {
            fontSize: 55,
            fontFamily: '"VT323"',
            fill: "#1c8035"
        }).setOrigin(0.5,0.5)

        this.startAgainText = this.add.text(300,500, "PRESS SPACE TO TRY AGAIN", {
            fontSize: 22,
            fontFamily: '"VT323"',
            fill: "#1c8035"
        })
        this.startAgainText.setOrigin(0.5,0.5)


        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.start("scene-game")
            //this.menuMusic.stop()
        })
    }

    update() {

    }
}