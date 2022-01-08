const obj1 = {
    p1: 10,
    getP1: function () {
        const that = this;
        const fn1 = function () {
            return that.p1;
        }
        return fn1();
    }
};
console.log(obj1.getP1())


// or
// arrow function do not redefine scope of function
const obj2 = {
    p1: 10,
    getP1: function () {
        const fn1 =  () => {
            return this.p1;
        }
        return fn1();
    }
};
console.log(obj2.getP1())
