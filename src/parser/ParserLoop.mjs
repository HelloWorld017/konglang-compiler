import {getInvalidTokenError} from "../utils";

import NodeLoop from "./NodeLoop";
import Parser from "./Parser";

class ParserLoop extends Parser {
	constructor() {
		super('Loop');
	}

	isStartOf(tokens, index) {
		if(!tokens[index + 1]) return false;

		const {name} = tokens[index + 1];

		if(name === 'LoopOpen') return true;
		return false;
	}

	parse(tokens, start, parsers, debug=false) {
		let isInLoop = true;
		start = start + 1;

		let transmitter = tokens[start - 1];
		if(!transmitter || transmitter.name !== 'Expression') throw getInvalidTokenError(tokens[start]);
		if(transmitter.connection.Expression.length !== 1) throw getInvalidTokenError(tokens[start - 1]);

		transmitter = transmitter.connection.Expression[0];
		if(transmitter.name !== 'Transmitter') throw getInvalidTokenError(tokens[start - 1]);

		if(!tokens[start] || tokens[start].name !== 'LoopOpen') {
			throw getInvalidTokenError(tokens[start]);
		}

		let loopEnd = null;

		for(let i = start + 1; isInLoop; i++) {
			if(!tokens[i]) {
				throw getInvalidTokenError(tokens[start]);
			}

			if(tokens[i + 1] && tokens[i + 1].name === 'LoopOpen') {
				const {end, node} = this.parse(tokens, i, parsers, debug);
				tokens.splice(i, end - i + 1, node);
			}

			if(tokens[i].name === 'LoopClose') {
				isInLoop = false;
				loopEnd = i;
			}
		}

		const loopNode = new NodeLoop(tokens[start]);

		for(let i = start + 1; i < loopEnd; i++) {
			if(tokens[i].name !== 'NewLine') {
				loopNode.connect('Statements', tokens[i]);
			}
		}

		loopNode.connect('Transmitter', transmitter);

		return {
			end: loopEnd,
			node: loopNode
		};
	}
}

export default ParserLoop;
