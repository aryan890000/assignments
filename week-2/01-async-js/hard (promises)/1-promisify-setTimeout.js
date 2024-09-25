/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

// function wait(n) {
//     return new Promise((resolve, reject) => {
//         const fetchedData = fetch(`https://jsonplaceholder.typicode.com/users`);
//         console.log('Fetching Data...');
//         fetchedData.then(response => response.json())
//             .then(data => {
//                 setTimeout(() => {
//                     console.log(`Data fetched in ${n / 1000} seconds :`, data)
//                     resolve(data);
//                 }, n * 1000);
//             })
//             .catch(error => {
//                 console.log("Error fetching data:", error);
//                 reject(error);
//             });
//     })

// }

// wait(2)

// module.exports = wait;


function wait(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, n * 1000)
    });
}

module.exports = wait;
