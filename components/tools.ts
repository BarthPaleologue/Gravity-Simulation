export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function randomVector(range: number) {
    return new BABYLON.Vector3(getRandom(-range, range), getRandom(-range, range), getRandom(-range, range));
}

export function randomColor() {
    return new BABYLON.Color3(Math.random(), Math.random(), Math.random());
}