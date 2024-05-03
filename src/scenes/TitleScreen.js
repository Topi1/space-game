import Phaser from "phaser";

import WebFontFile from "./WebFontFile.js";




export default class TitleScreen extends Phaser.Scene
{
    constructor() {
        super("scene-title")
    }
    preload() {
        this.load.addFile(new WebFontFile(this.load, [
            'Bruno Ace SC',
            'Potta One',
            'VT323'
        ]))
        this.load.image("titleBG", "./assets/titleBG.png")
        this.load.image("starBG", "./assets/starBG.png")
        this.load.image("star", "./assets/star2.png")
        this.load.image("star2", "./assets/star3.png")
        this.load.image("spaceBar", "./assets/spaceBar.png")
        this.load.image("arrowKeys", "./assets/arrowKeys.png")
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

        this.title = this.add.text(300,200, "SPACE MAYHEM:", {
            fontSize: 35,
            fontFamily: '"Bruno Ace SC"',
            textDecoration: "overline",
            fill: "#ffa126"
            
        })
        this.title.setOrigin(0.5, 0.5)

        this.title.depth = 2

        this.smallTitle = this.add.text(310,230, "Survivor", {
            fontSize: 30,
            fontFamily: '"VT323"',
            fill: "#ffa126"
            
        })
        this.smallTitle.depth = 2

        this.instruction = this.add.text(300,370, "HOW TO PLAY:", {
            fontSize: 22,
            fontFamily: '"VT323"',
            fill: "#ffa126"
            
        }).setOrigin(0.5,0.5)

        this.shootInstruc = this.add.text(200,500, "to shoot", {
            fontSize: 22,
            fontFamily: '"VT323"',
            fill: "#ffa126"
            
        }).setOrigin(0.5,0.5)
        this.moveInstruc = this.add.text(400,500, "to move", {
            fontSize: 22,
            fontFamily: '"VT323"',
            fill: "#ffa126"
            
        }).setOrigin(0.5,0.5)

        

        this.startText = this.add.text(300,600, "PRESS SPACE TO START PLAYING", {
            fontSize: 22,
            fontFamily: '"VT323"',
            fill: "#ffa126"
        })
        this.startText.setOrigin(0.5,0.5)

        this.star = this.add.sprite(175,200,"star")
        this.star.depth=1

        this.star2 = this.add.sprite(175,200,"star2")
        this.star2.depth = 0

        this.spaceBar = this.add.sprite(200, 450, "spaceBar").setOrigin(0.5,0.5)
        this.spaceBar.depth = 3
        this.spaceBar.scale = 0.4
        
        this.arrowKeys = this.add.sprite(400, 450, "arrowKeys").setOrigin(0.5,0.5)
        this.arrowKeys.depth = 3
        this.arrowKeys.scale = 0.4

        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.start("scene-game")
            this.menuMusic.stop()
        })
    }

    update() {
        this.star.angle += 0.15
        this.starBackground.tilePositionX += 0.4
        this.starBackground.tilePositionY -= 0.3
        
    }
}