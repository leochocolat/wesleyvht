// Vendor
import Vector from 'victor';

// Utils
import easings from './easings';
import math from './math';
import number from './number';

export default class Particle {
    constructor(options = {}) {
        this._root = options.root;
        this._image = options.image;
        this._size = options.size;
        this._maxOpacity = options.opacity;
        this._position = options.position ? Vector.fromObject(options.position) : new Vector(0, 0);
        this._velocity = new Vector(this.getRandomArbitrary(-1, 1), this.getRandomArbitrary(-2, -1));
        this._acceleration = new Vector(0, 0);
        this._randomSteering = new Vector(0, 0);
        this._edgeRepulsionSteering = new Vector(0, 0);
        this._rotation = { target: 0, current: 0 };
        this._maxLife = this.getRandomArbitrary(40, 80);
        this._life = 0;
        this._perception = 30;
        this._scale = 1;
        this._maxForce = 1;
        this._opacity = 1;
        this._isDead = false;
    }

    /**
     * Getters & Setters
     */
    get position() {
        return this._position;
    }

    get isDead() {
        return this._isDead;
    }

    /**
     * Public
     */
    draw(ctx) {
        ctx.save();

        ctx.globalAlpha = this._opacity * this._maxOpacity;

        ctx.translate(this._position.x, this._position.y);
        ctx.rotate(this._rotation.current);
        ctx.scale(this._scale, this._scale);

        ctx.drawImage(this._image, -this._size / 2, -this._size / 2, this._size, this._size);

        ctx.restore();
    }

    update() {
        if (this._isDead) return;

        this.updateOpacity();
        this.updateRotation();
        this.updateScale();

        this._acceleration.x = 0;
        this._acceleration.y = 0;

        this.steerRandomly();
        this.steerAwayFromBounds();

        this._position.add(this._velocity);
        this._velocity.add(this._acceleration);

        this._life++;

        this._isDead = this._life > this._maxLife;
    }

    /**
     * Private
     */
    updateOpacity() {
        let lifeProgress = this._life / this._maxLife;
        lifeProgress = number.map(lifeProgress, 0, 1, 0, 2) - 1;

        if (lifeProgress > 0) {
            this._opacity = easings.easeInCirc(1 - lifeProgress);
            this._opacity = Math.max(0, 1 - lifeProgress);
        };
    }

    updateScale() {
        let lifeProgress = this._life / this._maxLife;
        lifeProgress = number.map(lifeProgress, 0, 1, 0, 2) - 1;

        if (lifeProgress > 0) {
            this._scale = easings.easeInCirc(1 - lifeProgress);
            this._scale = 1 - lifeProgress;
        };

        this._scale = math.clamp(this._scale, 0.5, 1);
    }

    steerRandomly() {
        // Random force
        const force = 1.5;
        this._randomSteering.x = this.getRandomArbitrary(-force, force);
        this._randomSteering.y = this.getRandomArbitrary(-0.5, 0);

        this._acceleration.add(this._randomSteering);
    }

    steerAwayFromBounds() {
        this._edgeRepulsionSteering.x = 0;

        const width = this._root.contactCardBounds.width;
        const left = this._root.contactCardBounds.x;
        const right = this._root.contactCardBounds.x + width;

        const distanceLeft = this._position.x - left;
        const distanceRight = right - this._position.x;

        const maxForce = 0.5;

        if (distanceLeft <= this._perception) {
            const force = (1 - distanceLeft / width) * maxForce;
            this._edgeRepulsionSteering.x = force;
        }

        if (distanceRight <= this._perception) {
            const force = (1 - distanceRight / width) * maxForce;
            this._edgeRepulsionSteering.x = -force;
        }

        this._acceleration.add(this._edgeRepulsionSteering);
    }

    updateRotation() {
        // this._rotation.target = (this._acceleration.angle() * Math.random() * 1) + Math.PI / 2;
        this._rotation.target = this._velocity.angle() + Math.PI / 2 + this.getRandomArbitrary(-Math.PI / 2, Math.PI / 2);
        this._rotation.current = math.lerp(this._rotation.current, this._rotation.target, 0.1);
    }

    /**
     * Utils
     */
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}
