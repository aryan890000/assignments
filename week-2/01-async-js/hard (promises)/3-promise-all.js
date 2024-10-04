/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function wait1(t) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, t * 1000)
    });
}

function wait2(t) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, t * 1000)
    });
}

function wait3(t) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, t * 1000)
    });
}

async function calculateTime(t1, t2, t3) {
    const startTime = Date.now(); // Capture the start time

    const p1 = wait1(t1); 
    const p2 = wait2(t2);
    const p3 = wait3(t3);

    await Promise.all([p1,p2,p3]); // the mistake i was doing is that i was passing all three functions as parameters instead of what promises returned by these three functions, Promise.all takes array of promises as argument.
    
    const endTime = Date.now(); // Capture the end time
    const duration = endTime - startTime; // Calculate the duration in milliseconds

    return duration; // Return the duration
}

module.exports = calculateTime;
