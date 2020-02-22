import { PhaserLogo } from '../objects/PhaserLogo';
import { FPSText } from '../objects/FPSText';
import { centerX, centerY } from '../config';

export class TestScene extends Phaser.Scene {

	private _fpsText: Phaser.GameObjects.Text;
	private _phaserLogo: PhaserLogo;

	constructor () {
		super('TestScene');
	}

	init (): void {
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
