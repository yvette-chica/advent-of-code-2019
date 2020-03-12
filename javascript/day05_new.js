const fs = require('fs');
const input = fs.readFileSync('../input/day05', 'utf8')
    .trim().split(',').map(string => parseInt(string));
//const input = [1101,100,-1,4,0];
//const input = [3,0,4,0,99];

//console.log(process.argv);
// var flag = process.argv.indexOf('--user');
//
// console.log(flag+1);


//for (let i = 0; i < 10; i++) {
//    if (i%2) {
//        process.stdout.write(`${i} is an odd number. Can you enter another odd number? `);
//        process.stdin.on('data', function(answer){
//            const number = parseInt(answer.toString().trim());
//            if (number % 2) {
//                console.log(`Congrats! ${number} is odd`);
//            } else {
//                console.log(`Sorry, ${number} is not odd`);
//            }
//
//            process.exit();
//
//        });
//    }
//}
const userInput = parseInt(process.argv[2]);

const getParameterModes = (instruction) => {
    let stringInstruction = instruction.toString();
    while (stringInstruction.length < 5) {
        stringInstruction = '0' + stringInstruction;
    }
    const param1mode = parseInt(stringInstruction.slice(2,3));
    const param2mode = parseInt(stringInstruction.slice(1,2));
    const opcode = parseInt(stringInstruction.slice(3,5));

    return { param1mode, param2mode, opcode };
}

let pointer = 0;

const getParamValue = (param, mode) => {
    // Position mode: 0
    // Immediate mode: 1
    return mode === 1 ? param : input[param]; 
}

const applyOperation = (param1, param2, opcode) => {
    return opcode === 1 ? param1 + param2 : param1 * param2;
}

while (pointer < input.length) {
    let { opcode, param1mode, param2mode } = getParameterModes(input[pointer]);
    
    let param1 = input[pointer + 1];
    let param2 = input[pointer + 2];
    let storageLocation = input[pointer + 3];

    switch (opcode) {
        // Opcode 1:
        //      adds 2 numbers and stores result in the position of the 3rd parameter
        // Opcode 2:
        //      multiplies 2 numbers and stores result in the position of the 3rd parameter
        case 1:
        case 2:
            let param1value = getParamValue(param1, param1mode);
            let param2value = getParamValue(param2, param2mode);
            input[storageLocation] = applyOperation(param1value, param2value, opcode);       
            pointer += 4;
            break;
        // Opcode 3:
        //      takes integer as input and saves to position given by its only parameter
        //      3,50 takes input and stores to address 50 (only position mode)
        case 3:
            input[param1] = userInput;
            pointer += 2;
            break;
        // Optcode 4:
        //      outpus value of only parameter
        //      4,50 outputs value at address 50 (only position mode)
        case 4:
            console.log('output:', input[param1]);
            pointer += 2;
            break;
        // Opcode 99:
        //      program should immediately halt
        case 99:
            pointer = input.length;
            break;
        // There has been an error
        default:
            console.log('There has been an error');
            pointer = input.length;
    }
}

module.exports = { getParameterModes }

