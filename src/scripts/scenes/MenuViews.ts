import { FlatButton } from '../components/UI/FlatButton';
import { centerX, centerY } from '../config';
import { BaseScene } from '../components/abstract/BaseScene';

export class MenuViews extends BaseScene {

	constructor () {
		super('MenuViews');
	}

	init (data: object): void {
		super.init(data);
		console.log(`MenuViews`);
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
		flatBtn.setCallback((sceneName: string) => {
			this.startToScene(sceneName);
		}, 'TestScene');
		flatBtn.setText("PLAY");
	}

	create (): void {}

	update (): void {}

}
