import NodeStub from "./NodeStub.mjs";

class Program extends NodeStub {
	constructor() {
		super('Program');
		this.hasStub = true;
	}

	async evaluate(memory, steps=-1, resume=false) {
		this.handleResume(resume);
		return await this.internalEvaluate(memory, steps, resume);
	}
}

export default Program;
