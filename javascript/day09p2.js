const fs = require('fs');
const puzzleInput = fs.readFileSync('../input/day09', 'utf8')
    .trim().split(',').map(string => parseInt(string));
const Computer = require('./Computer');
const heapPermutation = require('./heapPermutation');


const example1 = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
const example2 = [1102,34915192,34915192,7,4,7,99,0];
const example3 = [104,1125899906842624,99];


const intcodeComputer = new Computer([2], puzzleInput, 'sample');
intcodeComputer.runSoftware();

console.log('output', intcodeComputer.output);

module.exports = () => intcodeComputer.output;
