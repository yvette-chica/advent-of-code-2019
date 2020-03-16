// Helper functions
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

const getParamValue = (mode, paramImmediate, paramPosition) => {
    // Position mode: 0
    // Immediate mode: 1
    return mode === 1 ? paramImmediate : paramPosition; 
}

const applyOperation = (param1, param2, opcode) => {
    return opcode === 1 ? param1 + param2 : param1 * param2;
}


const intCodeComputer = (inputs, software) => {
    let pointer = 0;

    while (pointer < software.length) {
        let { opcode, param1mode, param2mode } = getParameterModes(software[pointer]);
        
        let param1 = software[pointer + 1];
        let param2 = software[pointer + 2];
        let storageLocation = software[pointer + 3];

        let param1value = getParamValue(param1mode, param1, software[param1]);
        let param2value = getParamValue(param2mode, param2, software[param2]);

        switch (opcode) {
            // Opcode 1:
            //      adds 2 numbers and stores result in the position of the 3rd parameter
            // Opcode 2:
            //      multiplies 2 numbers and stores result in the position of the 3rd parameter
            case 1:
            case 2:
                software[storageLocation] = applyOperation(param1value, param2value, opcode);       
                pointer += 4;
                break;

            // Opcode 3:
            //      takes integer as input and saves to position given by its only parameter
            //      3,50 takes input and stores to address 50 (only position mode)
            case 3:
                const opcode3input = inputs.shift();
                console.log('opcode 3 input:', opcode3input);
                software[param1] = opcode3input;
                pointer += 2;
                break;

            // Optcode 4:
            //      outpus value of only parameter
            //      4,50 outputs value at address 50 (only position mode)
            case 4:
                //console.log('pointer:', pointer);
                console.log('output:', software[param1]);
                return software[param1];
                pointer += 2;
                break;

            // Opcode 5:
            //      if the first parameter is non-zero, it sets the instruction pointer to the
            //      value from the second parameter. Otherwise, it does nothing.
            case 5:
                if (param1value !== 0) pointer = param2value;
                else pointer += 3;
                break;

            // Opcode 6:
            //      if the first parameter is zero, it sets the instruction pointer to the
            //      value from the second parameter. Otherwise, it does nothing.
            case 6:
                if (param1value === 0) pointer = param2value;
                else pointer += 3;
                break;

            // Opcode 7:
            //      if the first parameter is less than the second parameter, it stores 1 in
            //      the position given by the third parameter. Otherwise, it stores 0.
            case 7:
                if (param1value < param2value) software[storageLocation] = 1;
                else software[storageLocation] = 0;
                pointer += 4;
                break;

            // Opcode 8:
            //      if the first parameter is equal to the second parameter, it stores 1 in
            //      the position given by the third parameter. Otherwise, it stores 0.
            case 8:
                if (param1value === param2value) software[storageLocation] = 1;
                else software[storageLocation] = 0;
                pointer += 4;
                break;

            // Opcode 99:
            //      program should immediately halt
            case 99:
                pointer = software.length;
                break;

            // There has been an error
            default:
                console.log('opCode:', opCode)
                console.log('There has been an error');
                pointer = software.length;
        }
    }
}

module.exports = intCodeComputer;

