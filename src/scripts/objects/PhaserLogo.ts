export class PhaserLogo extends Phaser.Physics.Arcade.Sprite {

	constructor (scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, 'phaser-logo');
		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.setCollideWorldBounds(true)
			.setBounce(0.6)
			.setInteractive()
			.on('pointerdown', () => {
				this.jump();
			});
	}

	public jump (): void {
		this.setVelocityY(-400);
	}

}
