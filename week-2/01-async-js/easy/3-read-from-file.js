// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 

var fs = require('fs');

fs.readFile('week-2/01-async-js/easy/file.txt', 'utf-8', (error, data) => {
    if (error) {
        console.log('Error loading File');
        return;
    }
    console.log('The file contents are:', data);
    expensiveFunction();
});

export default function expensiveFunction() {
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
        result += Math.random();
    }
    console.log('The expensive function result is:', Math.floor(result));
}

