import * as PIXI from 'pixi.js';
import AbstractCell from '../model/AbstractCell';

export default class BrickCell extends AbstractCell {
  texture: PIXI.Texture;
  position: { x: number, y: number };
  constructor(sprite: PIXI.Sprite, image: string, position: { x: number, y: number }) {
    super(sprite, image);
    this.texture = PIXI.Texture.from(this.image);
    this.position = position;
  }
  init() {
    const a = new PIXI.Sprite(this.texture);
    a.position.x = this.position.x;
    a.position.y = this.position.y;
    this.sprite.addChild(a);
  }
}
