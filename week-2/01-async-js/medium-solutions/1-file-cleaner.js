const fs = require('fs');
async function fileCleaner(){
    try {
        const fileData = await fs.promises.readFile("file-to-read.txt", "utf-8");
        const newData = fileData.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
        // OR
        // const newData = fileData.replace(/\s+/g, ' ').trim();
        
        try {
            await fs.promises.writeFile("file-to-read.txt", newData);
            console.log("Data written successfully to file");
        } catch (err) {
            console.error(err);
        }
    } catch(err) {
        console.error(err);
    }
}
fileCleaner()