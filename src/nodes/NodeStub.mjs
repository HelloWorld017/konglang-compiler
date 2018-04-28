import Node from "./Node";

class NodeStub extends Node {
	constructor(name, token) {
		super(name, token);
		this.hasStub = true;
	}

	handleResume(resume) {
		if(!resume) this.updatePosition(0);
		else {
			if(!this.connection.Statements[this.position].hasStub) {
				this.updatePosition(this.position + 1);
			}
		}
	}

	async internalEvaluate(memory, steps=-1, resume=false) {
		const runList = this.connection.Statements;
		const originalSteps = steps;
		const runStep = steps !== -1;

		let notFinished = false;

		for(let i = this.position; i < runList.length; i++) {
			if(runStep && steps <= 0) {
				notFinished = true;
				break;
			}

			this.updatePosition(i);
			memory.log(this, `Evaluating Statement ${i}`);

			const {consumeSteps} = await runList[i].evaluate(memory, steps, resume);

			if(steps !== -1) steps -= consumeSteps;
		};

		return {
			notFinished,
			result: null,
			consumeSteps: runStep ? originalSteps - steps : 0
		};
	}
}

export default NodeStub;
