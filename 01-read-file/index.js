const fs = require("node:fs");
const path = require("node:path");

let txt = path.join(__dirname + "/text.txt");
let readStream = fs.createReadStream(txt, "utf-8");

readStream.on("data", data => console.log(data));
