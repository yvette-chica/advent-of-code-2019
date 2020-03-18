const fs = require('fs');
const input = fs.readFileSync('../input/day05', 'utf8')
    .trim().split(',').map(string => parseInt(string));
const Computer = require('./Computer');


const intcodeComputer = new Computer([], input, 'thermal air');

let output = 5;
while (intcodeComputer.opcode !== '99') {
    intcodeComputer.addInput(output); 
    console.log('running software...');
    intcodeComputer.runSoftware();
    output = intcodeComputer.output; 
}

console.log('output', output);

