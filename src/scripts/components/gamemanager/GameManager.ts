export class GameManager {

	private static _instance: GameManager;
	private _service: Map<string, any> = new Map<string, any>();

	private constructor() {}

	public static instance(): GameManager {
		if (!this._instance) {
			this._instance = new GameManager();
		}
		return this._instance;
	}
	
	public register<T> (key: string, value: any, overwrite?: boolean): void {
		const hasKey = this._service.has(key);
		if (!hasKey) {
			this._service.set(key, value as T);
		}
		else if (overwrite) {
			this._service.set(key, value as T);
		}
		console.assert(!hasKey, "GameManager has key: " + key + ", is overwrite? " + overwrite);
	}

	public service<T> (key: string): T {
		return this._service.get(key);
	}

	public resetService (): void {
		this._service.clear();
	}

}