import Phaser from 'phaser'
import UIScene from './UIScene.js'
import eventsCenter from './EventsCenter.js'

const sizes = {
  width: 600,
  height: 700
};

const speedDown = 260

let enemies
let enemyCount = 0
let bossSpawnCounter = 0
let timer
let enemyFireTimer

export default class GameScene extends Phaser.Scene {

  constructor() {
    super("scene-game")
    this.enemy = null; // Lisätty enemy-muuttuja luokan tasolle ja alustettu se null-arvolla
    this.player
    this.cursor
    this.playerSpeed = speedDown + 50
    this.laserGroup
    this.enemyLasers
  }

  preload() {
    this.load.image("bg", "./assets/level1Stars.png")
    this.load.image("colorBG", "./assets/levelBG.png")
    this.load.image("player", "./assets/player.png")
    this.load.image("laser", "./assets/bullet.png")
    this.load.image("enemyLaser", "./assets/enemyLaser.png")
    this.load.image("fighterEnemy", "./assets/baseEnemy.png")
    
    this.load.audio("level1Song", ["./assets/level1Song.mp3"])
    this.load.audio("laserSound", ["./assets/laser.mp3"])
    this.load.audio("enemyDeath", ["./assets/enemyDeath.mp3"])
    this.load.audio("playerDeath", ["./assets/playerDeath.mp3"])
  }

  create() {
    this.physics.world.setBounds(0, 0, 600, 700)
    this.scene.launch("scene-UI")

    this.backGround = this.add.tileSprite(0, 0, 0, 0, "bg").setOrigin(0, 0);
    this.backGround.depth = 0;
    this.colorBackground = this.add.tileSprite(0, 0, 0, 0, "colorBG").setOrigin(0, 0);

    this.laserSound = this.sound.add("laserSound");
    this.laserSoundConfig = {
      mute: 0,
      volume: 0.2,
      seek: 0,
      loop: false,
      delay: 0
    };

    this.enemyDeath = this.sound.add("enemyDeath");
    this.enemyDeathConfig = {
      mute: 0,
      volume: 0.4,
      seek: 0,
      loop: false,
      delay: 0
    };

    this.playerDeath = this.sound.add("playerDeath");
    this.playerDeathConfig = {
      mute: 0,
      volume: 0.7,
      seek: 0,
      loop: false,
      delay: 0
    };


    this.levelMusic = this.sound.add("level1Song");
    var musicConfig = {
      mute: 0,
      volume: 0.6,
      seek: 0,
      loop: true,
      delay: 2
    };
    this.levelMusic.play(musicConfig);

    this.player = this.physics.add.sprite(300, 500, "player");
    this.player.setScale(1);
    this.player.setSize(25, 20)
    this.player.body.allowGravity = false;
    this.player.setCollideWorldBounds(true);
    this.player.health = 5;
    this.hp = 5;

    

    this.collWall = this.add.rectangle(300, 300, sizes.width, 10);
    this.physics.add.existing(this.collWall, true);
    this.collWall.allowGravity = false;

    this.leftWall = this.add.rectangle(10, 300, 10, sizes.height + 300);
    this.physics.add.existing(this.leftWall, true);

    this.rightWall = this.add.rectangle(590, 300, 10, sizes.height + 300);
    this.physics.add.existing(this.rightWall, true);

    this.physics.add.collider(this.player, this.collWall);

    this.laserGroup = new LaserGroup(this);
    this.laserGroup.depth = 1;

    this.enemyLasers = this.physics.add.group();

    this.cursor = this.input.keyboard.createCursorKeys();
    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    ];

    enemies = this.physics.add.group({ collideWorldBounds: false });
    this.physics.add.collider(this.laserGroup, enemies, this.onShotEnemyCollide, null, this);
    this.physics.add.collider(enemies);

    // Lisätään törmäyksen käsittelijä pelaajan ja vihollisammusten välille
    this.physics.add.overlap(this.player, this.enemyLasers, this.onPlayerHit, null, this);


    // Luodaan toistuva ajastin vihollisten ampumiseksi jatkuvasti
    timer = this.time.addEvent({
      delay: Phaser.Math.Between(900, 1700),
      callback: () => this.spawnEnemy(),
      loop: true
    });

    // Ajastin vihollisten ampumiselle
    enemyFireTimer = this.time.addEvent({
      delay: 2000, // Lisätään viive ampumiseen
      callback: () => this.enemyFire(),
      loop: true
    });
  }

  spawnEnemy() {
    if (enemyCount <= 9) {
      enemyCount = enemyCount + 1
      console.log("SPAWN");
      console.log("ENEMY COUNTS IS: " + enemyCount)

      const bounds = this.physics.world.bounds
      const posX = Phaser.Math.Between(bounds.x + 50, bounds.x + bounds.width - 50)
      const posY = Phaser.Math.Between(bounds.y, bounds.y + bounds.height * 0.5)

      
    
      const speed = 100

      

      this.enemy = this.physics.add.sprite(posX, bounds.y - 35, "fighterEnemy")
      this.enemy.angle = 180;
      this.enemy.scale = 1;
      this.enemy.setSize(20, 20)
      this.enemy.health = 3;
      
      this.enemy.setPushable(false);
      this.physics.add.collider(this.player, this.enemy);
      this.physics.add.collider(this.collWall, this.enemy);

     

      enemies.add(this.enemy);

      const velocityX = Phaser.Math.Between(-200,200);
      const velocityY = Phaser.Math.Between(1, 10);

      const tween = this.tweens.add({
        targets: this.enemy,
        x: posX + velocityX,
        y: posY + velocityY,
        duration: 3000,
        ease: "Sine.easeInOut",
        repeat: -1,
        yoyo: true
      });
      this.enemy.tween = tween;

      this.enemy.setCollideWorldBounds(true)

      // Viholliset ampuvat jatkuvasti
      this.enemyShoot(this.enemy);
    }
  }

  onShotEnemyCollide(laserGroup, enemy) {
    laserGroup.destroy();
    enemy.health = enemy.health - 1;
    

    if (enemy.health <= 0) {
      enemy.destroy();
      this.enemyDeath.play(this.enemyDeathConfig);
      
      enemyCount = enemyCount - 1
      bossSpawnCounter = bossSpawnCounter + 1;
    }
  }


  shakeCamera(duration, intensity) {
    this.cameras.main.shake(duration, intensity)
  }

  onPlayerHit(player, enemyLaser) {
    this.hp -= 1;
    eventsCenter.emit('update-hp', this.hp);

    enemyLaser.destroy();
    this.shakeCamera(50, 0.01)
  }

  update() {

    if(this.hp <= 0){
      enemyCount = 0
      this.playerDeath.play(this.playerDeathConfig);
      this.scene.start("scene-gameover")
      this.levelMusic.stop();
    }

    this.backGround.tilePositionY -= 0.9;
    const { left, right, up, down } = this.cursor;

    if (left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
    } else if (right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    } else {
      this.player.setVelocityX(0);
    }

    if (up.isDown) {
      this.player.setVelocityY(-this.playerSpeed);
    } else if (down.isDown) {
      this.player.setVelocityY(this.playerSpeed);
    } else {
      this.player.setVelocityY(0);
    }

    this.inputKeys.forEach(key => {
      if (Phaser.Input.Keyboard.JustDown(key)) {
        this.shootLaser();
        this.laserSound.play(this.laserSoundConfig);
      }
    });
  }

  shootLaser() {
    this.laserGroup.fireLaser(this.player.x, this.player.y - 20);
  }

  enemyShoot(enemy) {
    const enemyLaser = this.enemyLasers.create(enemy.x, enemy.y, "enemyLaser");
    enemyLaser.setVelocityY(300);
  }

  enemyFire() {
    enemies.getChildren().forEach((enemy, index) => {
      const fireDelay = Phaser.Math.Between(1000, 4000)
      this.time.delayedCall(fireDelay, () => {
        this.enemyShoot(enemy);
      });
    });
  }
}

class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.createMultiple({
      classType: Laser,
      frameQuantity: 300,
      active: false,
      visible: false,
      key: 'laser'
    })
  }

  fireLaser(x, y) {
    const laser = this.getFirstDead(false);
    if (laser) {
      laser.fire(x, y);
    }
  }
}

class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'laser');
  }

  fire(x, y) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityY(-700);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.y <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
