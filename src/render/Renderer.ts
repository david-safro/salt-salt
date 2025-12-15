import { Application, Graphics } from "pixi.js";
import { Body } from '@physics/Body.ts'

export class Render {
  app: Application;

  constructor() {
    this.app = new Application()
  }
  renderBody(body: Body) {
    const graphics = new Graphics();
    graphics.circle(0, 0, body.radius);
    graphics.fill({ color: this.getRandomColor() });
    graphics.position.set(body.position.x, body.position.y);
    this.app.stage.addChild(graphics);
    (body as any).graphics = graphics;
  }
  updateBody(body: Body) {
    const graphics = (body as any).graphics as Graphics;
    if (graphics) {
      graphics.position.set(body.position.x, body.position.y);
    }
  }
  getRandomColor(): number {
    // may move color scheme to beginning of file.
    const colors = [
      0xe74c3c,
      0x3498db,
      0x2ecc71,
      0xf39c12,
      0x9b59b6,
      0x1abc9c,
      0xe67e22,
      0xecf0f1,
    ];
    return colors[Math.floor(Math.random() * colors.length)]!;
  }
}