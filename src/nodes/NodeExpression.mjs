import Node from "./Node";

class NodeExpression extends Node {
	constructor(token) {
		super('Expression', token);
	}

	async evaluate(memory, steps=-1) {
		const valueNode = this.connection.Expression[0];
		const {result} = await valueNode.evaluate(memory, steps);

		return {
			consumeSteps: 0,
			result
		};
	}
}

export default NodeExpression;
