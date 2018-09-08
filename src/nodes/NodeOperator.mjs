import Node from "./Node";

class NodeOperator extends Node {
	constructor(token) {
		super('Operator', token);
	}

	async evaluate(memory, steps=-1, resume=false) {
		const operandA = (await this.connection.Operand[0].evaluate(memory, steps, resume)).result;
		const operandB = (await this.connection.Operand[1].evaluate(memory, steps, resume)).result;

		let result = 0;

		switch(this.value) {
			case '+': result = operandA + operandB; break;
			case '-': result = operandA - operandB; break;
			case '*': result = operandA * operandB; break;
			case '/': result = operandA / operandB; break;
		}

		if(!Number.isInteger(result) || 0 > result) {
			const err = new Error(`Invalid operation result: expected integer in range (0, ), got: ${result}`);
			err.type = 'InvalidOperation';
			err.token = this.token;

			throw err;
		}

		return {
			consumeSteps: 0,
			result: result,
			notFinished: false
		};
	}
}

export default NodeOperator;
