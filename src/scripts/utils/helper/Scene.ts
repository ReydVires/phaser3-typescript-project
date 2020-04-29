import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../config";

type LineOption = {
	dimension?: number,
	height?: number,
	width?: number
};

export function NextSceneFadeOut (scene: Phaser.Scene, sceneName: string, data?: any, duration?: number, allowInput?: boolean): void {
	console.log("Go to scene: " + sceneName);
	scene.input.enabled = allowInput || false;
	const cam = scene.cameras.main;
	cam.once('camerafadeoutcomplete', () => {
		// Passing zero `{}` object to clear based-scene variable
		scene.scene.start(sceneName, data ? data : {});
	});
	cam.fadeOut(duration || 300);
}

export function SceneFadeIn (scene: Phaser.Scene, callback: Function, duration?: number): void {
	const cam = scene.cameras.main;
	cam.once('camerafadeincomplete', () => callback());
	cam.fadeIn(duration || 300);
}

export function PrintPointerPos (scene: Phaser.Scene, relativeOnWorld?: boolean): void {
	const posLabel = scene.add.text(0, 0, '(x, y)').setDepth(100).setOrigin(0.5, 1);
	scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
		let localX, localY;
		if (!relativeOnWorld) {
			localX = Math.round(pointer.x);
			localY = Math.round(pointer.y);
		}
		else {
			localX = Math.round(pointer.worldX);
			localY = Math.round(pointer.worldY);
		}
		posLabel.setPosition(localX, localY).setText(`(${localX}, ${localY})`);
	});
}

export function DebugDrawLine (graphics: Phaser.GameObjects.Graphics, option?: LineOption, scene?: Phaser.Scene): void {
	// Set default value
	const dimension = option?.dimension || 32;
	const WIN_HEIGHT = option?.height || SCREEN_HEIGHT;
	const WIN_WIDTH = option?.width || SCREEN_WIDTH;

	const height = Math.ceil(WIN_HEIGHT / dimension);
	const width = Math.ceil(WIN_WIDTH / dimension);
	graphics.lineStyle(1, 0xecf0f1, 0.85);
	for (let row = 0; row < height; row++) {
		graphics.moveTo(0, row * dimension);
		graphics.lineTo(WIN_WIDTH, row * dimension);
		for (let col = 0; col < width; col++) {
			graphics.moveTo(col * dimension, 0);
			graphics.lineTo(col * dimension, WIN_HEIGHT);
			if (scene) { // Experiment
				scene.add.text(col * dimension, row * dimension, `(${col},${row})`,
					<Phaser.Types.GameObjects.Text.TextStyle> { fontSize: '8px' });
			}
		}
	}
	graphics.strokePath();
}