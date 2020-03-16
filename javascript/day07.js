const fs = require('fs');
const puzzleInput = fs.readFileSync('../input/day07', 'utf8')
    .trim().split(',').map(string => parseInt(string));
const intCodeComputer = require('./intCodeComputer');
const heapPermutation = require('./heapPermutation');


const phaseSettingSequence = [0, 1, 2, 3, 4];
const settingSequencePermutations = [];

// provide input instruction first then previous output
heapPermutation(5, phaseSettingSequence, settingSequencePermutations);


const getThrusterOutput = (controllerSoftware, phaseSettingSequence) => {
    let output;

    for (let i=0; i < phaseSettingSequence.length; i++) {
        output = intCodeComputer([phaseSettingSequence[i], output || 0], controllerSoftware);
    }

    return output;
}

let maxThrusterSignal = 0;
settingSequencePermutations.forEach(settingSequence => {
    let thrusterOutput = getThrusterOutput(puzzleInput, settingSequence);
    if (thrusterOutput > maxThrusterSignal) maxThrusterSignal = thrusterOutput;
});


console.log('maxThrusterSignal', maxThrusterSignal);

