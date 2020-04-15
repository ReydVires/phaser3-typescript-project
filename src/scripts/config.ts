//#region Import scenes module
import { BootScene } from './scenes/BootScene';
import { PreloadScene } from './scenes/PreloadScene';
import { MenuViews } from './scenes/MenuViews';
import { TestScene } from './scenes/TestScene';
import { UITestScene } from './scenes/UITestScene';

//#endregion

export const SCREEN_WIDTH: number = 360;
export const SCREEN_HEIGHT: number = 640;
export const centerX: number = SCREEN_WIDTH / 2;
export const centerY: number = SCREEN_HEIGHT / 2;

const scenes: Array<Function> = [
	BootScene,
	PreloadScene,
	MenuViews,
	TestScene,
	UITestScene
];

export const Config: Phaser.Types.Core.GameConfig = {
	title: 'Wacana The Game',
	type: Phaser.AUTO,
	backgroundColor: '#3498db',
	seed: [Date.now().toString()],
	scale: {
		parent: 'phaser-game',
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT
	},
	dom: {
		createContainer: true
	},
	scene: scenes,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	render: {
		pixelArt: true,
		antialias: false
	}
};
