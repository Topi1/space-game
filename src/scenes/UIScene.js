import Phaser from "phaser";
import GameScene from "./Game.js";
import eventsCenter from './EventsCenter.js'


export default class UIScene extends Phaser.Scene
{
    constructor() {
        super("scene-UI")
    }

    preload() {
        const UIconfig = {frameWidth: 47, frameHeight: 16}
        this.load.spritesheet("healthBar", "./UI/hBar.png", UIconfig)
    }

    create() {
        this.healthBar = this.add.sprite(500,20,"healthBar", 8)
        this.healthBar.depth = 5
        this.healthBar.scale = 2

        
        eventsCenter.on('update-hp', this.updateHealth, this)
    }

    updateHealth(hp) {
        
            
            if (hp === 5) {
                this.healthBar.setFrame(8)
            } else if (hp === 4) {
                this.healthBar.setFrame(9)
            } else if (hp === 3) {
                this.healthBar.setFrame(10)
            } else if (hp === 2) {
                this.healthBar.setFrame(11)
            } else if (hp === 1) {
                this.healthBar.setFrame(12)
            } /*else if (hp === 0) {
                this.healthBar.setFrame(13)
            } */
        
    }

    update() {
        
    }
        

}