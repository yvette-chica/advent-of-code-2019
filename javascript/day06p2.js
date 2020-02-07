const fs = require('fs');

const puzzleInput = fs.readFileSync('../input/day06', 'utf8').trim().split('\n');
const sampleOrbitMap = [
    'COM)B',
    'B)C',
    'C)D',
    'D)E',
    'E)F',
    'B)G',
    'G)H',
    'D)I',
    'E)J',
    'J)K',
    'K)L',
    'K)YOU',
    'I)SAN',
];

class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    neighbors(nodeId) {
        if (this.edges.length <= nodeId) {
            return [];
        } else {
            return this.edges[nodeId];
        }
    }

    nodeName(nodeId) {
        if (this.validNode(nodeId)) {
            return this.nodes[nodeId];
        }
        return console.log(node, 'is not a valid node');
    }

    addNode(nodeName) {
        const { nodeId, nodeExists } = this.lookupNode(nodeName);
        console.log({nodeId});
        console.log({nodeExists});

        if (nodeExists) {
            return nodeId;
        }

        const newNodeId = this.nodes.length;
        console.log({newNodeId});
        this.nodes.push(nodeName)
        this.edges.push([])
        return newNodeId;
    }

    lookupNode(nodeName) {
        let nodeId;
        let nodeExists;
        console.log({nodeName});
        console.log('nodes', this.nodes);
        for (let i = 0; i < this.nodes.length; i++) {
            console.log('currentNode', this.nodes[i]);
            if (this.nodes[i] === nodeName) {
                return { nodeId: i, nodeExists: true };
            }
        }
        return { nodeId: 0, nodeExists: false }
    }

    validNode(nodeId) {
        return nodeId >= 0 && nodeId < this.nodes.length;
    }

    hasEdge(node1, node2) {
        if (!this.validNode(node1)) {
            return false;
        }

        for (let i = 0; i < this.edges[node1].length; i++) {
            if (i === node2) {
                return true;
            }
            return false;
        }
    }

    addEdge(node1, node2) {
        if (!this.validNode(node1) || !this.validNode(node2)) {
            return;
        }
        if (this.hasEdge(node1, node2)) {
            console.log('edge', node1, node2, 'exists');
            return;
        }
        this.edges[node1].push(node2);
        this.edges[node2].push(node1);
    }

    getShortestPathLength(aName, bName) {
        const path = this.getShortestPath(aName, bName);
        if (path.length) return path.length - 3;
        else return 0;
    }

    getShortestPath(aName, bName) {
        const { nodeId: a, nodeExists: nodeAExists } = this.lookupNode(aName);
        const { nodeId: b, nodeExists: nodeBExists } = this.lookupNode(bName);

        if (!nodeAExists || !nodeBExists) {
            return [];
        }

        const nodeQueue = [];
        const visitedNodes = {};

        nodeQueue.push(a);
        visitedNodes[a] = {previousNode: null, isVisited: false} 

        while (nodeQueue.length > 0) {
            const head = nodeQueue.shift();
            if (!visitedNodes[head].isVisited) {
                visitedNodes[head].isVisited = true;
                if (head === b) {
                    const path = [];

                    for (let i = b; i !== a; i = visitedNodes[i].previousNode) {
                        path.push(i);
                    }
                    path.push(a);
                    return path;
                } else {
                    const nodeNeighbors = newGraph.neighbors(head);
                    nodeNeighbors.forEach(neighbor => {
                        if (!visitedNodes[neighbor]) {
                            visitedNodes[neighbor] = { previousNode: head, isVisited: false };
                            nodeQueue.push(neighbor);
                        }
                    });
                }
            }
        }
    }
}

// Fill in new graph
const newGraph = new Graph();
puzzleInput.forEach(orbit => {
    const [center, satillite] = orbit.split(')');
    const centerId = newGraph.addNode(center); 
    const satilliteId = newGraph.addNode(satillite); 

    newGraph.addEdge(centerId, satilliteId);
});
console.log(newGraph.getShortestPathLength('YOU', 'SAN'));

