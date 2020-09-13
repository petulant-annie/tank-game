import * as PIXI from 'pixi.js';

import AbstractScene from './AbstractScene';
import { configImg } from '../../helpers/images-config';
import { docWidth, docHeight, wallSize, brickSize } from '../../helpers/constants';
import { method } from 'lodash';

const Sprite = PIXI.Sprite;

export default class GameScene extends AbstractScene {
  container: PIXI.Container;
  gameScene: PIXI.Texture;
  mainScene: PIXI.Sprite;
  eagle: PIXI.Sprite;
  wallConcrete: PIXI.Texture;
  wallBrick: PIXI.Texture;
  eagleBase: PIXI.Texture;
  leavesTexture: PIXI.Texture;
  waterTexture: PIXI.Texture;
  wallSize: number;
  brickSize: number;
  wall: PIXI.Sprite;
  brick: PIXI.Sprite;

  constructor(container: PIXI.Container) {
    super(container);
    this.container = container;
  }

  initTexture() {
    this.gameScene = PIXI.Texture.from(configImg.GAME_BG);
    this.wallConcrete = PIXI.Texture.from(configImg.WALL);
    this.wallBrick = PIXI.Texture.from(configImg.BRICK);
    this.eagleBase = PIXI.Texture.from(configImg.EAGLE);
    this.leavesTexture = PIXI.Texture.from(configImg.LEAVES);
    this.waterTexture = PIXI.Texture.from(configImg.WATER);
  }

  drawWall(
    texture: PIXI.Texture,
    startPoint: number,
    exitCondition: number,
    increment: number,
    position: { x: number, y: number }) {
    for (let i = startPoint; i <= exitCondition; i += increment) {
      const wall = new Sprite(texture);
      wall.position.y = position.y === null ? i : position.y;
      wall.position.x = position.x === null ? i : position.x;
      this.mainScene.addChild(wall);
    }
  }

  drawGameFrame() {
    const texture = this.wallConcrete;
    this.drawWall(texture, 0, docHeight, wallSize, { x: 0, y: null });
    this.drawWall(texture, wallSize, docWidth, wallSize, { x: null, y: 0 });
    this.drawWall(
      texture,
      wallSize,
      docWidth - wallSize,
      wallSize,
      { x: null, y: docHeight - wallSize });
    this.drawWall(texture, wallSize, docHeight, wallSize, { x: docWidth - wallSize, y: null });
  }

  drawEagle() {
    this.eagle = new Sprite(this.eagleBase);
    this.eagle.position.y = docHeight - wallSize * 2;
    this.eagle.position.x = docWidth / 2;
    this.mainScene.addChild(this.eagle);
  }

  drawEagleFrame() {
    const texture = this.wallBrick;
    for (let i = 0; i <= brickSize; i += brickSize) {
      this.brick = new Sprite(texture);
      this.brick.position.y = docHeight - (wallSize * 2 + brickSize);
      this.brick.position.x = docWidth / 2 + i;
      this.mainScene.addChild(this.brick);
    }
    for (let i = 0; i <= brickSize; i += brickSize) {
      this.brick = new Sprite(texture);
      this.brick.position.y = docHeight - (wallSize * 3);
      this.brick.position.x = docWidth / 2 + i;
      this.mainScene.addChild(this.brick);
    }
    for (let i = 0; i <= wallSize + brickSize; i += brickSize) {
      this.brick = new Sprite(texture);
      this.brick.position.y = docHeight - 54 - i;
      this.brick.position.x = (docWidth / 2) + (brickSize * 2);
      this.mainScene.addChild(this.brick);
    }
    for (let i = 0; i <= wallSize + brickSize; i += brickSize) {
      this.brick = new Sprite(texture);
      this.brick.position.y = docHeight - 54 - i;
      this.brick.position.x = (docWidth / 2) + (brickSize * 3);
      this.mainScene.addChild(this.brick);
    }
    for (let i = 0; i <= wallSize + brickSize; i += brickSize) {
      this.brick = new Sprite(texture);
      this.brick.position.y = docHeight - 54 - i;
      this.brick.position.x = (docWidth / 2) - wallSize + brickSize;
      this.mainScene.addChild(this.brick);
    }
    for (let i = 0; i <= wallSize + brickSize; i += brickSize) {
      this.brick = new Sprite(texture);
      this.brick.position.y = docHeight - 54 - i;
      this.brick.position.x = (docWidth / 2) - wallSize;
      this.mainScene.addChild(this.brick);
    }
  }

  drawContentWall() {
    this.drawWall(
      this.wallBrick, wallSize * 2,
      docHeight - wallSize * 3,
      brickSize,
      { x: wallSize * 3, y: null });
    this.drawWall(
      this.wallBrick,
      wallSize * 2, docHeight - wallSize * 3,
      brickSize,
      { x: wallSize * 3 + brickSize, y: null })
  }

  remove() {
    this.container.removeChild(this.mainScene);
  }

  init() {
    this.initTexture();
    this.mainScene = new Sprite(this.gameScene);
    this.container.addChild(this.mainScene);
    this.drawGameFrame();
    this.drawEagle();
    this.drawEagleFrame();
    this.drawContentWall();
  }

}