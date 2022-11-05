/*
приветствие
ожидающий ввод текста,
записывающий введённый текст в файл.
*/
const fs = require("fs");
const readline = require("readline");
const path = require("path");
const process = require("process");

const ws = fs.createWriteStream(path.join(__dirname + "/out.txt"));

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
console.log("Hello my dear Friend!");
rl.on("line", line => {
	ws.write(line + "\n");
	if (line === "exit") {
		console.log("Bye! My dear Friend");
		process.exit(1);
	}
});

rl.on("SIGINT", () => {
	console.log("Bye! My dear Friend");
	process.exit(1);
});
