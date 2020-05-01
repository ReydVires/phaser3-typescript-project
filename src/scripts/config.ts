//#region Import scenes module
import { BootScene } from './scenes/BootScene';
import { PreloadScene } from './scenes/PreloadScene';
import { MenuViews } from './scenes/MenuViews';
import { TestScene } from './test/scenes/TestScene';
import { TestUIScene } from './test/scenes/TestUIScene';

//#endregion

export const SCREEN_WIDTH: number = 720;
export const SCREEN_HEIGHT: number = 1280;
export const centerX: number = SCREEN_WIDTH / 2;
export const centerY: number = SCREEN_HEIGHT / 2;

const scenes: Array<Function> = [
	BootScene,
	PreloadScene,
	MenuViews,
	TestScene,
	TestUIScene
];

export const Config: Phaser.Types.Core.GameConfig = {
	title: 'Phaser 3 Game',
	type: Phaser.AUTO,
	backgroundColor: '#3498db',
	scale: {
		parent: 'phaser-game',
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT
	},
	// input: {
	// 	activePointers: 3
	// },
	dom: {
		createContainer: true
	},
	scene: scenes,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			gravity: { y: 400 }
		}
	},
	render: {
		pixelArt: false,
		antialias: false
	},
	// fps: {
	// 	target: 60,
	// 	forceSetTimeOut: false // true
	// },
};
