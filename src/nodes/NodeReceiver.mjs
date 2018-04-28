import Node from "./Node";

class NodeReceiver extends Node {
	constructor(token) {
		super('Receiver', token);
	}

	async evaluate(memory, steps=-1, resume=false) {
		const {result} = await this.connection.Pointer[0].evaluate(memory, steps, resume);
		
		return {
			consumeSteps: 0,
			result,
			notFinished: false
		};
	}
}

export default NodeReceiver;
