import Node from "./Node";

class NodeNumber extends Node {
	constructor(token) {
		super('Number', token);
	}

	async evaluate(memory, steps=-1) {
		return {
			consumeSteps: 0,
			result: this.value
		};
	}
}

export default NodeNumber;
