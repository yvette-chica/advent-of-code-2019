const fs = require('fs');
const input = fs.readFileSync('../input/day05', 'utf8')
    .trim().split(',').map(string => parseInt(string));
//const input = [1101,100,-1,4,0];
//const input = [3,0,4,0,99];

const getOptcodes = (diagnostic, inputInstruction) => {
    let step = 0;
    let increase;
    let opCodeInput = inputInstruction;
    console.log('opCodeInput', opCodeInput);
    console.log('start diagnostic', diagnostic);
    
    while ( step < diagnostic.length) {
        // Determine Opcode and modes of parameters
        const {
            opCode,
            param1mode,
            param2mode,
            param3mode,
        } = normalizeInstructions(diagnostic[step]);

        let value1 = getValue({
            diagnostic,
            mode: param1mode,
            paramLocation: step+1,
        }); 

        let value2;
            
        switch (opCode) {
            case 99:
                console.log('opCode 99. Exit program;');
                step = diagnostic.length;
                break;

            case 1:
            case 2:
               value2 = getValue({
                   diagnostic,
                   mode: param2mode,
                   paramLocation: step+2,
               }); 

                const calculatedValue = opCode === 1 ? value1+value2 : value1*value2;
                const diagnosticLocation = getLocation({
                    diagnostic,
                    mode: param3mode,
                    paramLocation: step+3,
                });

                diagnostic[diagnosticLocation] = calculatedValue;
                increase = 4;
                break;

            case 3:
                diagnostic[value1] = opCodeInput;

                console.log('opCode 3');
                console.log('paramValue', value1);
                increase = 2;
                break;

            case 4:
                console.log('opCode 4 output:', value1);
                increase = 2;
                break;
        }
    
        //console.log('diagnostic', diagnostic);
        step += increase;
    }
}

const getValue = ({ mode, paramLocation, diagnostic }) => {
    const paramValue = diagnostic[paramLocation];
    return mode === 0 ? diagnostic[paramValue] : paramValue; 

}

const getLocation = ({ mode, paramLocation, diagnostic }) => {
    const paramValue = diagnostic[paramLocation];
    return mode === 0 ? paramValue : paramLocation;
}

// Normalize instructions. Returns object like this:
// {
//      opcode: 01,
//      param1: 0,
//      param2: 1,
//      param3: 0,
// }
const normalizeInstructions = instruction => {
    let stringInstructions = instruction.toString();

    while (stringInstructions.length < 5) {
        stringInstructions = '0' + stringInstructions;
    }
    
    //console.log('stringInst', stringInstructions);
    const normalized = {}
    normalized.opCode = parseInt(stringInstructions.slice(3));
    normalized.param1mode = parseInt(stringInstructions.slice(2,3));

    switch (normalized.opCode) {
        case 1:
        case 2:
            normalized.param2mode = parseInt(stringInstructions.slice(1,2));
            normalized.param3mode = parseInt(stringInstructions.slice(0,1));
        break;
    }

    return normalized;
}



console.log(getOptcodes(input, 1));

module.exports = {
    normalizeInstructions,
};
