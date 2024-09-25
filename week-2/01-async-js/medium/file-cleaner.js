const fs = require('fs');
fs.readFile('1-file-cleaner.md', 'UTF-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log('The data before is: ', data);

        const updatedData = data.replace(/\s+/g, ' ').trim();

        fs.writeFile('1-file-cleaner.md', updatedData, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('The data after is :', updatedData);
            }
        })
    }
})
