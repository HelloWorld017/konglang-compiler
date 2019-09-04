import Node from "./Node.mjs";

class NodeNumber extends Node {
	constructor(token) {
		super('Number', token);
	}

	async evaluate() {
		return {
			consumeSteps: 0,
			result: this.value,
			notFinished: false
		};
	}
}

export default NodeNumber;
