export class TextObject extends Phaser.GameObjects.Text {

	private _sprite: Phaser.Physics.Arcade.Sprite;

	constructor (scene: Phaser.Scene, x: number, y: number, text: string, style?: Phaser.Types.GameObjects.Text.TextStyle) {
		super(scene, x, y, text, style || {});
		scene.add.existing(this);

		this._sprite = scene.physics.add.sprite(x, y, '')
			.setVisible(false)
			.setDisplaySize(this.displayWidth, this.displayHeight)
			.disableBody();
		this.setOrigin(0, 0.5);
	}

	public getGameObject (): Phaser.GameObjects.GameObject {
		return this._sprite;
	}

	public disableBody (): this {
		this._sprite?.disableBody();
		return this;
	}

	public enableBody (): this {
		this._sprite?.enableBody(true, this.x, this.y, true, false);
		return this;
	}

	/**
	 * @override
	 */
	public setOrigin (x: number, y?: number): this {
		super.setOrigin(x, y);
		this._sprite?.setOrigin(x, y);
		return this;
	}

	/**
	 * @override
	 */
	public destroy (): void {
		super.destroy();
		this._sprite?.destroy();
	}

	/**
	 * @override
	 */
	public setPosition (x: number, y: number, z?: number, w?: number): this {
		super.setPosition(x, y, z, w);
		this._sprite?.setPosition(x, y, z, w);
		return this;
	}

}