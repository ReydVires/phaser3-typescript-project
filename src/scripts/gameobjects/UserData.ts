export class UserData {

	private _id: string;
	private _coin: number;
	private _level: number;
	private _skinName: string;

	constructor (id: string) {
		this._id = id;
		this._coin = 0;
		this._level = 1;
		this._skinName = 'default';
	}

	public get id (): string {
		return this._id;
	}

	public get coin (): number {
		return this._coin;
	}

	public set coin(value: number) {
		this._coin = value > 0 ? value : 0;
	}

	public get level (): number {
		return this._level;
	}

	public set level (value: number) {
		this._level = value > 0 ? value : 0;
	}

	public get skinName (): string {
		return this._skinName;
	}

	public set skinName (name: string) {
		if (name.length > 0) {
			this._skinName = name;
		}
	}

	public toObject (): object {
		return {
			id: this.id,
			coin: this.coin,
			level: this.level,
			skinName: this.skinName
		};
	}

}