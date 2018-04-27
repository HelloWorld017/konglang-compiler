import {getInvalidTokenError} from "../utils";

import NodeAssignment from "./NodeAssignment";
import Parser from "./Parser";

class ParserAssignment extends Parser {
	constructor() {
		super('Assignment');
	}

	isStartOf(tokens, index) {
		if(!tokens[index + 1]) return false;

		const {name} = tokens[index + 1];

		if(name === 'AssignmentLeft' || name === 'AssignmentRight') return true;
		return false;
	}

	parse(tokens, start, parsers, debug=false) {
		let receiverPosition = -1;
		if(tokens[start + 1].name === 'AssignmentRight') {
			receiverPosition = 1;
		}

		const receiver = tokens[start + receiverPosition + 1];
		if(!receiver || receiver.name !== 'Receiver') {
			throw getInvalidTokenError(tokens[start + 1]);
		}

		const expression = tokens[start - receiverPosition + 1];
		if(!expression || expression.name !== 'Expression') {
			throw getInvalidTokenError(tokens[start + 1]);
		}

		const assignmentNode = new NodeAssignment(tokens[start + 1]);
		assignmentNode.connect('Receiver', receiver);
		assignmentNode.connect('Expression', expression);

		return {
			end: start + 2,
			node: assignmentNode
		};
	}
}

export default ParserAssignment;
