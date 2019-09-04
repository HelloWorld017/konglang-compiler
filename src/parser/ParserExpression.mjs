import {getInvalidTokenError} from "../utils/index.mjs";

import NodeExpression from "../nodes/NodeExpression.mjs";
import NodeNumber from "../nodes/NodeNumber.mjs";
import NodeOperator from "../nodes/NodeOperator.mjs";
import Parser from "./Parser.mjs";

class ParserExpression extends Parser {
	constructor() {
		super('Expression');
	}

	isStartOf(tokens, index) {
		const {name} = tokens[index];

		if(name === 'Number' || name === 'Transmitter' || name === 'Operator') return true;
		return false;
	}

	parse(tokens, start, parsers, debug=false) {
		// Converting infix to postfix notation

		const operators = [];
		let postfix = [];
		let isExpressionPart = true;
		let end = -1;

		if(tokens[start].name === 'Operator') {
			const tempToken = new NodeNumber();
			tempToken.setValue(0);
			postfix.push(tempToken);
		}

		for(let i = start; isExpressionPart; i++) {
			let token = tokens[i];
			switch(token ? token.name : undefined) {
				case 'Number':
					if(token.type === 'Token') {
						token = new NodeNumber(token);
						token.setValue(parseInt(tokens[i].string));
					}
					// Proceed to Transmitter

				case 'Transmitter':
					postfix.push(token);
					continue;

				case 'Operator':
					if(operators.length === 0) {
						operators.push(token);
					} else {
						let topPriority = operators[operators.length - 1].getAttribute('Priority');
						const myPriority = token.getAttribute('Priority');

						while(topPriority >= myPriority) {
							postfix.push(operators.pop());

							if(operators.length > 0) {
								topPriority = operators[operators.length - 1].getAttribute('Priority');
							} else break;
						}

						operators.push(token);
					}

					break;

				default:
					isExpressionPart = false;
					end = i - 1;
			}
		}

		postfix = postfix.concat(operators.reverse());

		if(debug) {
			console.log('[Expression Parsing]', postfix.map(v => v.string || v.value || v.name));
		}

		const treeStack = [];
		for(let i = 0; i < postfix.length; i++) {
			const token = postfix[i];
			if(token.name === 'Transmitter' || token.name === 'Number') {
				treeStack.push(token);
				continue;
			}

			if(token.name !== 'Operator') throw getInvalidTokenError(token);
			if(treeStack.length < 2) throw getInvalidTokenError(token);

			const childA = treeStack.pop();
			const childB = treeStack.pop();

			const operatorNode = new NodeOperator(token);
			operatorNode.setValue(token.string);
			operatorNode.connect('Operand', childB);
			operatorNode.connect('Operand', childA);

			treeStack.push(operatorNode);
		}

		if(treeStack.length > 1) {
			throw getInvalidTokenError(treeStack[1]);
		}

		const expressionNode = new NodeExpression();
		expressionNode.connect('Expression', treeStack[0]);

		return {
			node: expressionNode,
			end
		};
	}
}

export default ParserExpression;
