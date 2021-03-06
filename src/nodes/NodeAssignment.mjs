import Node from "./Node.mjs";

class NodeAssignment extends Node {
	constructor(token) {
		super('Assignment', token);
	}

	async evaluate(memory, steps=-1, resume=false) {
		const receiverNode = this.connection.Receiver[0];
		const expressionNode = this.connection.Expression[0];

		const {result} = await expressionNode.evaluate(memory, steps, resume);
		const receiver = (await receiverNode.evaluate(memory, steps, resume)).result;

		memory.set(receiver, result);

		return {
			consumeSteps: 1,
			result: null,
			notFinished: false
		};
	}
}

export default NodeAssignment;
