import Program from "../nodes/Program";
import ParserAssignment from "./ParserAssignment";
import ParserExpression from "./ParserExpression";
import ParserLoop from "./ParserLoop";
import ParserReceiver from "./ParserReceiver";
import ParserTransmitter from "./ParserTransmitter";

export default function parse(tokens, debug=false) {
	// Because parsers are ordered, should use map.
	const parsers = new Map([
		['Transmitter', new ParserTransmitter],
		['Receiver', new ParserReceiver],
		['Expression', new ParserExpression],
		['Assignment', new ParserAssignment],
		['Loop', new ParserLoop]
	]);

	parsers.forEach(parser => {
		let tokenLength = tokens.length;

		for(let i = 0; i < tokenLength; i++) {
			if(!parser.isStartOf(tokens, i)) continue;

			const {end, node} = parser.parse(tokens, i, parsers, debug);
			tokens.splice(i, end - i + 1, node);
			tokenLength = tokens.length;
		}
	});

	const programNode = new Program;
	tokens
		.filter(v => v.name !== 'NewLine')
		.forEach(v => programNode.connect('Statements', v));

	return programNode;
};
