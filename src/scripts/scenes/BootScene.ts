import { GameManager } from "../components/GameManager";
import { UserData } from "../objects/UserData";

export class BootScene extends Phaser.Scene {

	constructor () {
		super('BootScene');
	}

	init (): void {
		console.log(`BootScene`);
		const gameManager = GameManager.instance();
		gameManager.register<UserData>('userdata', new UserData('debug'));
		const userData = gameManager.service<UserData>('userdata');
		console.log(userData.toObject());
	}

	create (): void {
		this.scene.start('PreloadScene');
	}
	
}