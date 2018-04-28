import Node from "./Node";

class NodeHash extends Node {
	constructor(token) {
		super('Hash', token);
	}

	async evaluate() {
		return {
			consumeSteps: 0,
			result: 'Hash',
			notFinished: false
		};
	}
}

export default NodeHash;
