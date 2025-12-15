import { Application, Assets, Container, Sprite } from 'pixi.js';

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: '#00000000', width: 800, height: 600});

  // Append the application canvas to the document body
  document.getElementById("app")!.appendChild(app.canvas);
})();