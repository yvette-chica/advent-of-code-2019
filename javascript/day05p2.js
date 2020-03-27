const fs = require('fs');
const Computer = require('./Computer');

const input = fs.readFileSync('../input/day05', 'utf8')
    .trim().split(',').map(string => parseInt(string));
/*
const input = [3,9,8,9,10,9,4,9,99,-1,8];
const input = [3,9,7,9,10,9,4,9,99,-1,8]
*/


const intcodeComputer = new Computer([], input, 'thermal air');

let output = 5;
while (intcodeComputer.opcode !== '99') {
    intcodeComputer.addInput(output); 
    console.log('running software...');
    intcodeComputer.runSoftware();
    output = intcodeComputer.output; 
}

console.log('output', output);

module.exports = () => output;
