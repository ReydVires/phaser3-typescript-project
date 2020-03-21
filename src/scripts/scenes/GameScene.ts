import { centerX, centerY } from '../config';
import { FlatButton } from '../components/FlatButton';

export class GameScene extends Phaser.Scene {

	constructor () {
		super('GameScene');
	}

	init (): void {
		console.log(`GameScene`);
		const titleText = `Welcome to\nPhaser v${Phaser.VERSION}`;
		this.add
			.text(centerX, centerY, titleText, {
				color: '#000000',
				fontSize: '32px',
				fontStyle: 'bold'
			})
			.setAlign('center')
			.setOrigin(0.5);
	}

	create (): void {
		let testCount = 0;
		const flatBtn = new FlatButton(this, centerX, 128)
			.setJustOnce();
		flatBtn.onClick(() => {
			flatBtn.setText("MORE:" + ++testCount);
		});
		flatBtn.setText("MORE");

	}

	update (): void {
		const enter = this.input.keyboard.addKey('ENTER');
		if (Phaser.Input.Keyboard.JustDown(enter)) {
			this.scene.start('TestScene');
		}
	}

}
