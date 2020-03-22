import { PhaserLogo } from '../objects/PhaserLogo';
import { FPSText } from '../objects/FPSText';
import { BaseScene } from '../components/abstract/BaseScene';
import { centerX, centerY } from '../config';

export class TestScene extends BaseScene {

	private _phaserLogo: PhaserLogo;
	private _fpsText: Phaser.GameObjects.Text;

	constructor () {
		super('TestScene');
	}

	init (): void {
		super.init();
		console.log(`TestScene: For experimental only!`);
	}

	create (): void {
		this._phaserLogo = new PhaserLogo(this, centerX, centerY);
		this._fpsText = new FPSText(this);
	}

	update (): void {
		this._fpsText.update();
		const space = this.input.keyboard.addKey('SPACE');
		if (Phaser.Input.Keyboard.JustDown(space)) {
			this._phaserLogo.jump();
		}
	}

}
