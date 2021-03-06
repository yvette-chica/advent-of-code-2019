const fs = require('fs');
const puzzleInput = fs.readFileSync('../input/day07', 'utf8')
    .trim().split(',').map(string => parseInt(string));
const Computer = require('./Computer');
const heapPermutation = require('./heapPermutation');


const phaseSettingSequence = [0, 1, 2, 3, 4];
const settingSequencePermutations = [];

const getThrusterOutput = (controllerSoftware, phaseSettingSequence) => {
    let output = 0;
    const amplifiers = phaseSettingSequence.map((sequence, ind) => {
        return new Computer([sequence], [...controllerSoftware], `Amp${ind}`);
    });

    let i=0;
    while (amplifiers[i].opcode !== '99') {
        amplifiers[i].addInput(output); 
        amplifiers[i].runSoftware();
        output = amplifiers[i].output;
        if (i === phaseSettingSequence.length-1) {
            i = 0;
        } else {
            i++;
        }
    }

    return output;
}

// Get all possible phase setting sequences
heapPermutation(5, phaseSettingSequence, settingSequencePermutations);

let maxThrusterSignal = 0;
settingSequencePermutations.forEach(settingSequence => {
    let thrusterOutput = getThrusterOutput(puzzleInput, settingSequence);
    if (thrusterOutput > maxThrusterSignal) maxThrusterSignal = thrusterOutput;
});


console.log('maxThrusterSignal', maxThrusterSignal);

module.exports = () => maxThrusterSignal;

