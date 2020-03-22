import { centerX, centerY } from '../config';
import { FlatButton } from '../components/UI/FlatButton';

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
		const flatBtn = new FlatButton(this, centerX, 128);//.justOnce();
		flatBtn.onClick((sceneName: string) => {
			this.scene.start(sceneName);
		}, 'TestScene');
		flatBtn.setText("PLAY");

	}

	update (): void {
		const enter = this.input.keyboard.addKey('ENTER');
		if (Phaser.Input.Keyboard.JustDown(enter)) {
			this.scene.start('TestScene');
		}
	}

}
