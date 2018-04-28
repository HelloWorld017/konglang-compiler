import fs from "fs";
import Interpreter from "./interpreter/Interpreter";
import parse from "./parser";
import tokenize from "./tokenizer";
import {toSigmaJson} from "./utils";

const debugMode = false;
const program = parse(tokenize(fs.readFileSync('./examples/hello.kong', 'utf8'), debugMode), debugMode);

(async () => {
	const interpreter = new Interpreter(program, debugMode);
	interpreter.attachStdio();
	await interpreter.run();
	fs.writeFileSync(
		'./tools/sigma/data.json',
		JSON.stringify(toSigmaJson(program))
	);

	process.exit(0);
})();
