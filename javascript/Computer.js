class Computer {
    constructor(inputs, software, name) {
        this.inputs = inputs;
        this.output = null;
        this.opcode = '00';
        this.software = software;
        this.pointer = 0;
        this.paused = false;
        this.name = name;
    }

    incrementPointer(incrementValue) {
        this.pointer += incrementValue;
    }

    getParamValue(mode, paramImmediate, paramPosition) {
        // Position mode: 0
        // Immediate mode: 1
        return mode === 1 ? paramImmediate : paramPosition; 
    }

    addInput(input) {
        this.inputs.push(input);
    }

    executeInstruction(cs) {
        const instructions = {
            // Opcode 1:
            //      adds 2 numbers and stores result in the position of the 3rd parameter
            '01': cs => {
                this.software[cs.storageLocation] = cs.param1value + cs.param2value;       
                this.incrementPointer(4);
            },
            // Opcode 2:
            //      multiplies 2 numbers and stores result in the position of the 3rd parameter
            '02': cs => {
                this.software[cs.storageLocation] = cs.param1value * cs.param2value;       
                this.incrementPointer(4);
            },
            // Opcode 3:
            //      takes integer as input and saves to position given by its only parameter
            //      3,50 takes input and stores to address 50 (only position mode)
            '03': cs => {
                if (!this.inputs.length) {
                    this.paused = true;
                } else {
                  const opcode3input = this.inputs.shift();
                  this.software[cs.param1] = opcode3input;
                  this.incrementPointer(2);
                }
            },
            // Optcode 4:
            //      outpus value of only parameter
            //      4,50 outputs value at address 50 (only position mode)
            '04': cs => {
                this.output = this.software[cs.param1];
                this.incrementPointer(2);
            },
            // Opcode 5:
            //      if the first parameter is non-zero, it sets the instruction pointer to the
            //      value from the second parameter. Otherwise, it does nothing.
            '05': cs => {
                if (cs.param1value !== 0) this.pointer = cs.param2value;
                else this.incrementPointer(3);
            },
            // Opcode 6:
            //      if the first parameter is zero, it sets the instruction pointer to the
            //      value from the second parameter. Otherwise, it does nothing.
            '06': cs => {
                if (cs.param1value === 0) this.pointer = cs.param2value;
                else this.pointer += 3;
            },
            // Opcode 7:
            //      if the first parameter is less than the second parameter, it stores 1 in
            //      the position given by the third parameter. Otherwise, it stores 0.
            '07': cs => {
                if (cs.param1value < cs.param2value) this.software[cs.storageLocation] = 1;
                else this.software[cs.storageLocation] = 0;
                this.incrementPointer(4);
            },
            // Opcode 8:
            //      if the first parameter is equal to the second parameter, it stores 1 in
            //      the position given by the third parameter. Otherwise, it stores 0.
            '08': cs => {
                if (cs.param1value === cs.param2value) this.software[cs.storageLocation] = 1;
                else this.software[cs.storageLocation] = 0;
                this.incrementPointer(4);
            },
            // Opcode 99:
            //      program should immediately halt
            '99': cs => {
                this.pointer = this.software.length;
                this.paused = true;
            },
        };
        instructions[cs.opcode](cs);
    }


    getCurrentState() {
        let stringInstruction = this.software[this.pointer].toString();
        while (stringInstruction.length < 5) {
            stringInstruction = '0' + stringInstruction;
        }
        const param1mode        = parseInt(stringInstruction.slice(2,3));
        const param2mode        = parseInt(stringInstruction.slice(1,2));
        const opcode            = stringInstruction.slice(3,5);

        const param1            = this.software[this.pointer + 1];
        const param2            = this.software[this.pointer + 2];
        const storageLocation   = this.software[this.pointer + 3];

        const param1value = this.getParamValue(param1mode, param1, this.software[param1]);
        const param2value = this.getParamValue(param2mode, param2, this.software[param2]);

        return { param1mode, param2mode, opcode, param1, param2, storageLocation,
            param1value, param2value };
    }

    runSoftware() {
        this.paused = false;
        while (this.pointer < this.software.length && !this.paused) {
             
            let currentState = this.getCurrentState();
            let {param1, param2, storageLocation} = currentState;
            this.opcode = currentState.opcode;
            this.executeInstruction(currentState);
        }
    }
}

module.exports = Computer;

