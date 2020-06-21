import { Wacana } from "../../../../typings/custom";

export class GraphicsButton {

	private _scene: Phaser.Scene;

	private _event: Phaser.Events.EventEmitter;
	private readonly _eventName = {
		onClick: 'onClick',
	};

	private _graphicsInfo = {
		width: 128,
		height: 58,
		fill: 0xfafafa,
		radius: 10,
		alpha: 1
	};

	private _graphics: Phaser.GameObjects.Graphics;
	private _graphicsContainer: Phaser.GameObjects.Container;
	private _graphicsText: Phaser.GameObjects.Text;
	private _clickableObject: Phaser.GameObjects.Rectangle;
	/** (Phaser.GameObjects.Container | Phaser.GameObjects.Text | Phaser.GameObjects.Rectangle)[] */
	private _gameObjects: Wacana.Types.Component.Button.GraphicsInfo;

	constructor (scene: Phaser.Scene, x: number, y: number, text: string = '', style?: Phaser.Types.GameObjects.Text.TextStyle) {
		this._scene = scene;
		this._event = new Phaser.Events.EventEmitter();

		const textStyle = style || { fill: 'black', fontSize: '32px', fontStyle: 'bold' };
		this.createButton(x, y, text, textStyle);
		this.setInteractive();
	}

	private createButton (x: number, y: number, textContent: string, style: Phaser.Types.GameObjects.Text.TextStyle): void {
		this._clickableObject = this._scene.add.rectangle(
			x + (this._graphicsInfo.width / -2),
			y + (this._graphicsInfo.height / -2),
			this._graphicsInfo.width,
			this._graphicsInfo.height,
			this._graphicsInfo.fill,
			0).setOrigin(0);

		this._graphics = this._scene.add.graphics()
			.fillStyle(this._graphicsInfo.fill, this._graphicsInfo.alpha)
			.fillRoundedRect(
				(this._graphicsInfo.width / -2),
				(this._graphicsInfo.height / -2),
				this._graphicsInfo.width,
				this._graphicsInfo.height,
				this._graphicsInfo.radius);

		this._graphicsContainer = this._scene.add.container(x , y);
		this._graphicsContainer.add(this._graphics);

		this._graphicsText = this._scene.add.text(x, y, textContent, style).setOrigin(0.5);

		this._gameObjects = [ this._graphicsContainer, this._graphicsText, this._clickableObject ];
	}

	private setInteractive (): void {
		this._clickableObject.setInteractive({ useHandCursor: true })
			.on('pointerup', () => {
				this._scene.tweens.add({
					targets: this._graphics,
					props: {
						alpha: {getStart: () => 1, getEnd: () => 0.85 }
					},
					yoyo: true,
					duration: 45,
				});
				this._scene.tweens.add({
					targets: [this._graphicsText, this._graphicsContainer],
					props: {
						scale: {getStart: () => 1, getEnd: () => 0.9 }
					},
					yoyo: true,
					duration: 45,
					onComplete: () => this._event.emit(this._eventName.onClick),
				});
			});

	}

	get gameObjects (): Wacana.Types.Component.Button.GraphicsInfo {
		return this._gameObjects;
	}

	get position (): Phaser.Geom.Point {
		return new Phaser.Geom.Point(this._graphicsContainer.x, this._graphicsContainer.y);
	}

	get width (): number {
		return this._graphicsInfo.width;
	}

	get height (): number {
		return this._graphicsInfo.height;
	}

	public onClick (events: Function): void {
		this._event.on(this._eventName.onClick, events);
	}

	public setPosition (x: number, y: number): void {
		this._gameObjects.forEach(item => {
			if (item instanceof Phaser.GameObjects.Rectangle) {
				item.setPosition(x - this._graphicsInfo.width / 2, y - this._graphicsInfo.height / 2);
			}
			else {
				item.setPosition(x, y);
			}
		});
	}

}