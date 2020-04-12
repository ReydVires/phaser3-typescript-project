export class Button extends Phaser.GameObjects.Sprite {

	private _pressed: boolean = false;
	private _callback: Function;
	private _argument: unknown;
	private _unpressedTexture: string;
	private _pressedTexture: string;

	constructor (scene: Phaser.Scene, x: number, y: number, unpressedTexture: string, pressedTexture?: string) {
		super(scene, x, y, unpressedTexture);
		scene.add.existing(this);
		if (pressedTexture) {
			this._unpressedTexture = unpressedTexture;
			this.setPressedTexture(pressedTexture);
		}
		this.initInteractive();
	}

	private onDown (): void {
		if (this.texture.frameTotal > 2) {
			this.setFrame(1);
		}
		else if (this._pressedTexture) {
			this.setTexture(this._pressedTexture);
		}
	}

	private onUp (): void {
		if (this.texture.frameTotal > 2) {
			this.setFrame(0);
		}
		else {
			this.setTexture(this._unpressedTexture);
		}
	}

	private onClick (): void {
		this.scene.time
			.delayedCall(25, () => {
				if (this._callback) {
					this._callback(this._argument);
				}
				else {
					console.log('Button callback is not set');
				}
			});
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

	public setCallback (callback: Function, arg?: unknown): this {
		this._argument = arg;
		this._callback = (typeof callback === 'function') ? callback :
			() => { console.log("Button default callback"); };
		return this;
	}

	public setUnpressedTexture (key: string): this {
		this._unpressedTexture = key;
		return this;
	}

	public setPressedTexture (texture: string): this {
		this._pressedTexture = texture;
		return this;
	}

}