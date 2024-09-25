/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/

function calculateTime(n) {
    let sum;
    let start = Date.now();
    for (let i = 0; i <= n; i++) {
        sum += i;
    }
    let end = Date.now();
    return (end-start)/1000; //convert milliseconds to seconds
}
// console.log('Time for n=10 is:',calculateTime(100));                 0
// console.log('Time for n=100 is:',calculateTime(100));                0
// console.log('Time for n=1000 is:',calculateTime(1000));              0.001
// console.log('Time for n=10000 is:',calculateTime(10000));            0.003
// console.log('Time for n=100000 is:',calculateTime(100000));          0.005
// console.log('Time for n=1000000 is:',calculateTime(1000000));        0.002
// console.log('Time for n=10000000 is:',calculateTime(10000000));      0.019
// console.log('Time for n=100000000 is:',calculateTime(100000000));    0.133
// console.log('Time for n=1000000000 is:',calculateTime(1000000000));  1.14

