import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import { configAtlas } from '../../helpers/atlas-config';

const loader = PIXI.Loader.shared;

export default class Tank {
  sprite: PIXI.Sprite;
  image: string;
  animation: string;
  texture: PIXI.Texture;
  position: { x: number, y: number };
  sprites: any;
  constructor(
    sprite: PIXI.Sprite,
    image: string,
    animation: string,
    position: { x: number, y: number },
  ) {
    this.sprite = sprite;
    this.image = image;
    this.animation = animation;
    this.position = position;
    this.sprites = {};
  }

  createAnimation() {
    const sheet = PIXI.loader.resources[this.animation];
    const sprite = new PIXI.Sprite(sheet.texture);
    sprite.position.x = this.position.x;
    sprite.position.y = this.position.y;
    this.sprite.addChild(sprite);

  }

  init() {

    loader
      .add('appear', configAtlas.APPEAR_ANIM)
      .pre(this.createAnimation)
      .load((loader, resources) => {
        this.sprites.appear = new PIXI.TilingSprite(resources.appear.texture);
      });
  }
}
