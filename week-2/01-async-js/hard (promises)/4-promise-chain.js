/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function promises(t) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            resolve();
        }, t * 1000)
    });
}

function wait1(t) {
    return promises(t);
}

function wait2(t) {
    return promises(t);
}

function wait3(t) {
    return promises(t);
}

async function calculateTime(t1, t2, t3) {
    
    const start = Date.now();
    
    return wait1(t1).then(() => wait2(t2)).then(() => wait3(t3)).then(() => {
        const end = Date.now();
        return end - start;
    });


    // Without Promise Chaining

    // await wait1(t1);
    // await wait2(t2);
    // await wait3(t3);
    
    // const end = Date.now();
    // return end - start; // Return the time taken in milliseconds
}

module.exports = calculateTime;
