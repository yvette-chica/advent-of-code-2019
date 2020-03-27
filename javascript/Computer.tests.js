const intcodeComputerDays = [
    { number: '05', expected: [13346482, 12111395] },
    { number: '07', expected: [47064, 4248984] },
    { number: '09', expected: [3989758265, 76791] },
];

intcodeComputerDays.forEach(day => {
    day.expected.forEach((expected, index) => {
        const part = index+1;
        const actual = require(`./day${day.number}p${part}`)();

        if (expected === actual) {
            console.log(`Day ${day.number}, part ${part}: TEST PASSED`);
        } else {
            console.log(`ERROR Day ${day.number}, part ${part}: expected output ${expected} does not match actual output ${actual}`);
        }
    });
});

