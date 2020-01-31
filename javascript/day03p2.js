const fs = require('fs');
const [path1, path2] = fs.readFileSync('../input/day03', 'utf8')
    .trim().split('\n');

// Small examples:
//const path1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
//const path2 = 'U62,R66,U55,R34,D71,R55,D58,R83';         //= 610 steps

//const path1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51';
//const path2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7';    // = 410 steps

const getMinimumDistance = (stringPaths) => {
    const coordinates = {};
    const sharedCoordinates = []; 

    stringPaths.forEach(
        stringPath => {
            const path = stringPath.split(',')
            let currentX = 0;
            let currentY = 0;
            let steps = 0;

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

                        steps++;

                        const coordinate = [currentX, currentY];
                        const coordKey = coordinate.join(',');

                        // If intersection is not with own path, push coordinate to sharedCoordinates
                        if (coordinates[coordKey]) {
                            if (!coordinates[coordKey][stringPath]) {
                                sharedCoordinates.push({
                                    coordinate,
                                }); 

                                coordinates[coordKey][stringPath] = {
                                    stringPath,
                                    steps: [steps],
                                };
                            } else {
                                coordinates[coordKey][stringPath].steps.push(steps);
                            }
                        } else {
                            //    
                            coordinates[coordKey] = {
                                [stringPath]: {
                                    stringPath,
                                    steps: [steps],
                                }
                            };
                        }
                    }
                }
            )
        }
    );

    const manhattanDistances = sharedCoordinates.map(
        sharedCoord => {
            return Math.abs(sharedCoord.coordinate[0]) + Math.abs(sharedCoord.coordinate[1]);
        }
    );

    const totalSteps = calculateTotalStops(sharedCoordinates, coordinates);

    return Math.min(...totalSteps);
}

const calculateTotalStops = (sharedCoordinates, coordinates) => {
    return sharedCoordinates.map(
        sharedCoord => {
            // console.log(coordinates[sharedCoord.coordinate.join(',')]);
            return Object.values(coordinates[sharedCoord.coordinate.join(',')]).map(
                coord => {
                   return coord.steps[0];
                }
            );
        }
    )
    .map(
        stepsPair => {
            return stepsPair[0] + stepsPair[1];
        }
    );
}

module.exports = {
    getMinimumDistance,
};

console.log(getMinimumDistance([path1, path2]));

