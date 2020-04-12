export class TapButton extends Phaser.GameObjects.Image {

	private _pressed: boolean = false;
	private _callback: Function;
	private _argument: unknown;

	constructor (scene: Phaser.Scene, x: number, y: number, texture: string) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		this.initInteractive();
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
			delay: 25,
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
		this.setScale(0.9);
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

}