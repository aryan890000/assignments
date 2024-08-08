/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/
// let n=10000000;
function calculateTime(n) {
    for(let i=0;i<n;i++){
        n=n+i
    }
    // return 0.01;
    return n;
}

const beforeDate=new Date()
const before=beforeDate.getTime();

const afterDate=new Date()
const after=afterDate.getTime();
console.log(afterDate-beforeDate);