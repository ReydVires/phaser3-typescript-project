export class Helper {

	static exitApp (): void {
		const nav = navigator as any;
		if (nav.app) {
			nav.app.exitApp();
		}
		else if (nav.device) {
			nav.device.exitApp();
		}
		else {
			window.close();
		}
	}

	static drawDebugLine (graphics: Phaser.GameObjects.Graphics, dimension: number = 32): void {
		console.log("Draw debug lines in " + dimension + "px");
	}

}
