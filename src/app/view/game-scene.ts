import * as PIXI from 'pixi.js';

import AbstractScene from '../model/AbstractScene';
import Cell from './cell';
import { configImg } from '../../helpers/images-config';
import { wallSize, brickSize } from '../../helpers/constants';

const Sprite = PIXI.Sprite;

export default class GameScene extends AbstractScene {
  container: PIXI.Container;
  gameScene: PIXI.Texture;
  mainScene: PIXI.Sprite;
  wallSize: number;
  brickSize: number;

  constructor(container: PIXI.Container) {
    super(container);
  }

  drawGroup(type: number, rowIndex: number, start: number, amount: number) {
    const textures: any = {
      0: configImg.BRICK,
      1: configImg.WALL,
      2: configImg.WATER,
      3: configImg.LEAVES,
    };
    const step = type === 0 ? brickSize : wallSize;
    for (let i = start * wallSize; i < start * wallSize + amount * wallSize; i += step) {
      const position = { x: i, y: rowIndex * wallSize };
      const cell = new Cell(this.mainScene, textures[type], position);
      cell.init();
      if (type === 0) {
        const additionalCellPosition = { x: i, y: rowIndex * wallSize + brickSize };
        const additionalCell = new Cell(this.mainScene, textures[type], additionalCellPosition);
        additionalCell.init();
      }
    }
  }

  drawGameBackground() {
    const background = PIXI.Texture.from(configImg.GAME_BG);
    this.mainScene.addChild(new Sprite(background));
  }

  drawGameField() {
    const borderTopBottom = [0, 29];
    const borderLeft = [0, 1];
    const borderRight = [28, 1];

    const water1 = [5, 5];

    const fieldCoordsArray = [
      [null, [borderTopBottom], null, null],
      [null, [borderLeft, borderRight], [water1], null],
      [null, [borderLeft, borderRight], [water1], null],
      [null, [borderLeft, borderRight], [water1], null],
      [null, [borderLeft, borderRight], [water1], null],
      [null, [borderLeft, borderRight], [water1], null],
      [null, [borderLeft, borderRight], null, null],
      [[[1, 2], [15, 5]], [borderLeft, borderRight], null, null],
      [[[1, 2], [15, 5]], [borderLeft, borderRight], null, null],
      [[[15, 5]], [borderLeft, borderRight], null, null],
      [[[15, 5]], [borderLeft, borderRight], null, null],
      [[[15, 5]], [borderLeft, borderRight], null, null],
      [null, [borderLeft, borderRight], null, null],
      [null, [borderLeft, borderRight], null, null],
      [null, [borderLeft, borderRight], null, null],
      [null, [borderLeft, borderRight], null, null],
      [null, [borderLeft, borderRight], null, null],
      [null, [borderLeft, borderRight], null, null],
      [[[13, 3]], [borderLeft, borderRight], null, null],
      [[[13, 1], [15, 1]], [borderLeft, borderRight], null, null],
      [null, [borderTopBottom], null, null],
    ];

    fieldCoordsArray.forEach((row, rowIndex) => {
      row.forEach((type, typeIndex) => {
        if (type && type.length > 0) {
          type.forEach((group: any) => {
            this.drawGroup(typeIndex, rowIndex, group[0], group[1]);
          });
        }
      });
    });
  }

  drawEagle() {
    const eagle = new Cell(this.mainScene, configImg.EAGLE, { x: 504, y: 684 });
    eagle.init();
  }

  remove() {
    this.container.removeChild(this.mainScene);
  }

  init() {
    this.mainScene = new Sprite(this.gameScene);
    this.container.addChild(this.mainScene);
    this.drawGameBackground();
    this.drawGameField();
    this.drawEagle();
  }
}
