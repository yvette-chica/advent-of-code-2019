const fs = require('fs');
const puzzleInput = fs.readFileSync('../input/day03', 'utf8')
    .trim()
    .split('\n')

const getMinimumDistance = (stringPaths) => {
    const coordinates = {};
    const sharedCoordinates = []; 

    stringPaths.forEach(
        stringPath => {
            const path = stringPath.split(',')
            let currentX = 0;
            let currentY = 0;

            path.forEach(
                vector => {
                    const direction = vector.slice(0,1);
                    const magnitude = parseInt(vector.slice(1));

                    for (let step = 0; step < magnitude; step++) {
                        switch(direction) {
                            case 'U':
                                currentY ++;
                                break;
                            case 'D':
                                currentY --;
                                break;
                            case 'R':
                                currentX ++;
                                break;
                            case 'L':
                                currentX --;
                                break;
                        }

                        const coordinate = [currentX, currentY];
                        const coordKey = coordinate.join(',');

                        // Don't push when intersects with own path. Only other path
                        if (coordinates[coordKey] && coordinates[coordKey] !== stringPath) {
                            sharedCoordinates.push(coordinate); 
                        } else {
                            coordinates[coordKey] = stringPath;
                        }
                    }
                }
            )
        }
    );

    const manhattanDistances = sharedCoordinates.map(
        coordinate => Math.abs(coordinate[0]) + Math.abs(coordinate[1])
    );


    return Math.min(...manhattanDistances);
}

console.log(getMinimumDistance(puzzleInput));

module.exports = {
    getMinimumDistance,
};


