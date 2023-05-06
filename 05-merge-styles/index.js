const path = require("node:path");
const fs = require("node:fs");

const outputpath = path.join(__dirname + "/project-dist/bundle.css");
const inputdir = path.join(__dirname + "/styles/");

function bundleExistCheck(src) {
	fs.stat(src, callback=(e,s)=>{
		if(e){
			return false;
		}
		else{
			return true;
		}
	})
/* 	fs.access(src, err => {
		if (err) {
			console.error(err);
		}
	});
	return true; */
}

function bundle(src, dest) {
	if (bundleExistCheck(dest) === true) {
		fs.rm(dest, {recursive: true, force: true}, () => {
			const ws = fs.createWriteStream(dest);
			fs.promises
				.readdir(src, {withFileTypes: true})
				.then(files => {
					files.map(x => {
						if (path.extname(x.name) === ".css") {
							let rs = fs.createReadStream(path.join(src + x.name), "utf-8");
							rs.on("data", data => ws.write(data + "\n"));
						}
					});
				})
				.catch(err => {
					console.log(err);
				});
		});
	}
	else {
		const ws = fs.createWriteStream(dest);
			fs.promises
				.readdir(src, {withFileTypes: true})
				.then(files => {
					files.map(x => {
						if (path.extname(x.name) === ".css") {
							let rs = fs.createReadStream(path.join(src + x.name), "utf-8");
							rs.on("data", data => ws.write(data + "\n"));
						}
					});
				})
	}
	/* return {src, dest}; */
}
bundle(inputdir, outputpath);
