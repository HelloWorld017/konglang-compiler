import Node from "./Node.mjs";

class NodeExpression extends Node {
	constructor(token) {
		super('Expression', token);
	}

	async evaluate(memory, steps=-1, resume=false) {
		const valueNode = this.connection.Expression[0];
		const {result} = await valueNode.evaluate(memory, steps, resume);

		return {
			consumeSteps: 0,
			result,
			notFinished: false
		};
	}
}

export default NodeExpression;
