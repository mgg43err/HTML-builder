const path = require("node:path");
const fs = require("node:fs");
const fsp = require("node:fs/promises");

const inputFilesPath = path.join(__dirname + "/files/");
const outputFilescopyPath = path.join(__dirname + "/files-copy/");

const mv = async function (src, dest) {
	try {
		const f = await fsp
			.readdir(src, { withFileTypes: true });
		f.map(x => {
			fs.copyFile(
				path.join(src + x.name),
				path.join(dest + x.name),
				function cb(err) {
					if (err)
						throw err;
				}
			);
		});
	} catch (err_1) {
		console.log(err_1);
	}
};

const copyDir = function (src, dest) {
	return [dest].forEach(v => {
		fs.access(v, err => {
			if (err) {
				fs.mkdir(v, {recursive: true}, err => {
					if (err) throw err;
					mv(src, dest);
				});
			} else {
				fs.rm(v, {recursive: true, force: true}, () => {
					fs.mkdir(v, {recursive: true}, err => {
						if (err) throw err;
						mv(src, dest);
					});
				});
			}
		});
	});
};

copyDir(inputFilesPath, outputFilescopyPath);

