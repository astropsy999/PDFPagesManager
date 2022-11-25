const { PDFDocument } = require("pdf-lib");
const { writeFileSync, readFileSync } = require("fs");
fs = require('fs');

async function removePages(filename) {
    const letters = await PDFDocument.load(readFileSync(`./${filename}`));
    console.log(`${filename}${letters.getPageCount()}`)

    if(letters.getPageCount() === 5) {

    for (let i = 1; i < letters.getPageCount();i++) {

        if(i !== 1) {
            // console.log(i)
            letters.removePage(i);
        }
        if(i !== 3) {
            letters.removePage(i);
        }

    }
    writeFileSync(`_${filename}`, await letters.save());

    }
    if (letters.getPageCount() === 4) {

                letters.removePage(1);
                letters.removePage(2);

        writeFileSync(`_${filename}`, await letters.save());
    }
    if (letters.getPageCount() === 6) {

        letters.removePage(5);
        letters.removePage(4);
        letters.removePage(3);
        letters.removePage(1);
        // letters.removePage(2);

        writeFileSync(`_${filename}`, await letters.save());
    }


}

try {
    path = './'
    // Read the directory given in `path`
    const files = fs.readdir(path, (err, files) => {
        if (err)
            throw err;

        files.forEach((file) => {
            // Check if the file is with a PDF extension
            if (file.split('.').pop().toLowerCase() == 'pdf') {

                removePages(file).catch((err) => console.log(err));

                // fs.unlinkSync(path + file)
            }
        });
    });
} catch (err) {
    console.error(err);
}

