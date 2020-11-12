import { randomColor } from "./tools";
export class Astre {
    constructor(name, mass, position, speed, acceleration, scene) {
        this._name = name;
        this._size = mass * 2 / 1000;
        this._color = randomColor();
        this._mesh = BABYLON.Mesh.CreateSphere(this._name, 32, this._size, scene);
        this._mesh.material = new BABYLON.StandardMaterial(`${name}Material`, scene);
        //@ts-ignore
        this._mesh.material.diffuseColor = this._color;
        this._mesh.position = position;
        this._mass = mass;
        this._acceleration = acceleration;
        this._speed = speed;
        this._position = position;
        this._newPosition = position;
        this._trajectory = new BABYLON.ParticleSystem(`${name}Trajectory`, 1000, scene);
        this._trajectory.particleTexture = new BABYLON.Texture("./textures/flare.png", scene);
        this._trajectory.emitter = this._mesh;
        this._trajectory.maxEmitPower = 0;
        this._trajectory.minEmitPower = 0;
        this._trajectory.emitRate = 30;
        this._trajectory.minSize = .5;
        this._trajectory.maxSize = .5;
        this._trajectory.maxLifeTime = 30;
        this._trajectory.color1 = new BABYLON.Color4(this._color.r, this._color.g, this._color.b, 1);
        this._trajectory.color2 = new BABYLON.Color4(this._color.r, this._color.g, this._color.b, 1);
        this._trajectory.start();
    }
    move(deplacement) {
        this._mesh.position.addInPlace(deplacement);
    }
    toggleTrail() {
        if (this._trajectory.layerMask > 0)
            this._trajectory.layerMask = 0;
        else
            this._trajectory.layerMask = 1;
        console.log(this._trajectory.layerMask);
    }
    getMass() {
        return this._mass;
    }
    getAcceleration() {
        return this._acceleration;
    }
    setAcceleration(acceleration) {
        this._acceleration = acceleration;
    }
    getSpeed() {
        return this._speed;
    }
    setSpeed(speed) {
        this._speed = speed;
    }
    getPosition() {
        return this._position;
    }
    setPosition(position) {
        this._newPosition = position;
    }
    computeNextStep(forces) {
        let dt = 1;
        this._acceleration = forces.scale(1 / this._mass);
        this._speed = forces.scale(dt).add(this._speed);
        this._newPosition = this._speed.scale(dt).add(this._position);
    }
    update() {
        this._position = this._newPosition;
        this._mesh.position = this._newPosition;
    }
}
