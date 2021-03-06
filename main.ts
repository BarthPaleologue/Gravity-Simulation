/// <reference path="defs/babylon.d.ts" />

import { Engine } from "./components/engine";

export function createEnv(n: number) {
    let canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

    let simulation = new Engine(n, canvas);

    document.addEventListener("keydown", e => {
        switch (e.keyCode) {
            case 107: // +
                simulation.increaseSpeed();
                break
            case 109: // -
                simulation.decreaseSpeed();
                break
            case 84: // T
                simulation.toggleTrails();
            default:
        }
    });
}