const path = require('path');
const fs = require('fs');
const SECRET_FOLDER = path.join(__dirname + '/secret-folder/');

fs.promises.readdir(SECRET_FOLDER, {withFileTypes:true})
    .then(filenames => {
        filenames.map(x => {
            x.isFile() ?
                fs.stat(path.join(SECRET_FOLDER  +x.name ), (e, s) => {
                    if (e) { console.log(e) }
                    else {
                        console.log(x.name, "-", path.parse(SECRET_FOLDER  +x.name).ext, "-", (s.size/1024).toFixed(3) +"kb" );
                    }
                }) :
                "";                    
        }
        )
    })
    .catch(err => {
        console.log(err)
    })