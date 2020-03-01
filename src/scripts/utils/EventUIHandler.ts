export class EventUIHandler {

	private _eventStores: Map<string, Function>;
	private _currentEvent: Phaser.Events.EventEmitter;

	constructor (event: Phaser.Events.EventEmitter) {
		this._eventStores = new Map<string, Function>();
		this._currentEvent = event;
	}

	public registerEvent (key: string, value: Function, once?: boolean): void {
		if (!this._eventStores.has(key)) {
			this._eventStores.set(key, value);
			if (!once) {
				this._currentEvent.on(key, value);
			}
			else {
				this._currentEvent.once(key, value);
			}
		}
		console.assert(this._eventStores.has(key), `Event: ${key} is already registered!`);
	}

	public emit (key: string): void {
		console.assert(this._eventStores.has(key), "Nothing to emit:", key);
		if (this._eventStores.has(key)) {
			this._currentEvent.emit(key);
			if (!this._currentEvent.eventNames().includes(key)) {
				console.log("Just printed when the event is 'once' only!", key);
				this.removeEvent(key);
			}
		}
	}

	public removeAllEvents (): void {
		this._eventStores.forEach((value, key) => {
			this._currentEvent.off(key, value);
		});
		this._eventStores.clear();
	}

	public removeEvent (key: string): void {
		if (this._eventStores.has(key)) {
			this._currentEvent.off(key);
			this._eventStores.delete(key);
		}
	}

	public inspectEvents (): void {
		console.log("Print all registered event keys:");
		this._eventStores.forEach((value, key) => {
			console.log(">>", key);
		});
	}

}