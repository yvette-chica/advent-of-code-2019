const fs = require('fs');

const puzzleInput = fs.readFileSync('../input/day06', 'utf8').trim().split('\n');
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

// Create adjacency list of orbits
AdjList = new Map();
sources = new Set();
destinations = new Set();

// Fill in AdjacencyMap
puzzleInput.forEach(orbit => {
    const [center, satillite] = orbit.split(')');
    sources.add(center);
    destinations.add(satillite);

    if (AdjList.has(center)){
        AdjList.get(center).push(satillite);
    } else {
        AdjList.set(center, [satillite]);
    }
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
    console.log('currentNode destinations', AdjList.get(currentNode));
    
    // the currentNode not a source node
    if (!AdjList.get(currentNode)) {
        if (AdjList.get(previousNode)) {
            // Remove the node from the destinations of the previousNode
            const newDestinations = AdjList.get(previousNode).filter(node => node !== currentNode);
            AdjList.set(previousNode, newDestinations);
            previousNode = null;
            currentNode = root;
        }
    // The currentNode no longer points to any nodes
    } else if(!AdjList.get(currentNode).length) {
        // Delete the empty source node
        AdjList.delete(currentNode);
        if (AdjList.get(previousNode)) {
            // Also remove the node from the destinations of the previousNode
            const newDestinations = AdjList.get(previousNode).filter(node => node !== currentNode);
            AdjList.set(previousNode, newDestinations);
        }
        console.log(currentNode, 'deleted!');
        previousNode = null;
        currentNode = root;
    // The currentNode points to destinations nodes
    } else {
        previousNode = currentNode;
        // Get first destination node and make it the new currentNode
        currentNode = AdjList.get(currentNode)[0];
        console.log('new currentNode', currentNode);
        // increment the number of orbits
        orbits += 1;
        console.log('orbits', orbits);
    }
}

