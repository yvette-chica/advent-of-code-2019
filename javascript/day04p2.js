// get puzzle input which is a range, e.g.: 123456-789100
// 6 digits
// 2 Adjacent digits are the same
// Going from left to right, the digits never decrease. Only increase of stay the same

const [minStr, maxStr] = '147981-691423'.split('-');
const min = parseInt(minStr);
const max = parseInt(maxStr);
const possiblePasswords = [];

// loop throught the range

for (let num = min; num <= max; num++) {
    let isNotDecreasing = true;
    let hasAdjacentDouble = false;
    
    let numString = num.toString();
    for (let c = 0; c < numString.length - 1; c++){
        // if any of the numbers increased, no need checking anything else
        if (!isNotDecreasing) break;
        if (parseInt(numString[c]) > parseInt(numString[c+1])) {
            isNotDecreasing = false;             
            break;
        } else if (numString[c] === numString[c+1]) {
            if (numString[c-1] != numString[c] && numString[c+2] != numString[c]) {
                hasAdjacentDouble = true;
            }
        }
    }

    if (isNotDecreasing && hasAdjacentDouble) {
        possiblePasswords.push(num);
    }
}

console.log(possiblePasswords.length)
