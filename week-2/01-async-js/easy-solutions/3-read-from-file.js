const fs = require('fs')

// using callback
fs.readFile("file-to-read.txt", "utf-8", (err, data) => {
    if(err) {
        console.error(err);
        return;
    }
    console.log(data);
})

// using promises
fs.promises.readFile("file-to-read.txt", "utf-8")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  })

// using async await
async function readFileHelper() {
    try {    
        const fileData = await fs.promises.readFile("file-to-read.txt", "utf-8");
        console.log(fileData);
    } catch(err) {
        console.error(err);
    }
}
readFileHelper();