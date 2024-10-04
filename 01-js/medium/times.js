/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/
const arrayRange = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step
);

function calculateTime(n) {
    let arr = arrayRange(1, n, 1);
    let sum = arr.reduce((acc, initial) => acc + initial, 0);
    console.log(sum);
}
let startTime = new Date().getTime();
calculateTime(10000);
let endTime = new Date().getTime();

let totalTime = endTime - startTime;
console.log(`Totol time taken by function to sum ${10000} numbers is: `, totalTime , 'milliseconds');