const fs = require('fs');
const input = fs.readFileSync('../input/day08', 'utf8').replace(/\s/g, '');
//.trim().split(',').map(string => parseInt(string));

const width = 25;
const height = 6;
const length = width*height;
const layers = [];
const fewestZeros = {};
let start = 0;
let stop = length;
let currentLayer;

// Helper functions
const getZeroCount = string => {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === '0') count += 1;
    }
    return count;
}


while (stop < input.length) {
    // Get the layer
    currentLayer = input.slice(start, stop);
    
    // Set Initial fewest 0 digits layer
    if (!layers.length) {
        fewestZeros.number = getZeroCount(currentLayer);
        fewestZeros.index = 0;
    }

    // Add currentLayer to the layers array
    layers.push(currentLayer);

    // See if currentLayer has fewer zeros than previous layers
    let numberOfZeros = getZeroCount(currentLayer);
    if (numberOfZeros < fewestZeros.number) {
        fewestZeros.number = numberOfZeros;
        fewestZeros.index = layers.length - 1;
    }

    // Next layer
    start = stop;
    stop += length;
}

const fewZeroLayer = layers[fewestZeros.index];
let numOfOne = 0;
let numOfTwo = 0;

// Get number of 1's and 2's in the layer with fewest 0's
for (let i=0; i < fewZeroLayer.length; i++) {   
    if (fewZeroLayer[i] === '1') numOfOne += 1;
    else if (fewZeroLayer[i] === '2') numOfTwo += 1;
}

// Multiply them together
console.log('ones times twos:', numOfOne*numOfTwo);

