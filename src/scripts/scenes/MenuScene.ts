export class MenuScene extends Phaser.Scene {

	constructor () {
		super('MenuScene');
	}

	init (): void {
		console.log(`MenuScene`);
	}

	create (): void {
		this.scene.start('GameScene');
	}

	update (): void {}

}
