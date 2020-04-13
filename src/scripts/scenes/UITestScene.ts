import { UIScene } from "../components/abstract/UIScene";
import { FPSText } from "../gameobjects/FPSText";
import { ToggleButton } from "../components/UI/ToggleButton";
import { TapButton } from "../components/UI/TapButton";
import { Button } from "../components/UI/Button";
import { HoldButton } from "../components/UI/HoldButton";

export class UITestScene extends UIScene {

	private _fpsText: FPSText;

	constructor () {
		super('UITestScene');
	}

	init (): void {
		super.init();
		console.log("Create UITestScene!");
	}

	create (): void {
		this._fpsText = new FPSText(this);
		new ToggleButton(this, 180, 256, { active: 'phaser-logo', deactive: 'phaser_logo' });
		new TapButton(this, 335, 256, 'phaser_logo');
		new Button(this, 180, 400, 'phaser-logo', 'phaser_logo')
			.setCallback(() => this.eventHandler.emit('UI#destroy_fps'));
		new HoldButton(this, 360, 640, 'phaser-logo');

		this.registerEvent('destroy_fps', () => this._fpsText.destroy(), true);
	}

	update (): void {
		if (this._fpsText.active) {
			this._fpsText?.update();
		}
	}

}