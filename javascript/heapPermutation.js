// Generate the permutation for a given n (amount of elements) and a given array
function generate(n, arr, permutations) {
    // If only 1 element, just output the array
    if (n == 1) {
        permutations.push([...arr])
        return permutations;
    }

    for (var i = 0; i < n; i+= 1) {
        generate(n - 1, arr, permutations);

        // If n is even
        if (n % 2 == 0) {
            swap(arr, i, n - 1);
        } else {
            swap(arr, 0, n - 1);
        }
    }
}



function swap(arr, idxA, idxB) {
    var tmp = arr[idxA];
    arr[idxA] = arr[idxB];
    arr[idxB] = tmp;
}

const result = []
generate(3, [0,1,2], result);
console.log('result', result);

module.exports = generate;

