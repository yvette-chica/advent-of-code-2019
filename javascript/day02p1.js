const fs = require('fs');
const puzzleInput = fs.readFileSync('../input/day02', 'utf8')
    .trim()
    .split(',')
    .map(string => parseInt(string))

// replace position 1 with value 12 & position 2 with value 2
puzzleInput[1] = 12;
puzzleInput[2] = 2;


const getOptcodes = (input) => {
    for (let step = 0; step < input.length; step+=4) {
        if (input[step] === 99) {
            break;
        }
        const value1Loc = input[step + 1];
        const value2Loc = input[step + 2];

        const locationToSave = input[step + 3] 

        const value1 = input[value1Loc];
        const value2 = input[value2Loc];

        if (input[step] === 1) {
            input[locationToSave] = value1 + value2;
        } else {
            input[locationToSave] = value1 * value2;
        }
    }
    return input[0];
}

console.log(getOptcodes(puzzleInput));
