class Planet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      this.moveSpeed = speed;
    }

    update() {
        this.x -= this.moveSpeed;

       if(this.x <= 0 - this.width) {
            this.x = game.config.width;
       }
    }

    reset() {
      this.x = game.config.width;
    }
}
  