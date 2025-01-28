// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 2;
      this.sfxShot = scene.sound.add('sfx-shot')
    }

    update(scene) {
         // particle effect trail
         if (this.isFiring) {
            if (Math.random() < 0.5) {
                const trail = scene.add.particles(0, 0, 'particle', {
                    lifespan: 3000,
                    speed: { min: 100, max: 200 },
                    scale: { start: 1, end: 0 },
                    blendMode: 'COLOR_DODGE',
                    angle: { min: 80, max: 100 },
                    // gravityY: 300
                });
                trail.explode(1, this.x, this.y);
            }
         }
        

        // left/right movement
        if(!this.isFiring || this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring) {
            this.isFiring = true;
            this.sfxShot.play();
        }
        // if fired, move up
        if(this.isFiring && this.y >= 0) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= 0) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
            scene.timer -= 5*60;
        }
    }

    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding;
    }
  }