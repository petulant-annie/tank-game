import * as PIXI from 'pixi.js';

import StartScene from './start-scene';
import GameScene from './game-scene';
import { configImg } from '../../helpers/images-config';

const Sprite = PIXI.Sprite;

export default class StartButton {
  container: PIXI.Container;
  startButton: PIXI.Texture;
  button: PIXI.Sprite;
  startScene: StartScene;
  gameScene: GameScene;

  constructor(container: PIXI.Container) {
    this.container = container;
  }

  createButton() {
    this.startButton = PIXI.Texture.from(configImg.BUTTON_START);
    this.button = new Sprite(this.startButton);
    this.button.scale.set(1.2);
    this.button.position.set(355, 539);
    this.button.interactive = true;
    this.button.cursor = 'pointer';
  }

  init() {
    this.startScene = new StartScene(this.container);
    this.startScene.init();
    this.createButton();
    this.container.addChild(this.button);
  }

  handleClick() {
    this.button.on('mousedown', () => {
      this.container.removeChild(this.button);
      this.startScene.remove();
      this.gameScene = new GameScene(this.container);
      this.gameScene.init();
    });
  }

}
