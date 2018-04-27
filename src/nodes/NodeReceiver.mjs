import Node from "./Node";

class NodeReceiver extends Node {
	constructor(token) {
		super('Receiver', token);
	}

	async evaluate(memory, steps=-1) {
		let result = null;

		if(this.connection.Pointer[0].name === 'Hash') {
			result = await new Promise(resolve => {
				process.stdin.resume();
				process.stdin.once("data", data => resolve(data));
			});
			
		} else {
			result = (await this.connection.Pointer[0].evaluate(memory, steps)).result;
		}

		return {
			consumeSteps: 0,
			result
		};
	}
}

export default NodeReceiver;
