'use strict';

const guy1 = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    BMI: 0,
    calcBMI() {
        this.BMI = this.mass / this.height ** 2;
        return this.BMI;
    }
}
const guy2 = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    BMI: 0,
    calcBMI() {
        this.BMI = this.mass / this.height ** 2;
        return this.BMI;
    }
}

guy1.calcBMI();
guy2.calcBMI();

if (guy1.BMI > guy2.BMI) {
    console.log(
        `${guy1.fullName}'s BMI (${guy1.BMI}) is higher than ${guy2.fullName}'s (${guy2.BMI})`
    );
} else if (guy2.BMI > guy1.BMI) {
    console.log(`${guy2.fullName}'s BMI (${guy2.BMI}) is higher than ${guy1.fullName}'s (${guy1.BMI})`);
} else {
    console.log(`Both ${guy1.fullName} and ${guy2.fullName} have the same BMI (${guy1.BMI})`);
}