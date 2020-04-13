import { GameManager } from "../components/GameManager";
import { UserData } from "../components/UserData";

export class BootScene extends Phaser.Scene {

	constructor () {
		super('BootScene');
	}

	init (): void {
		console.log(`BootScene`);
		GameManager.instance().register<UserData>('userdata', new UserData('123yd', 'ReydVires'));
	}

	create (): void {
		this.scene.start('PreloadScene');
	}
	
}