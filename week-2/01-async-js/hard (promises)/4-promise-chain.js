/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function promiseReturn(t) {
    return new Promise((resolve, r̥eject) => {
        setTimeout(resolve, t * 1000);
    })
}

function wait1(t) {
    return promiseReturn(t);
}

function wait2(t) {
    return promiseReturn(t);
}

function wait3(t) {
    return promiseReturn(t);
}

function calculateTime(t1, t2, t3) {
    const start = Date.now();
    return wait1(t1).then(() => {
        return wait2(t2).then(() => {
            return wait3(t3).then(() => {
                return Date.now() - start;
            })
        })
    })

    //OR
    // make function calculateTime as async
    // await wait1(t1);
    // await wait2(t2);
    // await wait3(t3);
    // return new Promise((resolve, reject) => {
    //     resolve(Date.now() - start);
    // });    
}

module.exports = calculateTime;
