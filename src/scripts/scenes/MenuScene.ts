import { FlatButton } from '../components/UI/FlatButton';
import { centerX, centerY } from '../config';

export class MenuScene extends Phaser.Scene {

	constructor () {
		super('MenuScene');
	}

	init (): void {
		console.log(`MenuScene`);
		const titleText = `Welcome to\nPhaser v${Phaser.VERSION}`;
		this.add
			.text(centerX, centerY * 0.8, titleText, {
				color: '#000000',
				fontSize: '32px',
				fontStyle: 'bold'
			})
			.setAlign('center')
			.setOrigin(0.5);
			
		const flatBtn = new FlatButton(this, centerX, centerY * 1.25);
		flatBtn.onClick((sceneName: string) => {
			this.scene.start(sceneName);
		}, 'TestScene');
		flatBtn.setText("PLAY");
	}

	create (): void {}

	update (): void {}

}
