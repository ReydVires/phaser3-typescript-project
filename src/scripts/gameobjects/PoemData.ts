export class PoemData {

	private id: string;
	private title: string;
	private author: string;
	private poems: Array<string>;
	private missSpell: Array<string>;
	private punchLine: number;
	private feelsType: string;

	constructor(poemData: any) {
		this.id = poemData.id;
		this.title = poemData.title;
		this.author = poemData.author;
		this.poems = poemData.poems;
		this.missSpell = poemData.missSpell;
		this.punchLine = poemData.punchLine;
		this.feelsType = poemData.feelsType;
	}

	public getId (): string {
		return this.id;
	}

	public getTitle (): string {
		return this.title;
	}

	public getAuthor (): string {
		return this.author;
	}

	public getPoems (index: number = -1): Array<string> {
		return (index !== -1) ? this.poems[index].split(' ') : this.poems;
	}

	public getPuchLine (): number {
		return this.punchLine;
	}

	public getFeelsType (): string {
		return this.feelsType;
	}

	public getLines (index: number): Array<string> {
		if (index >= 0 && index < this.poems.length) {
			return (this.poems[index] + " " + this.missSpell[index]).split(' ');
		}
		console.warn(`Index(${index}) is undefined!`);
		return [];
	}

}