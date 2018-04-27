import Node from "./Node";

class NodeTransmitter extends Node {
	constructor(token) {
		super('Receiver', token);
	}

	async evaluate(memory, steps=-1) {
		return {
			consumeSteps: 0,
			result: this.connection.Pointer[0].evaluate(memory, steps)
		};
	}
}

export default NodeTransmitter;
