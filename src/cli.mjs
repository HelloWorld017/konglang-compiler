import fs from "fs";
import Interpreter from "./interpreter/Interpreter.mjs";
import parse from "./parser/index.mjs";
import commander from "commander";
import tokenize from "./tokenizer/index.mjs";
import {toSigmaJson} from "./utils/index.mjs";

commander
	.version('2.2.22')
	.action(() => {
		commander.help();
	});

commander
	.command('help')
	.description('Shows this message')
	.action(() => {
		commander.help();
	});

commander
	.command('run <file>')
	.description('Interprets a KongLang file.')
	.option('-d, --debug', 'Shows debug logs when interpreting konglang.')
	.option('-v, --verbose', 'Shows debug logs about parsing programs.')
	.action(async (file, cmd) => {
		const {debug, verbose} = cmd;

		const program = parse(tokenize(fs.readFileSync(file, 'utf8'), verbose), verbose);

		const interpreter = new Interpreter(program, debug);
		interpreter.attachStdio();
		await interpreter.run();
		process.exit(0);
	});

commander
	.command('tree <file> <output>')
	.description('Exports abstract syntax tree in sigma format.')
	.option('-v, --verbose', 'Shows debug logs about parsing programs.')
	.action((file, output, cmd) => {
		const {verbose} = cmd;

		const program = parse(tokenize(fs.readFileSync(file, 'utf8'), verbose), verbose);
		fs.writeFileSync(output, JSON.stringify(toSigmaJson(program)));
	});

commander
	.command('debug <file>')
	.description('Opens a KongLang debugger.')
	.action((file, cmd) => {
		console.log("Debugger is under development...");
	});

commander
	.parse(process.argv);


if (!process.argv.slice(2).length) {
	commander.help();
}
