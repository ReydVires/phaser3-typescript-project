import { UIScene } from "../components/abstract/UIScene";
import { FPSText } from "../gameobjects/FPSText";
import { ToggleButton } from "../components/UI/ToggleButton";
import { TapButton } from "../components/UI/TapButton";
import { Button } from "../components/UI/Button";
import { HoldButton } from "../components/UI/HoldButton";

export class UITestScene extends UIScene {

	private _fpsText: Phaser.GameObjects.Text;

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
		new Button(this, 180, 400, 'phaser-logo', 'phaser_logo');
		new HoldButton(this, 360, 640, 'phaser-logo');
	}

	update (): void {
		this._fpsText.update();
	}

}