const fs = require('fs');
const puzzleInput = fs.readFileSync('../input/day02', 'utf8')
    .trim()
    .split(',')
    .map(string => parseInt(string))
const copy = [...puzzleInput];


const getOptcodes = (input) => {
    // The user inputs 2 numbers which will be put in position 1 & 2 of the puzzleInput
    const args = process.argv;
    if (args[2]) {
        input[1] = parseInt(args[2]);
    }
    if (args[3]) {
        input[2] = parseInt(args[3]);
    }

    for (let step = 0; step < input.length; step+=4) {
        //console.log('input', input);
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

    
    input.forEach((i, ind) => {
        //console.log(ind, i, copy[ind]);
        if (ind === copy[ind]) {
            console.log(ind+1);
        }
    });
    return input[0];
}

console.log(getOptcodes(puzzleInput));
