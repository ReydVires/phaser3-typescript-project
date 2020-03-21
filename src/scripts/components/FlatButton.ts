export class FlatButton extends Phaser.GameObjects.Rectangle {

	private _label: Phaser.GameObjects.Text;
	private _callback: Function;
	private _argument: unknown;
	private _pressed: boolean;
	private _disable: boolean;
	private _justOnce: boolean;

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
		this.setStrokeStyle(3, 0x95a5a6, 0.85);
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
		this.setAlpha(0.825);
		this._pressed = true;
	}

	private handleUp (pointer: Phaser.Input.Pointer): void {
		this.setAlpha(1);
		if (this._pressed) {
			this._pressed = false;
			this._callback(this._argument);
			if (this._justOnce) {
				this.setDisable(true);
			}
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
			this.setAlpha(0.925);
		}
	}

	public get label (): Phaser.GameObjects.Text {
		return this._label;
	}

	public setText (text: string): this {
		this._label?.setText(text);
		return this;
	}

	public justOnce (value: boolean = true): this {
		this._justOnce = value;
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
		this._label.setVisible(value);
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

}