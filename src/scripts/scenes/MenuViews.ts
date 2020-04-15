import { FlatButton } from '../components/UI/FlatButton';
import { centerX, centerY } from '../config';
import { BaseScene } from '../components/abstract/BaseScene';

export class MenuViews extends BaseScene {

	constructor () {
		super('MenuViews');
	}

	init (): void {
		console.log(`MenuViews`);
		const titleText = `Wacana The Game`;
		this.add
			.text(centerX, centerY * 0.8, titleText, {
				color: '#000000',
				fontSize: '32px',
				fontStyle: 'bold'
			})
			.setAlign('center')
			.setOrigin(0.5);
			
		const playBtn = new FlatButton(this, centerX, centerY * 1.25, 72, 48);
		playBtn.onClick((sceneName: string) => {
			this.scene.start(sceneName);
		}, 'TestScene');
		playBtn.setText("PLAY", { fontSize: '20px' });
	}

	create (): void {}

	update (): void {}

}
