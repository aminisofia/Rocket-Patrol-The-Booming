class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('miniSpaceship', './assets/miniSpaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('particle', './assets/particle.png');
        this.load.image('title', './assets/title.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
      }

    create() {

      const canvas = document.querySelector('canvas');
      const context = canvas.getContext('2d');
      window.addEventListener('resize', resizeCanvas, false);

      const scene = this;

      function resizeCanvas() {        

        const scaleW = window.innerWidth / scene.sys.game.config.width;
        const scaleH = window.innerHeight / scene.sys.game.config.height;

        canvas.style.scale = Math.min(scaleW, scaleH);
      }
      
      resizeCanvas();

      // place tile sprite
      // animation configuration
      this.anims.create({
          key: 'explode',
          frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
          frameRate: 30
      })
      let menuConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#fbe4b4',
          color: '#843605',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0
      }
      // title image
      this.starfield = this.add.tileSprite(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, 'starfield').setOrigin(0, 0);
      this.add.image(this.sys.game.canvas.width/2,this.sys.game.canvas.height/2,'title').setOrigin(0.5,0.5);
      
      // this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Rocket Patrol!', menuConfig).setOrigin(0.5)
      // this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
      // menuConfig.backgroundColor = '#f8d2ff';
      // menuConfig.color = '#000';
      // this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
  
      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }
    update() {
      this.starfield.tilePositionX -= 15;
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // easy mode
        game.settings = {
          spaceshipSpeed: 3,
          miniSpaceshipSpeed: 10,
          gameTimer: 60000    
        }
        this.sound.play('sfx-select')
        this.scene.start('playScene')    
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // hard mode
        game.settings = {
          spaceshipSpeed: 4,
          miniSpaceshipSpeed: 11,
          gameTimer: 45000    
        }
        this.sound.play('sfx-select')
        this.scene.start('playScene')    
      }
    }
}