const fs = require('fs')

// using callback
fs.writeFile("file-to-read.txt", "File content changed using callback", (err, data) => {
    if(err) {
        console.error(err);
        return;
    }
    console.log("File written successfully using callback");
})

// using promises
fs.promises.writeFile("file-to-read.txt", "File content changed using promises")
  .then(() => {
    console.log("File written successfully using promises");
  })
  .catch((err) => {
    console.error(err);
  })

// using async await
async function writeFileHelper() {
    try {
        await fs.promises.writeFile("file-to-read.txt", "File content changed using async await");
        console.log("File written successfully using async await")
    } catch(err) {
        console.error(err);
    }
}
writeFileHelper();