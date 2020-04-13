export class FlatButton extends Phaser.GameObjects.Rectangle {

	private _label: Phaser.GameObjects.Text;
	private _callback: Function;
	private _argument: unknown;
	private _pressed: boolean;
	private _disable: boolean;

	constructor (scene: Phaser.Scene, x: number, y: number, width?: number, height?: number) {
		super(scene, x, y, width, height);
		scene.add.existing(this);
		const defaultWidth = width ? width : 128;
		const defaultHeight = height ? height: 64;
		this.setDisplaySize(defaultWidth, defaultHeight);
		this.setOrigin(0.5);
		this.initStyle();
		this.initInteractive();
		this.initLabel();
		this._pressed = false;
		this._disable = false;
	}

	private initLabel (): void {
		this._label = this.scene.add.text(this.x, this.y, '', 
			<Phaser.Types.GameObjects.Text.TextStyle> {
				color: '#636e72',
				fontSize: '32px',
				align: 'center'
			});
		this._label.setOrigin(this.originX, this.originY);
	}

	private initStyle (): void {
		this.setStrokeStyle(2, 0x95a5a6, 0.8);
		this.setFillStyle(0xfafafa);
	}
	
	private initInteractive (): void {
		this.setInteractive({ useHandCursor: true })
			.on('pointerdown', this.handleDown, this)
			.on('pointerup', this.handleUp, this)
			.on('pointerout', this.handleOut, this)
			.on('pointerover', this.handleOver, this);
	}

	private handleDown (pointer: Phaser.Input.Pointer): void {
		this.setAlpha(0.8);
		this._pressed = true;
	}

	private handleUp (pointer: Phaser.Input.Pointer): void {
		this.setAlpha(1);
		if (this._pressed) {
			this._pressed = false;
			this.scene.time.delayedCall(25, this._callback.bind(this, this._argument));
		}
	}

	private handleOut (pointer: Phaser.Input.Pointer): void {
		if (!this._disable) {
			this.setAlpha(1);
		}
		this._pressed = false;
	}

	private handleOver (pointer: Phaser.Input.Pointer): void {
		if (!this._disable) {
			this.setAlpha(0.825);
		}
	}

	public get label (): Phaser.GameObjects.Text {
		return this._label;
	}

	public setText (text: string, style?: Phaser.Types.GameObjects.Text.TextStyle): this {
		this._label?.setText(text);
		if (style) {
			this._label?.setStyle(style);
		}
		return this;
	}

	public onClick (callback: Function, arg?: unknown): this {
		this._argument = arg;
		this._callback = (typeof callback === 'function') ? callback :
			() => console.log("Default");
		return this;
	}

	public setDisable (value: boolean): this {
		this.setActive(!value);
		this._label?.setActive(!value);
		if (!value) {
			this.setAlpha(1);
			this.setInteractive();
		}
		else {
			this.setAlpha(0.85);
			this.disableInteractive();
		}
		this._disable = value;
		return this;
	}

	/**
	 * @override
	 */
	public setPosition (x: number, y?: number, z?: number): this {
		super.setPosition(x, y, z);
		this._label?.setPosition(x, y, z);
		return this;
	}

	/**
	 * @override
	 */
	public setDepth (value: number): this {
		super.setDepth(value);
		this._label?.setDepth(value);
		return this;
	}

	/**
	 * @override
	 */
	public setVisible (value: boolean): this {
		super.setVisible(value);
		this._label?.setVisible(value);
		return this;
	}

	/**
	 * @override
	 */
	public setAlpha (value: number): this {
		super.setAlpha(value);
		this._label?.setAlpha(value);
		return this;
	}

	/**
	 * @override
	 */
	public setScrollFactor (value: number): this {
		super.setScrollFactor(value);
		this._label?.setScrollFactor(value);
		return this;
	}

	/**
	 * @override
	 */
	public destroy (): void {
		this._label?.destroy();
		super.destroy();
	}

}