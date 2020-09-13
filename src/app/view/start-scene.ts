import * as PIXI from 'pixi.js';
import { configImg } from '../../helpers/images-config';
import AbstractScene from './AbstractScene';

const Sprite = PIXI.Sprite;

export default class StartScene extends AbstractScene {
  startScreen: PIXI.Texture;
  start: PIXI.Sprite;

  constructor(container: PIXI.Container) {
    super(container);
    this.container = container;
  }

  init() {
    this.startScreen = PIXI.Texture.from(configImg.START_SCREEN);
    this.start = new Sprite(this.startScreen);
    this.start.scale.set(1.2);
    this.container.addChild(this.start);
  }

  remove(): void {
    this.container.removeChild(this.start);
  }
}
