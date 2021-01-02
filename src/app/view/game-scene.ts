import * as PIXI from 'pixi.js';

import AbstractScene from '../model/AbstractScene';
import Cell from './cell';
import { configImg } from '../../helpers/images-config';
import { configAtlas } from '../../helpers/atlas-config';
import { wallSize, brickSize } from '../../helpers/constants';
import Tank from './tank';

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
    const borderHorizontal = [0, 29];
    const borderLeft = [0, 1];
    const borderRight = [28, 1];

    const fieldCoordsArray = [
      [null, [borderHorizontal], null, null], // top line
      [[[3, 2]], [borderLeft, borderRight], [[]], null],
      [[[3, 4], [15, 1], [10, 3]], [borderLeft, borderRight], [], [[1, 2]]],
      [[[2, 3], [18, 3], [24, 2]], [borderLeft, borderRight], null, [[1, 1]]],
      [[[2, 3]], [borderLeft, borderRight], [[5, 18], [25, 3]], [[1, 1]]],
      [[[6, 2]], [borderLeft, borderRight], null, [[1, 4]]],
      [[[23, 2], [9, 1]], [borderLeft, borderRight, [25, 3]], null, [[1, 4]]],
      [[[2, 1], [15, 6], [9, 3]], [borderLeft, borderRight], [[6, 2]], null],
      [[[3, 1], [6, 2], [15, 6], [23, 1]], [borderLeft, borderRight, [10, 2]], null, null],
      [[[2, 1], [4, 1], [15, 3], [23, 1]], [borderLeft, borderRight], null, [[20, 3]]],
      [[[15, 3], [25, 3]], [borderLeft, borderRight, [4, 1]], null, [[20, 3]]],
      [[[15, 3]], [borderLeft, borderRight, [4, 1], [7, 2]], null, [[10, 5], [18, 7]]],
      [[[15, 3]], [borderLeft, borderRight], null, [[10, 5], [18, 7]]],
      [null, [borderLeft, borderRight], [[1, 3], [6, 14], [23, 5]], null],
      [[[6, 1]], [borderLeft, borderRight], null, [[1, 3]]],
      [[[6, 3], [12, 6], [20, 1]], [borderLeft, borderRight], null, [[1, 3]]],
      [[[4, 1], [8, 1], [20, 1], [17, 1], [24, 3]], [borderLeft, borderRight], null, [[1, 3]]],
      [[[4, 1], [8, 1], [22, 5]], [borderLeft, borderRight, [2, 2], [20, 1]], null, [[1, 1]]],
      [[[20, 1], [8, 1], [25, 1], [13, 3]], [borderLeft, borderRight], null, [[24, 1]]],
      [[[20, 1], [13, 1], [15, 1]], [borderLeft, borderRight], null, null],
      [null, [borderHorizontal], null, null], // bottom line
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

  drawTank() {
    const tank =
      new Tank(this.mainScene, configImg.TANK, configAtlas.APPEAR_ANIM, { x: 460, y: 684 });
    tank.init();
  }

  drawEnemyTank() {

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
    this.drawTank();
  }
}
