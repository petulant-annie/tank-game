import * as PIXI from 'pixi.js';
import AbstractCell from '../model/AbstractCell';

export default class Cell extends AbstractCell {
  texture: PIXI.Texture;
  position: { x: number, y: number };
  constructor(sprite: PIXI.Sprite, image: string, position: { x: number, y: number }) {
    super(sprite, image);
    this.texture = PIXI.Texture.from(this.image);
    this.position = position;
  }
  init() {
    const sprite = new PIXI.Sprite(this.texture);
    sprite.position.x = this.position.x;
    sprite.position.y = this.position.y;
    this.sprite.addChild(sprite);
  }
}
