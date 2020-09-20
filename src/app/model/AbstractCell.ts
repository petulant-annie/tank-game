export default class AbstractCell {
  sprite: PIXI.Sprite;
  image: string;
  constructor(sprite: PIXI.Sprite, image: string) {
    this.sprite = sprite;
    this.image = image;
  }
  onDestroy() { }
  onHit() { }
}
