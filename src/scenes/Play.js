class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {

        this.starfield = this.add.tileSprite(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, 'starfield').setOrigin(0, 0);

        // white UI background
        // this.add.rectangle(0, borderUISize + borderPadding, this.sys.game.canvas.width, borderUISize * 2, 0xFFFFFF).setOrigin(0, 0);
        // pink borders
        // this.add.rectangle(0, 0, this.sys.game.canvas.width, borderUISize, 0xffdaf4).setOrigin(0, 0)
        this.add.rectangle(0, this.sys.game.canvas.height - borderUISize, this.sys.game.canvas.width, borderUISize, 0xffdaf4).setOrigin(0, 0);
        // this.add.rectangle(0, 0, borderUISize, this.sys.game.canvas.height, 0xffdaf4).setOrigin(0, 0);
        // this.add.rectangle(this.sys.game.canvas.width - borderUISize, 0, borderUISize, this.sys.game.canvas.height, 0xffdaf4).setOrigin(0, 0);
        

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, this.sys.game.canvas.width/2, this.sys.game.canvas.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, this.sys.game.canvas.width + borderUISize*6, 60, 'spaceship', 0, 20).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, this.sys.game.canvas.width + borderUISize*3, 120, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, this.sys.game.canvas.width, 180, 'spaceship', 0, 20).setOrigin(0,0)
        // add miniSpaceship
        this.ship04 = new miniSpaceship(this, this.sys.game.canvas.width + borderUISize*11, 240, 'miniSpaceship', 0, 40).setOrigin(0, 0)
        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ffdaf4',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding - 30, borderUISize + borderPadding*2 - 40, this.p1Score, scoreConfig)

        // GAME OVER flag
        this.gameOver = false;
        
        this.timer = 60*60;
        this.timeLeft = this.add.text(borderUISize + borderPadding + 80, borderUISize + borderPadding*2 - 40, "-", scoreConfig)
        
        scoreConfig.fixedWidth = 0
        

    }
    update() {
        if (this.timer > 0) {
            this.timer--;
        }
        this.timeLeft.text = Math.floor(this.timer/60);
        if (this.timer == 0) {
            this.add.text(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'GAME OVER').setOrigin(0.5)
            this.add.text(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2 + 64, 'Press (R) to Restart or ← for Menu').setOrigin(0.5)
            this.gameOver = true;
        }
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }
        this.starfield.tilePositionX -= 15;

        this.p1Rocket.update(this);

        this.ship01.update();               // update spaceships (x3)
        this.ship02.update();
        this.ship03.update();
        this.ship04.update();

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
   
        if(!this.gameOver) {               
            this.p1Rocket.update(this)         // update rocket sprite
            this.ship01.update()              // update spaceships (x3)
            this.ship02.update()
            this.ship03.update()
            this.ship04.update();
        } 
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0

        // particle effect explode
        const emitter = this.add.particles(0, 0, 'particle', {
            lifespan: 3000,
            speed: { min: 100, max: 200 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        emitter.explode(50, ship.x, ship.y);
        
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })   
        this.timer += 5*60;
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;    
        this.sound.play('sfx-explosion')
    }
}