import * as math from './math';
export default class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    get area() {
        return math.PI * math.pow(this.radius, 2);
    }
}
