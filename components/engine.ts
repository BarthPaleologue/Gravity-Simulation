
import { Astre } from "./astre"

import { getRandom, randomVector } from "./tools";

export class Engine {
    bodies: Array<Astre> = [];
    stepsPerUpdate = 1;
    scene: BABYLON.Scene;

    constructor(n: number, canvas: HTMLCanvasElement) {

        let engine = new BABYLON.Engine(canvas, true);
        window.addEventListener("resize", () => engine.resize());

        this.scene = new BABYLON.Scene(engine);

        let light = new BABYLON.PointLight("L", new BABYLON.Vector3(0, 0, 0), this.scene);

        let camera = new BABYLON.FreeCamera("FC", new BABYLON.Vector3(-2, 3, -80), this.scene);
        camera.keysDown.push(83)
        camera.keysUp.push(90);
        camera.keysLeft.push(81)
        camera.keysRight.push(68)
        camera.attachControl(canvas);

        this.scene.activeCamera = camera;

        this.createBodies(n);

        this.scene.beforeRender = () => this.updateBodies();

        engine.runRenderLoop(() => this.scene.render());
    }

    createBodies(n: number) {
        for (let i = 0; i < n; i++) {
            this.bodies.push(new Astre(`Astre${i}`, getRandom(500, 1000), randomVector(30), randomVector(1e-2), randomVector(0), this.scene));
        }
    }

    computeForce(body1: Astre, body2: Astre): BABYLON.Vector3 {
        let distanceVector = body2.getPosition().subtract(body1.getPosition())
        let forceDirection = distanceVector.normalize();
        let squaredDistance = distanceVector.lengthSquared();

        let forceMagnitude = squaredDistance == 0 ? 0 : (1e-11 * body1.getMass() * body2.getMass()) / distanceVector.lengthSquared();

        let force = forceDirection.scale(forceMagnitude);

        return force;
    }

    updateBodies() {
        for (let i = 0; i < this.stepsPerUpdate; i++) {
            for (let astre of this.bodies) {
                let forceSomme = BABYLON.Vector3.Zero();
                for (let target of this.bodies) {
                    if (target != astre) forceSomme.addInPlace(this.computeForce(astre, target));
                }
                astre.computeNextStep(forceSomme);
            }
            for (let astre of this.bodies) {
                astre.update();
            }
        }
    }

    increaseSpeed() {
        this.stepsPerUpdate += 1;
    }
    decreaseSpeed() {
        if (this.stepsPerUpdate > 0) this.stepsPerUpdate -= 1;
    }
    toggleTrails() {
        for (let astre of this.bodies) {
            astre.toggleTrail();
        }
    }
} 