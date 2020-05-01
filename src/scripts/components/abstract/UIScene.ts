import { BaseScene } from "./BaseScene";
import { IEventHandler } from "../interface/IEventHandler";
import { ISceneControl } from "../interface/ISceneControl";
import { EventHandler } from "../../utils/EventHandler";

export abstract class UIScene extends Phaser.Scene implements IEventHandler, ISceneControl {

	private _baseSceneKey: string;
	private _baseScene: BaseScene;
	private _prefixID: string = 'UI';
	private _postfixID: string = 'UIScene';
	private _isPause: boolean;

	constructor(key: string) {
		super(key);
		this._baseSceneKey = this.evaluateSceneKey(key);
		this._isPause = false;
	}

	private evaluateSceneKey (key: string, postfixScene: string = 'Scene'): string {
		const keyValid = key.length > this._postfixID.length;
		const regexValid = key.indexOf(this._postfixID) !== -1;
		console.assert(keyValid && regexValid, "This UIScene key not valid, and will not be synchronized!");
		return (keyValid && regexValid) ?
			(key.slice(0, key.length - this._postfixID.length) + postfixScene) : '';
	}

	registerEvent(key: string, value: Function, once?: boolean | undefined): void {
		this.eventHandler.registerEvent(this._prefixID + '#' + key, value, once);
	}

	public get eventHandler (): EventHandler {
		return this._baseScene?.eventHandler;
	}

	public get isScenePause (): boolean {
		return this._isPause;
	}

	/**
	 * @override
	 */
	init (data?: object): void {
		this._baseScene = this.scene.get(this._baseSceneKey) as BaseScene;
	}

	startToScene(key: string, data?: object): void {
		this._isPause = false;
		this.scene.stop();
		this._baseScene?.startToScene(key, data);
	}

	restartScene(data?: object): void {
		this._isPause = false;
		this.scene.stop();
		this._baseScene?.restartScene(data);
	}

	pauseScene(value?: boolean): void {
		this._isPause = (typeof value !== 'undefined') ? value : false;
		this._baseScene?.pauseScene(value);
	}

}