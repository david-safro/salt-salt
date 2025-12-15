import { Vec2 } from "@physics/math/Vec2.ts";

export class Body {
    position: Vec2;
    velocity: Vec2;
    acceleration: Vec2;
    mass: number;
    radius: number;
    restitution: number;

    constructor(
        x: number = 0,
        y: number = 0,
        mass: number = 1,
        radius: number = 10
    ) {
        this.position = new Vec2(x, y);
        this.velocity = Vec2.zero();
        this.acceleration = Vec2.zero();
        this.mass = mass;
        this.radius = radius;
        this.restitution = 0.8;
    }

    applyForce(force: Vec2): void {
        const acceleration = force.div(this.mass);
        this.acceleration.addMut(acceleration);
    }

    update(dt: number): void {
        this.velocity.addMut(this.acceleration.mul(dt));

        this.position.addMut(this.velocity.mul(dt));

        this.acceleration.set(0, 0);
    }

    setPosition(x: number, y: number): void {
        this.position.set(x, y);
    }

    setVelocity(x: number, y: number): void {
        this.velocity.set(x, y);
    }
}