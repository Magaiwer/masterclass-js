import * as math from './math';
class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    get area() {
        return math.PI * math.pow(this.radius, 2);
    }
}
const circle = new Circle(10);
console.log(circle);
console.log(circle.area);
