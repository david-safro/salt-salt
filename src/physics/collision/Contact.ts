import { Constants } from 'consts.ts';
import { Body } from '@physics/Body.ts'

export function handleWallCollisions(body: Body) {
  if (body.position.y + body.radius > Constants.HEIGHT) {
    body.position.y = Constants.HEIGHT - body.radius;
    body.velocity.y *= -body.restitution;
  }

  if (body.position.y - body.radius < 0) {
    body.position.y = body.radius;
    body.velocity.y *= -body.restitution;
  }

  if (body.position.x + body.radius > Constants.WIDTH) {
    body.position.x = Constants.WIDTH - body.radius;
    body.velocity.x *= -body.restitution;
  }

  if (body.position.x - body.radius < 0) {
    body.position.x = body.radius;
    body.velocity.x *= -body.restitution;
  }
}

export function handleBodyCollision(bodyA: Body, bodyB: Body) {
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
