export class UserData {

	private _id: string;
	private _name: string;
	private _score: number;

	constructor (id: string, name: string) {
		this._id = id;
		this._name = name;
		this._score = 0;
	}

	public setScore (score: number): void {
		this._score = score;
	}

	public get score (): number {
		return this._score;
	}

	public toString (): string {
		return `ID: ${this._id}, Name: ${this._name}, Score: ${this._score}`;
	}

}