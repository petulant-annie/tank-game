export default abstract class AbstractScene {
  container: PIXI.Container;
  constructor(container: PIXI.Container) {
    this.container = container;
  }
  init() { }
  remove() { }
}
