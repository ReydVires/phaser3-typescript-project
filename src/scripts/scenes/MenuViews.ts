import { centerX, centerY } from '../config';
import { BaseScene } from '../components/abstract/BaseScene';
import { GraphicsButton } from '../components/UI/GraphicsButton';

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

		const playButton = new GraphicsButton(this, centerX, centerY * 1.25, 'PLAY');
		playButton.onClick(() => {
			this.scene.start('TestScene');
		});
	}

	create (): void {}

	update (): void {}

}
