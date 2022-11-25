const { PDFDocument } = require("pdf-lib");
const { writeFileSync, readFileSync } = require("fs");
fs = require('fs');



try {
    path = '../'
    // Remove Pages function
    async function removePages(filename, currPath) {
        const letters = await PDFDocument.load(readFileSync(`${currPath}${filename}`));
        // console.log(`${filename}${letters.getPageCount()}`)

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
            writeFileSync(`${currPath}/_${filename}`, await letters.save());

        }
        if (letters.getPageCount() === 4) {

            letters.removePage(1);
            letters.removePage(2);

            writeFileSync(`${currPath}/_${filename}`, await letters.save());
        }
        if (letters.getPageCount() === 6) {

            letters.removePage(5);
            letters.removePage(4);
            letters.removePage(3);
            letters.removePage(1);

            writeFileSync(`${currPath}/_${filename}`, await letters.save());
        }
    }
    // Find list of folders
    function getDirectories(path) {
        return fs.readdirSync(path).filter(function (file) {
            return fs.statSync(path+'/'+file).isDirectory();
        });
    }

    const allDirList = getDirectories(path)

    allDirList.forEach(dir => {
        // getDirectories(path+dir+'/Схемы трубопровода')

        const currPath = path+dir+'/Схемы трубопровода/'
        const currPath1 = path+dir+'/Схемы трубопроводов/'




        if(fs.existsSync(currPath)) {

        // Read the directory given in `path`
        const files = fs.readdir(currPath, (err, files) => {
            if (err)
                throw err;

            files.forEach((file) => {
                // Check if the file is with a PDF extension
                if (file.split('.').pop().toLowerCase() == 'pdf') {

                    removePages(file, currPath).catch((err) => console.log(err));

                    // fs.unlinkSync(path + file)
                }
            });
        });
        } else if (fs.existsSync(currPath1)) {
            const files = fs.readdir(currPath1, (err, files) => {
                if (err)
                    throw err;

                files.forEach((file) => {
                    // Check if the file is with a PDF extension
                    if (file.split('.').pop().toLowerCase() == 'pdf') {

                        removePages(file, currPath1).catch((err) => console.log(err));

                        // fs.unlinkSync(path + file)
                    }
                });
            });
        }

        console.log(`Папка ${dir} - готово`)

    })

    console.log(`ВСЕ ПАПКИ ОБРАБОТАНЫ!`)

} catch (err) {
    console.error(err);
}

