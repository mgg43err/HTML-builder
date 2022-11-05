const path = require("node:path");
const fs = require("node:fs");
//const fs = require("node:fs/promises");

const inputFilesPath = path.join(__dirname + "/files/");
const outputFilescopyPath = path.join(__dirname + "/files-copy/");

fs.stat(outputFilescopyPath, function (err) {
	if (!err) {
		console.log("Directory exist");
		//fs.promises.readdir(SECRET_FOLDER, {withFileTypes: true});
	} else if (err.code === "ENOENT") {
		console.log("Directory does not exist");
		fs.mkdir(outputFilescopyPath, () => {
			console.log("directory has been created");
		});
	}
});

console.log(inputFilesPath, outputFilescopyPath);
