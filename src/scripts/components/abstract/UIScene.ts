import { BaseScene } from "./BaseScene";
import { IEventHandler } from "../interface/IEventHandler";
import { ISceneControl } from "../interface/ISceneControl";
import { EventHandler } from "../../utils/EventHandler";

export abstract class UIScene extends Phaser.Scene implements IEventHandler, ISceneControl {

	private _baseSceneKey: string;
	private _baseScene: BaseScene;
	private _prefixID: string = 'UI';

	constructor(key: string) {
		super(key);
		this._baseSceneKey = this.evaluateSceneKey(key);
	}

	private evaluateSceneKey (key: string): string {
		const keyValid = key.length > 3;
		const regexValid = key.indexOf(this._prefixID) === 0;
		console.assert(keyValid && regexValid, "BaseScene Key is invalid, and will not be synchronized!");
		return (keyValid && regexValid) ? key.slice(2, key.length) : key;
	}

	registerEvent(key: string, value: Function, once?: boolean | undefined): void {
		this.targetEmitter.registerEvent(this._prefixID + '#' + key, value, once);
	}

	public get targetEmitter (): EventHandler {
		return this._baseScene.eventHandler;
	}

	/**
	 * @override
	 */
	init (data?: object): void {
		this._baseScene = this.scene.get(this._baseSceneKey) as BaseScene;
	}

	startToScene(key: string, data?: object): void {
		this.scene.stop();
		this._baseScene.startToScene(key, data);
	}

	restartScene(data?: object): void {
		this.scene.stop();
		this._baseScene.restartScene(data);
	}

	pauseScene(value?: boolean): void {
		this._baseScene.pauseScene(value);
	}

}