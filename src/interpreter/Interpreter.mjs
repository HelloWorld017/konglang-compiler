import State from "./State.mjs";

class Interpreter {
	constructor(program, debug=false) {
		this.program = program;
		this.memory = new State(debug);
	}

	attachStdio() {
		this.memory.attachStdio();
	}

	async run() {
		await this.program.evaluate(this.memory);
	}

	init() {
		this.program.position = 0;
	}

	async step(step) {
		await this.program.evaluate(this.memory, step, true);
	}
}

export default Interpreter;
