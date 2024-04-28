import Phaser from "phaser";

import WebFontFile from "./WebFontFile.js";

//import GameScene from "./Game";


export default class TitleScreen extends Phaser.Scene
{
    constructor() {
        super("scene-title")
    }
    preload() {
        //const fonts = new WebFontFile(this.load, 'Bruno Ace SC')
        //this.load.addFile(fonts)
        this.load.addFile(new WebFontFile(this.load, [
            'Bruno Ace SC',
            'Potta One',
            'VT323'
        ]))
        this.load.image("titleBG", "./assets/titleBG.png")
        this.load.image("starBG", "./assets/starBG.png")
        this.load.image("star", "./assets/star2.png")
        this.load.image("star2", "./assets/star3.png")
        this.load.audio("menuMusic", ["./assets/menuSong.mp3"])
    }

    create() {

        this.titleBackground = this.add.tileSprite(0,0,0,0, "titleBG").setOrigin(0,0)
        this.titleBackground.depth = 0

        this.starBackground = this.add.tileSprite(0,0,0,0, "starBG").setOrigin(0,0)
        this.starBackground.depth = 0

        this.menuMusic = this.sound.add("menuMusic")
        var musicConfig = {
            mute: 0,
            volume: 0.6,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.menuMusic.play(musicConfig)

        this.title = this.add.text(300,250, "SPACE MAYHEM:", {
            fontSize: 35,
            fontFamily: '"Bruno Ace SC"',
            textDecoration: "overline",
            fill: "#ffa126"
            
        })
        this.title.setOrigin(0.5, 0.5)

        this.title.depth = 2

        this.smallTitle = this.add.text(290,280, "Fermi Paradox", {
            fontSize: 30,
            fontFamily: '"VT323"',
            fill: "#ffa126"
            
        })

        this.smallTitle.depth = 2

        this.startText = this.add.text(300,500, "PRESS SPACE TO START", {
            fontSize: 22,
            fontFamily: '"VT323"',
            fill: "#ffa126"
        })
        this.startText.setOrigin(0.5,0.5)

        /*this.scrollText = new ScrollText({
            'scene': this,
            'text': this.startText,
            'speed': 10,
            //'style': style,
            'y':200
        })*/
        //this.scrollText.getText().setStroke('#2980b9', 6)

        this.star = this.add.sprite(175,250,"star")
        this.star.depth=1

        this.star2 = this.add.sprite(175,250,"star2")
        this.star2.depth = 0


        

        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.start("scene-game")
            this.menuMusic.stop()
        })
    }

    update() {
        this.star.angle += 0.15
        //this.star2.angle += 0.1
        this.starBackground.tilePositionX += 0.4
        this.starBackground.tilePositionY -= 0.3


        /*if (this.title.scaleX <= 1.1) {

            this.title.scaleX += 0.005

        } else if (this.title.scaleX >= 1.1) {
        
                this.title.scaleX =- 1
        }

        if (this.smallTitle.scaleX <= 1.1) {

            this.smallTitle.scaleX += 0.005

        } else if (this.smallTitle.scaleX >= 1.1) {
            
                this.smallTitle.scaleX =- 1
        } */
            
        
    }
}