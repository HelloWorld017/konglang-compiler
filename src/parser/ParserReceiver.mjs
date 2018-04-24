import {getInvalidTokenError} from "../utils";

import Node from "./Node";
import Parser from "./Parser";

class ParserReceiver extends Parser {
	constructor() {
		super('Receiver');
	}

	parse(tokens, start, parsers, debug=false) {
		const {Expression} = parsers;

		if(tokens[start].name !== 'ReceiverOpen') {
			throw getInvalidTokenError(tokens[start]);
		}

		const {result, end} = Expression.parse(tokens, start + 1, parsers, debug);

		const endToken = tokens[end + 1];
		if(token[end + 1].name !== 'ReceiverClose') {
			throw getInvalidTokenError(token[end + 1]);
		}

		const receiverNode = new Node('Receiver');
		receiverNode.connect('Pointer', result);

		return {
			end: end + 1,
			result: receiverNode
		};
	}
}

export default ParserReceiver;
