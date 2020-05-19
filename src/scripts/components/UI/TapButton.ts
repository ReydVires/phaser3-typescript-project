import { ILabel } from "../interface/ILabel";

export class TapButton extends Phaser.GameObjects.Image implements ILabel {

	private _label: Phaser.GameObjects.Text;
	private _pressed: boolean = false;
	private _callback: Function;
	private _argument: unknown;

	constructor (scene: Phaser.Scene, x: number, y: number, texture: string) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		this.initInteractive();
		this.initLabel();
	}

	private initLabel (): void {
		this._label = this.scene.add.text(this.x, this.y, '', 
			<Phaser.Types.GameObjects.Text.TextStyle> {
				color: '#000',
				fontSize: '32px',
				align: 'center'
			});
		this._label.setOrigin(this.originX, this.originY);
	}

	private initInteractive (): void {
		this.setInteractive({ useHandCursor: true })
		.on('pointerdown', () => {
			this._pressed = true;
			this.onDown();
		})
		.on('pointerup', () => {
			if (this._pressed) {
				this.onClick();
			}
			this.onUp();
		})
		.on('pointerout', () => {
			this._pressed = false;
			this.onUp();
		});
	}

	private onClick (): void {
		this.scene.time.addEvent({
			delay: 30,
			callback: () => {
				if (this._callback) {
					this._callback(this._argument);
				}
				else {
					console.log('TapButton callback is not set');
				}
			}
		});
	}

	private onDown (): void {
		const onSizeRatio = (this.displayWidth > 64) && (this.displayHeight > 64);
		this.setScale(onSizeRatio ? 0.9 : 0.85);
	}

	private onUp (): void {
		this.setScale(1);
	}

	public getArgument (): unknown {
		return this._argument;
	}

	public setCallback (callback: Function, arg?: unknown): this {
		this._argument = arg;
		this._callback = (typeof callback === 'function') ? callback :
			() => { console.log("TapButton default callback"); };
		return this;
	}

	public getLabel(): Phaser.GameObjects.Text {
		return this._label;
	}

	public setText (text: string, style?: Phaser.Types.GameObjects.Text.TextStyle): this {
		this._label?.setText(text);
		if (style) {
			this._label?.setStyle(style);
		}
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
	public setScale (value: number): this {
		super.setScale(value);
		this._label?.setScale(value);
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