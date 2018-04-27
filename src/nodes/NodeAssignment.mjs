import Node from "./Node";

class NodeAssignment extends Node {
	constructor(token) {
		super('Assignment', token);
	}

	async evaluate(memory, steps=-1) {
		const receiverNode = this.connection.Receiver[0];
		const expressionNode = this.connection.Expression[0];

		const {result} = await expressionNode.evaluate(memory, steps);
		const receiver = (await receiverNode.evaluate(memory, steps)).result;

		memory.set(receiver, result);

		return {
			consumeSteps: 1,
			result: null
		};
	}
}

export default NodeAssignment;
