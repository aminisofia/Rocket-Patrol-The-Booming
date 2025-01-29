class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      this.points = pointValue;
      this.moveSpeed = game.settings.spaceshipSpeed;
      this.scene = scene;
    }

    update() {
       this.x -= this.moveSpeed;

       if(this.x <= 0 - this.width) {
            this.x = this.scene.sys.game.canvas.width;
       }
    }

    reset() {
      this.x = this.scene.sys.game.canvas.width;
    }
}
  