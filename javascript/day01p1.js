const fs = require('fs');
const puzzleInput = fs.readFileSync('../input/day01', 'utf8')
    .trim()
    .split('\n')
    .map(string => parseInt(string));

const getTotalFuelRequirement = (inputs) => {
    let totalFuelRequirement = 0;

    inputs.forEach(
        input => {
            totalFuelRequirement += (Math.floor(input/3)) - 2;
        }
    );

    return totalFuelRequirement;
}

console.log(getTotalFuelRequirement(puzzleInput));

