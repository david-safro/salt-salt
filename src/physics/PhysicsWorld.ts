import { Constants } from 'consts.ts';
import { PhysicsConstants } from './PhysicsConstants';
import { handleWallCollisions, handleBodyCollision } from './collision/Contact';
import { Body } from "@physics/Body"
import { Render } from "@render/Renderer"



export class PhysicsWorld {
  bodies: Body[];
  renderer: Render;
  app: any; // idr the type for app sorry

  constructor(){
    this.bodies = [];
    this.renderer = new Render;
    this.app = this.renderer.app
  }

  createBodies() {
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * Constants.WIDTH;
      const y = Math.random() * 200 + 50;
      const radius = Math.random() * 15 + 10;
      const body = new Body(x, y, radius / 10, radius);
      body.setVelocity(
          Math.random() * 200 - 100,
          Math.random() * 100
      );
  
      this.bodies.push(body);
      this.renderer.renderBody(body)
    }
  }
  addBody(x: number, y: number) {
    const radius = Math.random() * 15 + 10;
    const body = new Body(x, y, radius / 10, radius);
    body.setVelocity(
      Math.random() * 400 - 200,
      -Math.random() * 300 - 100
    );
  
    this.bodies.push(body);
  
    this.renderer.renderBody(body)
  }
  update(dt: number) {
    dt = Math.min(dt, 0.016);

    for (const body of this.bodies) {
      body.applyForce(PhysicsConstants.GRAVITY.mul(body.mass));

      body.update(dt);

      handleWallCollisions(body);
      this.renderer.updateBody(body)
    }
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        handleBodyCollision(this.bodies[i]!, this.bodies[j]!);
      }
    }
  }
}