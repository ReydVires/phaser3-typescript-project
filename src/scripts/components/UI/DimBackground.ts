import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../config";
import { Layer } from "../../utils/Layer";

export class DimBackground extends Phaser.GameObjects.Graphics {

	constructor (scene: Phaser.Scene, width?: number, height?: number, options?: Phaser.Types.GameObjects.Graphics.Options) {
		super(scene, options);
		scene.add.existing(this);
		const rectangle = new Phaser.Geom.Rectangle(0, 0, width || SCREEN_WIDTH, height || SCREEN_HEIGHT);
		this.setScrollFactor(0)
			.fillStyle(0x000, 0.8)
			.fillRectShape(rectangle)
			.setInteractive(rectangle, Phaser.Geom.Rectangle.Contains)
			.setDepth(Layer.UI.FIRST)
			.setVisible(false);
	}

	public show (doShow?: boolean): this {
		if (doShow || this.visible) {
			this.disableInteractive();
		}
		else {
			this.setInteractive();
		}
		this.setVisible(doShow || !this.visible);
		return this;
	}

}