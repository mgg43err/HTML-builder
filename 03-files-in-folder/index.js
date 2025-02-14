const path = require("node:path");
const fs = require("node:fs")
const fsp = require("node:fs/promises");
const SECRET_FOLDER = path.join(__dirname + "/secret-folder/");

fsp
  .readdir(SECRET_FOLDER, { withFileTypes: true })
  .then((filenames) => {
    filenames.map((x) => {
      x.isFile()
        ? fs.stat(path.join(SECRET_FOLDER + x.name), (e, s) => {
            if (e) {
              console.log(e);
            } else {
              console.log(
                `${x.name.split('.')[0]}`,
                "-",
                path.parse(SECRET_FOLDER + x.name).ext,
                "-",
                (s.size / 1024).toFixed(3) + "kb"
              );
            }
          })
        : "";
    });
  })
  .catch((err) => {
    console.log(err);
  });
