import { Application, Graphics, Text } from "pixi.js";
import { Body } from "@physics/Body.ts";
import { Vec2 } from "@physics/math/Vec2.ts";

const WIDTH = 800;
const HEIGHT = 600;
const GRAVITY = new Vec2(0, 980);
const app = new Application();

const bodies: Body[] = [];

async function init() {
  await app.init({
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 0x1a1a2e,
    antialias: true,
  });

  const container = document.getElementById("game-container");
  if (container) {
    container.appendChild(app.canvas);
  }

  createBodies();

  app.ticker.add((ticker) => update(ticker.deltaTime / 60));

  app.canvas.addEventListener("click", (event) => {
    const rect = app.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    addBody(x, y);
  });
}

function createBodies() {
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * WIDTH;
    const y = Math.random() * 200 + 50;
    const radius = Math.random() * 15 + 10;
    const body = new Body(x, y, radius / 10, radius);
    body.setVelocity(
        Math.random() * 200 - 100,
        Math.random() * 100
    );

    bodies.push(body);
    const graphics = new Graphics();
    graphics.circle(0, 0, body.radius);
    graphics.fill({ color: getRandomColor() });
    graphics.position.set(body.position.x, body.position.y);
    app.stage.addChild(graphics);
    (body as any).graphics = graphics;
  }

  const infoText = new Text({
    text: "gay text test",
    style: {
      fontSize: 16,
      fill: 0xffffff,
    },
  });
  infoText.position.set(10, HEIGHT - 30);
  app.stage.addChild(infoText);
}

function addBody(x: number, y: number) {
  const radius = Math.random() * 15 + 10;
  const body = new Body(x, y, radius / 10, radius);
  body.setVelocity(
      Math.random() * 400 - 200,
      -Math.random() * 300 - 100
  );

  bodies.push(body);

  const graphics = new Graphics();
  graphics.circle(0, 0, body.radius);
  graphics.fill({ color: getRandomColor() });
  graphics.position.set(body.position.x, body.position.y);
  app.stage.addChild(graphics);

  (body as any).graphics = graphics;
}

function update(dt: number) {
  dt = Math.min(dt, 0.016);

  for (const body of bodies) {
    body.applyForce(GRAVITY.mul(body.mass));

    body.update(dt);

    handleWallCollisions(body);
    const graphics = (body as any).graphics as Graphics;
    if (graphics) {
      graphics.position.set(body.position.x, body.position.y);
    }
  }
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      handleBodyCollision(bodies[i]!, bodies[j]!);
    }
  }
}

function handleWallCollisions(body: Body) {
  if (body.position.y + body.radius > HEIGHT) {
    body.position.y = HEIGHT - body.radius;
    body.velocity.y *= -body.restitution;
  }

  if (body.position.y - body.radius < 0) {
    body.position.y = body.radius;
    body.velocity.y *= -body.restitution;
  }

  if (body.position.x + body.radius > WIDTH) {
    body.position.x = WIDTH - body.radius;
    body.velocity.x *= -body.restitution;
  }

  if (body.position.x - body.radius < 0) {
    body.position.x = body.radius;
    body.velocity.x *= -body.restitution;
  }
}

function handleBodyCollision(bodyA: Body, bodyB: Body) {
  const delta = bodyB.position.sub(bodyA.position);
  const distance = delta.length();
  const minDist = bodyA.radius + bodyB.radius;
  if (distance < minDist && distance > 0) {
    const normal = delta.normalize();
    const separation = (minDist - distance) / 2;
    bodyA.position.subMut(normal.mul(separation));
    bodyB.position.addMut(normal.mul(separation));

    const relativeVel = bodyB.velocity.sub(bodyA.velocity);
    const velAlongNormal = relativeVel.dot(normal);

    if (velAlongNormal > 0) return;
    const restitution = Math.min(bodyA.restitution, bodyB.restitution);
    const impulseScalar = -(1 + restitution) * velAlongNormal;
    const totalMass = bodyA.mass + bodyB.mass;
    const impulse = normal.mul(impulseScalar / totalMass);
    bodyA.velocity.subMut(impulse.mul(bodyB.mass));
    bodyB.velocity.addMut(impulse.mul(bodyA.mass));
  }
}

function getRandomColor(): number {
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

init();