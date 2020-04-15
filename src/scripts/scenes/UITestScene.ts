import { UIScene } from "../components/abstract/UIScene";
import { Joystick } from "../components/UI/Joystick";
import { centerX, centerY } from "../config";
import { FPSText } from "../gameobjects/FPSText";

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

		const joystick = new Joystick(this, centerX, centerY * 1.5, 'virtual_joystick');
		this.registerEvent('set_to_control', (data: unknown) => {
			const target = Array.isArray(data) ? data.pop() : null;
			joystick.setToControl(target);
		});
		this.registerEvent('set_speed_control', (data: unknown) => {
			const speed = Array.isArray(data) ? data.pop() : 0;
			joystick.setSpeed(speed);
		});
	}

	update (): void {
		this._fpsText.update();
	}

}