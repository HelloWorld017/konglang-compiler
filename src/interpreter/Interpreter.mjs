class Interpreter {
	constructor(program) {
		this.program = program;
		this.memory = [];
		this.position = null;
	}

	run() {
		this.position = this.program.connectionList[0];

		while(this.position) {
			this.step();
		}
	}

	step() {
		
	}
}

export default Interpreter;
