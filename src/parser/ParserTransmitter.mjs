import {getInvalidTokenError} from "../utils";

import NodeHash from "../nodes/NodeHash";
import NodeTransmitter from "../nodes/NodeTransmitter";
import Parser from "./Parser";

class ParserTransmitter extends Parser {
	constructor() {
		super('Transmitter');
	}

	isStartOf(tokens, index) {
		const {name} = tokens[index];

		if(name === 'TransmitterOpen') return true;
		return false;
	}

	parse(tokens, start, parsers, debug=false) {
		const expression = parsers.get('Expression');
		let isInTransmitter = true;

		if(tokens[start].name !== 'TransmitterOpen') {
			throw getInvalidTokenError(tokens[start]);
		}

		let transmitterEnd = null;

		for(let i = start + 1; isInTransmitter; i++) {
			if(!tokens[i]) {
				throw getInvalidTokenError(tokens[start]);
			}

			if(tokens[i].name === 'TransmitterOpen') {
				const {end, node} = this.parse(tokens, i, parsers, debug);
				tokens.splice(i, end - i + 1, node);
			}

			if(tokens[i].name === 'TransmitterClose') {
				isInTransmitter = false;
				transmitterEnd = i;
			}
		}

		let node, end;

		if(tokens[start + 1].name === 'Hash') {
			node = new NodeHash(tokens[start + 1]);
			end = start + 1;
		} else {
			const parsed = expression.parse(tokens, start + 1, parsers, debug);

			node = parsed.node;
			end = parsed.end;
		}

		if(end + 1 !== transmitterEnd) {
			throw getInvalidTokenError(tokens[end + 1]);
		}

		const transmitterNode = new NodeTransmitter(tokens[start]);
		transmitterNode.connect('Pointer', node);

		return {
			end: end + 1,
			node: transmitterNode
		};
	}
}

export default ParserTransmitter;
