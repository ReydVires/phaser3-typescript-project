import { BaseScene } from '../components/abstract/BaseScene';
import { Helper } from '../utils/Helper';
import { PhaserLogo } from '../objects/PhaserLogo';
import { centerX, centerY, SCREEN_WIDTH } from '../config';
import objectLevel from '../levels/objectLevel.json';
import { Obstacle } from '../objects/Obstacle';
import { TextObject } from '../objects/TextObject';

interface TextInfo {
	posX: number;
	posY: number;
	width: number;
}

export class TestScene extends BaseScene {

	private _boundaryWalls: Phaser.Physics.Arcade.Group;
	private _mapKeyboard: any;

	constructor () {
		super('TestScene');
	}

	init (): void {
		super.init();
		console.log(`TestScene: For experimental only!`);
		this._boundaryWalls = this.physics.add.group();
		this._mapKeyboard = {
			'up': this.input.keyboard.addKey('up'),
			'down': this.input.keyboard.addKey('down'),
			'left': this.input.keyboard.addKey('left'),
			'right': this.input.keyboard.addKey('right'),
			'space': this.input.keyboard.addKey('space'),
		};
	}

	create (sceneData: unknown): void {
		const background = this.add.image(0, 0, 'background_class');
		background.setOrigin(0);

		const player = new PhaserLogo(this, centerX, centerY * 0.35);
		player.setDisplaySize(64, 64);

		//#region Test PoemSystem: Subtitle
		// TODO: When in-Game, All map for textFloor poetry need to be generated first!
		// PoemData
		const poemData = {
			id: "level_2",
			title: "Gurindam 2",
			author: "tidak diketahui",
			poems: [
				"Gendang gendut tali kecapi",
				"Berenang-renang ke tepian",
				"Dark ipsum dolor instead amet",
				"Lorem-post phoenix dolor sit of"
			],
			missSpell: [
				"godoh",
				"kesepian",
				"Amos mis doom",
				"you"
			],
			punchLine: 0,
			feelsType: "undefined"
		};

		// Maintain line index in poetry
		const lineLength = poemData.poems.length;
		let currLineIndex: number = 0;
		if (sceneData instanceof Object) {
			if (sceneData.hasOwnProperty('currLineIndex')) {
				const nextIndex = (sceneData as any)?.currLineIndex;
				currLineIndex = nextIndex % lineLength; // Will reset if nextIndex equal lineLength
			}
		}

		// Split string
		const textPreStyle: Phaser.Types.GameObjects.Text.TextStyle = {
			align: 'left'
		};
		// const text = "Drama ini takkan berhenti hingga senja tiba.";
		const textList = poemData.poems[currLineIndex].split(' ');

		const map = this.createMap();

		// Creating TextObject
		const subtitleObjects: TextObject[] = [];
		for (const text of textList) {
			const textObject = new TextObject(this, 0, 0, text, textPreStyle);
			textObject.setAlpha(0.85);
			subtitleObjects.push(textObject);
		}

		// Define text width size
		const widthLineText: number[] = [subtitleObjects[0].displayWidth];
		const panelWidth = SCREEN_WIDTH;
		const centerPanel = panelWidth / 2;
		const spacing = 3;
		let lineIndex = 0;
		for (let i = 1; i < subtitleObjects.length; i++) {
			const textObjWidth = subtitleObjects[i].displayWidth + spacing;
			const newWidth = widthLineText[lineIndex] + textObjWidth;
			if (newWidth < panelWidth) {
				widthLineText[lineIndex] += textObjWidth;
			}
			else {
				lineIndex++;
				if (lineIndex !== widthLineText.length - 1) {
					widthLineText.push(textObjWidth);
				}
			}
		}

		// Placing textObject subtitle based on width size
		let newLine = 0;
		let txtIdx = 0;
		let posX = (1 - widthLineText[newLine] / panelWidth) * centerPanel;
		do {
			const textObject = subtitleObjects[txtIdx];
			if (!posX) {
				const prevObject = subtitleObjects[txtIdx - 1];
				posX = prevObject.x + prevObject.displayWidth + spacing;
				newLine--;
			}
			textObject.setPosition(posX, centerY * 1.2 + textObject.displayHeight * newLine);
			posX += textObject.displayWidth + spacing;
			if (posX >= widthLineText[newLine]) {
				newLine++;
				posX = (1 - widthLineText[newLine] / panelWidth) * centerPanel;
			}
			txtIdx++;
		} while (txtIdx < subtitleObjects.length);

		//#endregion

		//#region Test PoemSystem: Pick GameObject
		// Generate text on floor
		const tfStyle: Phaser.Types.GameObjects.Text.TextStyle = {
			fontStyle: 'bold'
		};
		const textFloorList = poemData.poems[currLineIndex].split(' ');
		const missSpell = poemData.missSpell[currLineIndex].split(' ');
		for (const spell of missSpell) {
			textFloorList.push(spell);
		}

		// Creating textObjects on floor
		const textFloorObjects: TextObject[] = [];
		for (const text of textFloorList) {
			const textFloor = new TextObject(this, 0, 0, text, tfStyle);
			textFloor.enableBody();
			textFloorObjects.push(textFloor);

			// Set overlap handler
			this.physics.add.overlap(player, textFloor.getGameObject(), () => {
				if (textList.indexOf(textFloor.text) !== -1) {
					const index = textList.indexOf(textFloor.text);
					this.eventHandler.emit('event#pick_text', index);
				}
				textFloor.destroy();
			});
		}
		console.clear();
		this.randomPlace(map, textFloorObjects);
		//#endregion

		// When the scene is immediately use eventHandler
		Helper.doTask(() => {
			this.eventHandler.emit('UI#set_to_control', player);
			this.eventHandler.emit('UI#set_speed_control', 50);
		});

		const subtitleTemp: TextObject[] = [];
		this.registerEvent('clear_array', (data: unknown) => {
			const array = Array.isArray(data) ? data[0] : [];
			while (array.length > 0) {
				const gameObject = array.pop();
				if (gameObject instanceof Phaser.GameObjects.GameObject) {
					gameObject.destroy();
				}
			}
		});

		this.registerEvent('pick_text', (data?: unknown) => {
			const index = Array.isArray(data) ? data[0] : -1;
			const textObject = subtitleObjects[index];
			if (textObject) {
				const textPostStyle: Phaser.Types.GameObjects.Text.TextStyle = {
					stroke: 'black',
					strokeThickness: 3,
					align: 'left'
				};
				textObject.setStyle(textPostStyle).setAlpha(1);
				subtitleTemp.push(textObject);
				if (subtitleTemp.length === subtitleObjects.length) {
					console.log('Done collecting!');
					currLineIndex++;
					// this.eventHandler.emit('event#clear_array', subtitleObjects);
					// this.eventHandler.emit('event#clear_array', textFloorObjects);
					this.restartScene({currLineIndex});
				}
			}
		});

		this.createObjectLevel(objectLevel);

		const colliderObjects: unknown = [
			{
				id: 'player',
				gameObject: player,
				gameObjects: [ this._boundaryWalls ]
			},
		];
		this.registerColliders(colliderObjects);
	}

	update (): void {
		const spaceKey = this._mapKeyboard['space'];
		if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
			console.log('Tap space!');
		}
	}

	createMap (heightMap: number = 10, wideMap: number = 8, startX: number = 32, startY: number = 162, width: number = 40, height: number = 22): Map<number, any> {
		const map: Map<number, any> = new Map<number, any>();
		const lengthMap = heightMap * wideMap;
		for (let i = 0; i < lengthMap; i++) {
			const modded = i % wideMap;
			const divided = Math.floor(i / wideMap);
			const position = new Phaser.Geom.Point(
				width * modded + startX,
				height * divided + startY
			);
			map.set(i, position);
		}
		return map;
	}

	randomPlace (map: Map<number, any>, gameObjects: Array<TextObject>, width?: number): Array<number> {
		const mapKeys: Array<number> = [];
		map.forEach((val, key) => {
			mapKeys.push(key);
		});

		let goIndex = 0;
		const maxWidth = width ? width : SCREEN_WIDTH;
		const pickedIndex: Array<number> = [];
		const counterToPick = gameObjects.length;
		while (pickedIndex.length < counterToPick) {
			const index = Phaser.Math.Between(0, mapKeys.length - 1);
			const mapPos = map.get(mapKeys[index]);
			const gameObject = gameObjects[goIndex];
			const goWidthTotal = gameObject.displayWidth + mapPos.x;
			gameObject.setPosition(mapPos.x, mapPos.y);
			const isIntersect = this.isTextIntersect(gameObjects, gameObject, goWidthTotal);
			if (goWidthTotal < maxWidth && !isIntersect) {
				pickedIndex.push(mapKeys.splice(index, 1)[0]);
				goIndex++;
			}
		}
		return pickedIndex;
	}

	isTextIntersect (gameObjects: TextObject[], go: TextObject, w: number): boolean {
		for (const textInfo of gameObjects) {
			if (go.y === textInfo.y && textInfo.text !== go.text) {
				return this.intersectBetween(go, textInfo);
			}
		}
		return false;
	}

	intersectBetween (gameObject1: TextObject, gameObject2: TextObject): boolean {
		let result = false;
		const goWidth1 = gameObject1.displayWidth + gameObject1.x;
		const goWidth2 = gameObject2.displayWidth + gameObject2.x;
		if (gameObject2.x >= gameObject1.x && goWidth1 > gameObject2.x) {
			// console.log('overlap right: %s with %s', gameObject2.text, gameObject1.text);
			result = true;
		}
		else if (gameObject1.x < goWidth2 && goWidth2 <= goWidth1) {
			// console.log('overlap left: %s with %s', gameObject2.text, gameObject1.text);
			result = true;
		}
		else if (gameObject1.x >= gameObject2.x && goWidth1 <= goWidth2) {
			// console.log('overlap inner: %s with %s', gameObject2.text, gameObject1.text);
			result = true;
		}
		else if (gameObject1.x < gameObject2.x && goWidth2 < goWidth1) {
			// console.log('overlap outer: %s with %s', gameObject2.text, gameObject1.text);
			result = true;
		}
		return result;
	}

	createObjectLevel (objects: any): void {
		for (const objectInfo of objects) {
			let obstacle: Obstacle;
			switch (objectInfo.key) {
				case "class_boundary":
					for (const data of objectInfo.object) {
						if (objectInfo.isPhysic) {
							obstacle = new Obstacle(this, data.posX, data.posY, data.texture, data.name);
							this._boundaryWalls.add(obstacle);
							obstacle.setOrigin(data.originX, data.originY);
							obstacle.setDisplaySize(data.width, data.height);
							obstacle.setImmovable();
						}
					}
					break;
				case "class_interior":
					for (const data of objectInfo.object) {
						if (objectInfo.isPhysic) {
							obstacle = new Obstacle(this, data.posX, data.posY, data.texture, data.name);
							this._boundaryWalls.add(obstacle);
							obstacle.setOrigin(data.origin);
							obstacle.setImmovable();
						}
					}
					break;
				default:
					break;
			}
		}
	}

	registerColliders (relationData: unknown): Map<string, Phaser.Physics.Arcade.Collider> {
		const collidersMap = new Map<string, Phaser.Physics.Arcade.Collider>();
		if (Array.isArray(relationData)) {
			for (let i = 0; i < relationData.length; i++) {
				const node = relationData[i];
				const lengthRelation = node.gameObjects.length;
				for (let j = 0; j < lengthRelation; j++) {
					const id = `${node.id}:${j}`;
					const other = node.gameObjects[j];
					const collider = this.physics.add.collider(node.gameObject, other);
					collidersMap.set(id, collider);
				}
			}
		}
		return collidersMap;
	}

}
