import { UIScene } from "../../components/abstract/UIScene";
import { FPSText } from "../../gameobjects/FPSText";
import { TapButton } from "../../components/UI/TapButton";
import { GameManager } from "../../components/gamemanager/GameManager";
import { UserData } from "../../components/gamemanager/UserData";
import { Button } from "../../components/UI/Button";
import { HoldButton } from "../../components/UI/HoldButton";
import { Joystick } from "../../components/UI/Joystick";
import { ToggleButton } from "../../components/UI/ToggleButton";

export class TestUIScene extends UIScene {

	private _fpsText: FPSText;

	constructor () {
		super('TestUIScene');
	}

	init (): void {
		super.init();
		console.log("TestUIScene!");
	}

	create (): void {
		this._fpsText = new FPSText(this);

		new TapButton(this, 475, 256, 'phaser_logo')
			.setText("TESTING", { fontStyle: 'bold' })
			.setCallback(() => {
				let userData = GameManager.instance().service<UserData>('userdata');
				console.log("inspect UserData:", userData.toString());
				userData.setScore(userData.score + 10);
			});

		const btn = new Button(this, 180, 460, 'phaser-logo', 'phaser_logo')
			.setText("CLICK ME!", { fontStyle: 'bold' })
			.setCallback(() => {
				this.eventHandler.emit('UI#destroy_fps');
				this.eventHandler.emit('event#set_to_control');
			});
		btn.getLabel().setFontSize(28);

		new HoldButton(this, 360, 1040, 'phaser-logo');

		const joystick = new Joystick(this, 360, 640, 'virtual_joystick')
			.setToControl(this._fpsText);

		new ToggleButton(this, 180, 256, { active: 'phaser-logo', deactive: 'phaser_logo' }, true)
			.setCallback((value: boolean) => {
				joystick.setActive(value);
			});

		this.registerEvent('destroy_fps', () => this._fpsText.destroy(), true);
		this.registerEvent('set_to_control', (target: unknown) => {
			const gameObject = Array.isArray(target) ? target.pop() : null;
			joystick.setToControl(gameObject);
		}, true);
	}

	update (): void {
		if (this._fpsText.active) {
			this._fpsText?.update();
		}
	}

}