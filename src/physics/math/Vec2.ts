export class Vec2 {
    constructor(public x: number = 0, public y: number = 0) {}

    static zero(): Vec2 {
        return new Vec2(0, 0);
    }

    static from(x: number, y: number): Vec2 {
        return new Vec2(x, y);
    }

    add(other: Vec2): Vec2 {
        return new Vec2(this.x + other.x, this.y + other.y);
    }

    sub(other: Vec2): Vec2 {
        return new Vec2(this.x - other.x, this.y - other.y);
    }

    mul(scalar: number): Vec2 {
        return new Vec2(this.x * scalar, this.y * scalar);
    }

    div(scalar: number): Vec2 {
        return new Vec2(this.x / scalar, this.y / scalar);
    }

    addMut(other: Vec2): this {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    subMut(other: Vec2): this {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    mulMut(scalar: number): this {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    lengthSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    normalize(): Vec2 {
        const len = this.length();
        if (len === 0) return Vec2.zero();
        return this.div(len);
    }

    dot(other: Vec2): number {
        return this.x * other.x + this.y * other.y;
    }

    cross(other: Vec2): number {
        return this.x * other.y - this.y * other.x;
    }

    clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }

    set(x: number, y: number): this {
        this.x = x;
        this.y = y;
        return this;
    }

    copy(other: Vec2): this {
        this.x = other.x;
        this.y = other.y;
        return this;
    }

    distance(other: Vec2): number {
        return this.sub(other).length();
    }

    toString(): string {
        return `Vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
}