import NodeStub from "./NodeStub";

class NodeLoop extends NodeStub {
	constructor(token) {
		super('Loop', token);
		this.hasStub = true;
	}

	async evaluate(memory, steps=-1, resume=false) {
		const condition = this.connection.Transmitter[0];
		const originalSteps = steps;
		const runStep = steps !== -1;

		this.handleResume(resume);

		let notFinished = false;

		memory.log(this, `Condition: ${(await condition.evaluate(memory, steps, resume)).result}`);

		while(resume || (await condition.evaluate(memory, steps, resume)).result === 0) {
			const {_notFinished, consumeSteps} = await this.internalEvaluate(memory, steps, resume);
			notFinished = _notFinished;

			if(runStep) steps -= consumeSteps;
			if(notFinished) break;

			this.position = 0;
		}

		memory.log(this, `Finished Loop.`);

		return {
			consumeSteps: originalSteps - steps,
			result: null,
			notFinished
		};
	}
}

export default NodeLoop;
