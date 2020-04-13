import { PhaserLogo } from '../gameobjects/PhaserLogo';
import { BaseScene } from '../components/abstract/BaseScene';
import { centerX, centerY } from '../config';

export class TestScene extends BaseScene {

	private _phaserLogo: PhaserLogo;

	constructor () {
		super('TestScene');
	}

	init (): void {
		super.init();
		console.log(`Create TestScene`);
	}

	create (): void {
		this._phaserLogo = new PhaserLogo(this, centerX, centerY);
	}

	update (): void {
		const space = this.input.keyboard.addKey('SPACE');
		if (Phaser.Input.Keyboard.JustDown(space)) {
			this._phaserLogo.jump();
			this.eventHandler.emit('UI#destroy_fps');
		}
	}

}
