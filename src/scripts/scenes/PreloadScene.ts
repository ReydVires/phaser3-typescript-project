import { SCREEN_WIDTH, centerX, centerY } from "../config";

export class PreloadScene extends Phaser.Scene {

	private _barWidth: number;
	private _barHeight: number;
	private _xStart: number;
	private _yStart: number;
	private _progressBar: Phaser.GameObjects.Graphics;

	constructor () {
		super('PreloadScene');
	}

	init (): void {
		console.log(`PreloadScene`);
	}

	preload (): void {
		this.createLoadingBar(centerX, centerY, 12, 32);
		this.load.pack('image', 'assets/assetpack.json', 'imagePack');
		this.load.pack('sprite', 'assets/assetpack.json', 'spritePack');
		this.load.pack('spritesheet', 'assets/assetpack.json', 'spritesheetPack');
	}

	create (): void {
		/**
		 * This is how you would dynamically import the mainScene class (with code splitting),
		 * add the mainScene to the Scene Manager
		 * and start the scene.
		 * The name of the chunk would be 'mainScene.chunk.js
		 * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
		 */
		// let someCondition = true;
		// if (someCondition)
		// 	import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
		// 		this.scene.add('MainScene', mainScene.default, true);
		// 	});
		// else
		// 	console.log('The mainScene class will not even be loaded by the browser');
	}

	updateProgressbar (percentage: number): void {
		this._progressBar.clear();
		this._progressBar.fillStyle(0x00cec9, 1);
		this._progressBar.fillRect(
			this._xStart,
			this._yStart,
			percentage * this._barWidth,
			this._barHeight
		);
	}

	onFinishLoading (): void {
		this.load.off('progress', this.updateProgressbar.bind(this));
		this.scene.start('MenuScene');
	}

	emitEventLoading (): void {
		this._progressBar = this.add.graphics();
		this.load.on('progress', this.updateProgressbar.bind(this));
		this.load.once('complete', this.onFinishLoading.bind(this));
	}

	createLoadingText (x: number, y: number, height: number, text: string): void {
		const loadingText = {
			x: x,
			y: y - (height + 8),
			text: "LOADING",
			style: {
				fill: 'black'
			}
		};
		this.make
			.text(loadingText)
			.setOrigin(0.5);
	}

	createLoadingBar (x: number, y: number, height: number, barPadding: number = 16): void {
		this.createLoadingText(x, y, height, 'LOADING');

		// Size and position
		this._barWidth = SCREEN_WIDTH - barPadding;
		this._barHeight = height;
		this._xStart = x - this._barWidth / 2;
		this._yStart = y - this._barHeight / 2;

		const borderOffset = 2;
		const borderRect = new Phaser.Geom.Rectangle(
			this._xStart - borderOffset,
			this._yStart - borderOffset,
			this._barWidth + borderOffset * 2,
			this._barHeight + borderOffset * 2
		);

		const borderLine = this.add.graphics({
			lineStyle: {
				width: 2,
				color: 0x636e72
			}
		});
		borderLine.strokeRectShape(borderRect);

		// Create background bar
		const bgBar = this.add.graphics();
		bgBar.fillStyle(0xdfe6e9, 0.95);
		bgBar.fillRect(
			this._xStart - 1,
			this._yStart - 1,
			this._barWidth + borderOffset,
			this._barHeight + borderOffset
		);

		this.emitEventLoading();
	}
}
