export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
export function randomVector(range) {
    return new BABYLON.Vector3(getRandom(-range, range), getRandom(-range, range), getRandom(-range, range));
}
export function randomColor() {
    return new BABYLON.Color3(Math.random(), Math.random(), Math.random());
}
