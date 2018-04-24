import {getInvalidTokenError} from "../utils";

import Node from "./Node";
import Parser from "./Parser";

class ParserExpression extends Parser {
	constructor() {
		super('Expression');
	}

	parse(tokens, start, parsers, debug=false) {
		// Converting infix to postfix notation

		const operators = [];
		const postfix = [];
		let isExpressionPart = true;

		for(let i = start; isExpressionPart; i++) {
			const token = tokens[i];
			switch(tokens[i].name) {
				case 'Number':
					tokens[i] = new Node('Number');
					tokens[i].setValue(parseInt(tokens[i].string));
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
					throw getInvalidTokenError(token);
			}
		}

		if(debug) {
			console.log(postfix.concat(operators.reverse()).map(v => v.string));
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

			const operatorNode = new Node('Operator');
			operatorNode.setValue(token.string);
			operatorNode.connect('Operand', childA);
			operatorNode.connect('Operand', childB);

			treeStack.push(operatorNode);
		}

		//TODO check result and return
	}
}

export default ParserExpression;
