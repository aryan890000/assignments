/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    let maxElement = Number.MIN_SAFE_INTEGER;
    for(num of numbers) {
        if(maxElement < num) {
            maxElement = num;
        }
    }
    maxElement = maxElement === Number.MIN_SAFE_INTEGER ? undefined : maxElement;
    return maxElement;
}

module.exports = findLargestElement;