import * as PIXI from 'pixi.js';

import { docWidth, docHeight } from '../helpers/constants';
import { getCanvasEl } from './app-component';
import StartButton from './view/start-button';

export class Index {
  public sayHello(): string {
    return 'Hello Tank Game!';
  }
}

const doc = document.getElementById('game-wrapper');
const container = new PIXI.Container();

const app = new PIXI.Application({
  view: getCanvasEl('game'),
  width: docWidth,
  height: docHeight,
  antialias: true,
});

const { view, renderer } = app;

doc.appendChild(view);
app.stage.addChild(container);

const startButton =  new StartButton(container);
startButton.init();
startButton.handleClick();
