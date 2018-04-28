import Node from "./Node";

class NodeTransmitter extends Node {
	constructor(token) {
		super('Transmitter', token);
	}

	async evaluate(memory, steps=-1, resume=false) {
		const pointer = (await this.connection.Pointer[0].evaluate(memory, steps, resume)).result;

		return {
			consumeSteps: 0,
			result: await memory.get(pointer),
			notFinished: false
		};
	}
}

export default NodeTransmitter;
