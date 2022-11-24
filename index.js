const { PDFDocument } = require("pdf-lib");
const { writeFileSync, readFileSync } = require("fs");
fs = require('fs');

async function removePages(filename) {
    const letters = await PDFDocument.load(readFileSync(`./${filename}`));
    // console.log(`${filename}${letters.getPageCount()}`)

    for (let i = 1; i < letters.getPageCount();) {

        if(i !== 1 || i !== 3) {
            console.log(i)
            letters.removePage(i);
            i++
        }
    }
    // letters.removePage(4);
    writeFileSync(`_${filename}`, await letters.save());

    // console.log(`${file} has ${letters.getPageCount()} pages`)
    // letters.removePage();
    // writeFileSync(`_${filename}`, await letters.save());
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
                // console.log(`Finded file: ${file}`);

                removePages(file).catch((err) => console.log(err));

                // removePage().catch((err) => console.log(err));
                // fs.unlinkSync(path + file)
            }
        });
    });
} catch (err) {
    console.error(err);
}

