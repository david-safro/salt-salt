import { Text } from "pixi.js";
import { Render } from "@render/Renderer"
import { Body } from "@physics/Body.ts";
import { Vec2 } from "@physics/math/Vec2.ts";
import { PhysicsWorld } from "@physics/PhysicsWorld";

const WIDTH = 800;
const HEIGHT = 600;
const GRAVITY = new Vec2(0, 980);
const world = new PhysicsWorld;
// const renderer = world.renderer;
const app = world.app;

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

  world.createBodies();

  app.ticker.add((ticker) => world.update(ticker.deltaTime / 60));

  app.canvas.addEventListener("click", (event) => {
    const rect = app.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    world.addBody(x, y);
  });
}

init();