const fs = require('fs');
const input = fs.readFileSync('../input/day08', 'utf8').replace(/\s/g, '');

const width = 25;
const height = 6;
const layerLength = width*height;
let start = 0;
let stop = layerLength;

const image = [];

/*
 * A layer looks like this:
[
    [1,2,0,2],
    [1,2,0,2],
    [1,2,0,2],
]
*/

const renderImage = layer => {
    // if 0 (black) or 2 (transparent) replace with a space
    layer.forEach(row => {
        let rowOutput = '';
        row.forEach(pixel => {
            rowOutput += pixel === 0 || pixel === 2 ? ' ' : '*';
        });
        console.log(rowOutput);
    })
    console.log('-------------------------');
}


while (stop <= input.length) {
    // Get currentLayer from input
    let currentLayer = [];
    const flatCurrentLayer = input.slice(start, stop).split('').map(char => parseInt(char));
    for (let r = 0; r < height; r++) {
        currentLayer.push([]);
        for (let c = 0; c < width; c++) {
            currentLayer[r][c] = flatCurrentLayer.shift();
        }
    }

    // Initial filling in of image
    if (!image.length) {
        image.push(...currentLayer);
    }

    // Compare currentLayer with image & replace transparent
    // pixels with colored ones
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            if (image[r][c] === 2) {
                image[r][c] = currentLayer[r][c];
            }
        }
    }

    renderImage(image);
    
    // next layer
    start = stop;
    stop += layerLength;
}

