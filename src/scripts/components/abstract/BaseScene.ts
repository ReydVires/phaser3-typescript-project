import { IEventHandler } from "../interface/IEventHandler";
import { ISceneControl } from "../interface/ISceneControl";
import { EventHandler } from "../../utils/EventHandler";

export abstract class BaseScene extends Phaser.Scene implements IEventHandler, ISceneControl {

	private _eventHandler: EventHandler;
	private _prefixID: string = 'event';

	constructor (key: string) {
		super(key);
	}

	/**
	 * @override
	 */
	init (data?: object): void {
		this.scene.launch("UI" + this.scene.key);
		this._eventHandler = new EventHandler(this.events);
	}

	registerEvent (key: string, value: Function, once?: boolean): void {
		this.eventHandler.registerEvent(this._prefixID + '#' + key, value, once);
	}

	startToScene (key: string, data?: object): void {
		this.eventHandler.removeAllEvents();
		this.scene.start(key, data);
	}

	restartScene (data?: object): void {
		this.eventHandler.removeAllEvents();
		this.scene.restart(data);
	}

	pauseScene (value: boolean = true): void {
		if (value) {
			this.scene.pause();
		}
		else {
			this.scene.resume();
		}
	}

	get eventHandler (): EventHandler {
		return this._eventHandler;
	}

}