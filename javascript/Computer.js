class Computer {
    constructor(inputs, software, name, shouldLog=false) {
        this.inputs = inputs;
        this.output = null;
        this.opcode = '00';
        this.software = software;
        this.pointer = 0;
        this.paused = false;
        this.name = name;
        this.relativeBase = 0;
        this.shouldLog = shouldLog;
    }

    incrementPointer(incrementValue) {
        this.pointer += incrementValue;
    }

    getValue(mode, param, write=false) {
        let value;
        // Position mode
        if (mode === 0) value = this.software[param]; 

        // Immediate mode
        else if (mode === 1) value = param;

        // Relative mode
        else if (mode === 2) value = this.software[param + this.relativeBase]; 

        if (write) {
            value = mode === 2 ? param + this.relativeBase : param;
        }

        return value || 0;

    }

    addInput(input) {
        this.inputs.push(input);
    }

    executeInstruction(cs) {
        const instructions = {
            // Opcode 1:
            //      adds 2 numbers and stores result in the position of the 3rd parameter
            '01': cs => {
                const value1 = this.getValue(cs.param1mode, cs.param1);
                const value2 = this.getValue(cs.param2mode, cs.param2);
                const storageLocation = this.getValue(cs.param3mode, cs.param3, true);

                this.software[storageLocation] = value1 + value2;       
                this.incrementPointer(4);
            },
            // Opcode 2:
            //      multiplies 2 numbers and stores result in the position of the 3rd parameter
            '02': cs => {
                const value1 = this.getValue(cs.param1mode, cs.param1);
                const value2 = this.getValue(cs.param2mode, cs.param2);
                const storageLocation = this.getValue(cs.param3mode, cs.param3, true);

                this.software[storageLocation] = value1 * value2;       
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
                    this.shouldLog && console.log('input:', opcode3input);
                    
                    const storageLocation = this.getValue(cs.param1mode, cs.param1, true);
                    this.software[storageLocation] = opcode3input;
                    this.incrementPointer(2);
                }
            },
            // Optcode 4:
            //      outputs value of only parameter
            //      4,50 outputs value at address 50 (only position mode)
            '04': cs => {
                const value1 = this.getValue(cs.param1mode, cs.param1);
                this.output = value1;
                this.incrementPointer(2);
            },
            // Opcode 5:
            //      if the first parameter is non-zero, it sets the instruction pointer to the
            //      value from the second parameter. Otherwise, it does nothing.
            '05': cs => {
                const value1 = this.getValue(cs.param1mode, cs.param1);
                const value2 = this.getValue(cs.param2mode, cs.param2);
                if (value1 !== 0) this.pointer = value2;
                else this.incrementPointer(3);
            },
            // Opcode 6:
            //      if the first parameter is zero, it sets the instruction pointer to the
            //      value from the second parameter. Otherwise, it does nothing.
            '06': cs => {
                const value1 = this.getValue(cs.param1mode, cs.param1);
                const value2 = this.getValue(cs.param2mode, cs.param2);
                if (value1 === 0) this.pointer = value2;
                else this.incrementPointer(3);
            },
            // Opcode 7:
            //      if the first parameter is less than the second parameter, it stores 1 in
            //      the position given by the third parameter. Otherwise, it stores 0.
            '07': cs => {
                const value1 = this.getValue(cs.param1mode, cs.param1);
                const value2 = this.getValue(cs.param2mode, cs.param2);
                const storageLocation = this.getValue(cs.param3mode, cs.param3, true);
                if (value1 < value2) this.software[storageLocation] = 1;
                else this.software[storageLocation] = 0;
                this.incrementPointer(4);
            },
            // Opcode 8:
            //      if the first parameter is equal to the second parameter, it stores 1 in
            //      the position given by the third parameter. Otherwise, it stores 0.
            '08': cs => {
                const value1 = this.getValue(cs.param1mode, cs.param1);
                const value2 = this.getValue(cs.param2mode, cs.param2);
                const storageLocation = this.getValue(cs.param3mode, cs.param3, true);
                if (value1 === value2) this.software[storageLocation] = 1;
                else this.software[storageLocation] = 0;
                this.incrementPointer(4);
            },
            // Opcode 9:
            //      adjusts the relative base by the value of its only parameter. The                 
            //      relative base increases (or decreases, if the value is negative) by the
            //      value of the parameter
            '09': cs => {
                const value1 = this.getValue(cs.param1mode, cs.param1);
                this.relativeBase += value1;
                this.incrementPointer(2);
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
        const param3mode        = parseInt(stringInstruction.slice(0,1));
        const opcode            = stringInstruction.slice(3,5);

        const param1            = this.software[this.pointer + 1];
        const param2            = this.software[this.pointer + 2];
        const param3            = this.software[this.pointer + 3];

        return { param1mode, param2mode, param3mode, opcode, param1, param2, param3 };
    }

    runSoftware() {
        this.paused = false;
        while (this.pointer < this.software.length && !this.paused) {
             
            let currentState = this.getCurrentState();
            let { param1, param2, param3, param1mode, param2mode, param3mode } = currentState;
            this.opcode = currentState.opcode;

            if (this.shouldLog) {
                if (
                    this.opcode === '01' || this.opcode === '02' || this.opcode === '07'
                        || this.opcode === '08'
                ) {
                    console.log(this.opcode, `(${param1mode})`, param1, `(${param2mode})`, param2,  `(${param3mode})`, param3);
                } else if (
                    this.opcode === '03' || this.opcode === '04' || this.opcode === '09'
                ) {
                    console.log(this.opcode, `(${param1mode})`, param1, 'pointer', this.pointer);
                } else if (
                    this.opcode === '05' || this.opcode === '06'
                ) {
                    console.log(this.opcode,  `(${param1mode})`, param1, `(${param2mode})`, param2, 'pointer', this.pointer);
                } else {
                    console.log(this.opcode);
                }
                console.log('relativeBase', this.relativeBase);
                //console.log(this.software);
                console.log('');
            }

            this.executeInstruction(currentState);
        }
    }
}

module.exports = Computer;

