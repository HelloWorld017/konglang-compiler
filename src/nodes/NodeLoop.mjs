import Node from "./Node";

class NodeLoop extends Node {
	constructor(token) {
		super('Loop', token);
	}

	async evaluate(memory, steps=-1) {
		const loopList = this.connectionList.slice(this.position);
		const originalSteps = steps;

		for(let i = 0; i < loopList.length; i++) {
			if(steps !== -1 && steps <= 0) return;
			this.updatePosition(i);

			const {consumeSteps} = await loopList[i].evaluate(memory, steps);
			if(steps !== -1) steps -= consumeSteps;
		};

		return {
			consumeSteps: originalSteps - steps,
			result: null
		};
	}
}

export default NodeLoop;
