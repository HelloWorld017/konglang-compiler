import {getInvalidTokenError} from "../utils";

import Node from "./Node";
import Parser from "./Parser";

class ParserTransmitter extends Parser {
	constructor() {
		super('Transmitter');
	}

	parse(tokens, start, parsers, debug=false) {
		const {Expression} = parsers;
		let isInTransmitter = false;

		if(tokens[start].name !== 'TransmitterOpen') {
			throw getInvalidTokenError(tokens[start]);
		}

		let transmitterEnd = null;

		for(let i = start + 1; isInTransmitter; i++) {
			if(tokens[i].name === 'TransmitterOpen') {
				const {end, result} = this.parse(tokens, tokens[i])
				tokens.splice(i, end - i + 1, result);
			}

			if(tokens[i].name === 'TransmitterClose') {
				isInTransmitter = false;
				transmitterEnd = i;
			}
		}

		const {result, end} = Expression.parse(tokens, start + 1, parsers, debug);

		if(end + 1 !== transmitterEnd) {
			throw getInvalidTokenError(tokens[end + 1]);
		}

		const transmitterNode = new Node('Transmitter');
		transmitterNode.connect('Pointer', result);

		return {
			end: end + 1,
			result: transmitterNode
		};
	}
}

export default ParserTransmitter;
