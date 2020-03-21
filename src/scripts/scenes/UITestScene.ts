import { UIScene } from "../components/abstract/UIScene";

export class UITestScene extends UIScene {

	constructor () {
		super('UITestScene');
	}

	init (): void {
		super.init();
		console.log("Create UITestScene!");
	}

	create (): void {}

}