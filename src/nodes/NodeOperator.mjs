import Node from "./Node";

class NodeOperator extends Node {
	constructor(token) {
		super('Operator', token);
	}

	async evaluate(memory, steps=-1) {
		const operandA = (await this.connection.Operand[0].evaluate(memory, steps)).result;
		const operandB = (await this.connection.Operand[1].evaluate(memory, steps)).result;

		let result = 0;

		switch(this.value) {
			case '+': result = operandA + operandB; break;
			case '-': result = operandA - operandB; break;
			case '*': result = operandA * operandB; break;
			case '/': result = operandA / operandB; break;
		}

		if(!Number.isInteger(result) || 0 > result || result > 255) {
			const err = new Error(`Invalid operation result: expected integer in range (0, 255), got: ${result}`);
			err.type = 'InvalidOperation';
			err.token = this.token;

			throw err;
		}

		return {
			consumeSteps: 0,
			result: result
		};
	}
}

export default NodeOperator;
