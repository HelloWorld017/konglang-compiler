import {getInvalidTokenError} from "../utils";

import Node from "./Node";
import Parser from "./Parser";

class ParserReceiver extends Parser {
	constructor() {
		super('Receiver');
	}

	isStartOf(tokens, index) {
		const {name} = tokens[index];

		if(name === 'ReceiverOpen') return true;
		return false;
	}

	parse(tokens, start, parsers, debug=false) {
		const expression = parsers.get('Expression');

		if(tokens[start].name !== 'ReceiverOpen') {
			throw getInvalidTokenError(tokens[start]);
		}

		let node, end;

		if(tokens[start + 1].name === 'Hash') {
			node = new Node('Hash', tokens[start + 1]);
			end = start + 1;
		} else {
			const parsed = expression.parse(tokens, start + 1, parsers, debug);

			node = parsed.node;
			end = parsed.end;
		}

		const endToken = tokens[end + 1];
		if(!endToken || tokens[end + 1].name !== 'ReceiverClose') {
			throw getInvalidTokenError(tokens[end + 1]);
		}

		const receiverNode = new Node('Receiver', tokens[start]);
		receiverNode.connect('Pointer', node);

		return {
			end: end + 1,
			node: receiverNode
		};
	}
}

export default ParserReceiver;
