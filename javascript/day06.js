const fs = require('fs');

const puzzleInput = fs.readFileSync('../input/day06', 'utf8').trim().split('\n');
/*
const sampleOrbitMap = [
    'C)D',
    'G)H',
    'D)E',
    'J)K',
    'E)F',
    'B)G',
    'D)I',
    'COM)B',
    'B)C',
    'E)J',
    'K)L',
];
*/

// Create adjacency list of orbits
AdjList = new Map();
sources = new Set();
destinations = new Set();

puzzleInput.forEach(orbit => {
    const [center, satillite] = orbit.split(')');
    sources.add(center);
    destinations.add(satillite);

    if (!AdjList.has(center)){
        AdjList.set(center, []);
    }
    if (!AdjList.has(satillite)){
        AdjList.set(satillite, []);
    }
    AdjList.get(center).push(satillite);
});

// determine the root of the tree by finding the source node that is
// not in the destination nodes
destinations.forEach(
    (value1, value2, wholeSet) => {
        sources.delete(value1);
    }
);
const [root] = sources;

let currentNode = root;
let previousNode;
let orbits = 0;

while (AdjList.size) {
    console.log('AdjList', AdjList);
    console.log('cuurentNode destinations', AdjList.get(currentNode));
    // check if the current node has any destination nodes
    if(!AdjList.get(currentNode).length) {
        // if it is, we've reached a node that is not getting orbited, delete it
        AdjList.delete(currentNode);
        if (AdjList.get(previousNode)) {
            // Also remove the node from the destinations of the previousNode
            const newDestinations = AdjList.get(previousNode).filter(node => node !== currentNode);
            AdjList.set(previousNode, newDestinations);
        }
        console.log(currentNode, 'deleted!');
        previousNode = null;
        currentNode = root;
    } else {
        previousNode = currentNode;
        currentNode = AdjList.get(currentNode)[0];
        console.log('new node', currentNode);
        orbits += 1;
        console.log('orbits', orbits);
    }
}

