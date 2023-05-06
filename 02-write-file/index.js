const fs = require("node:fs");
const readline = require("node:readline");
const path = require("node:path");
const process = require("node:process");
const ws = fs.createWriteStream(path.join(__dirname + "/out.txt"));
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
const b = () => console.log(`Bye! My dear Friend`);


console.log("Hello my dear Friend!");


rl.on("line", line => {
	rl.on("SIGINT", () => {
		b();
		process.exit(1);
	});
	if (line != "exit"){
		ws.write(line + "\n");
	}
	else if (line === "exit") {
		b()
		process.exit(1);
	}
	
});
