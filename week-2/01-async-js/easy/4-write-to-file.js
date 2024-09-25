// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs');

const dataToWrite = 'Hello, We\'re humans, we are good.';

fs.writeFile('week-2/01-async-js/easy/output.txt', dataToWrite, (error) => {
    if (error) {
        console.error('Error Writing File:', error);
    }
    console.log('File has been saved!');
    expensiveFunction();
});

function expensiveFunction() {
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
        result += Math.random();
    }
    console.log('The expensive operation result is:', Math.floor(result));
}