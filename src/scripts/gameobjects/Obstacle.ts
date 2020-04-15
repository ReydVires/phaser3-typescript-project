export class Obstacle extends Phaser.Physics.Arcade.Sprite {

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, name: string) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		
		if (!texture || texture === '') {
			this.setVisible(false);
		}
		this.setName(name);
		this.setOrigin(0);
	}
	
}