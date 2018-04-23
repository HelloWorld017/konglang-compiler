import {displaySyntaxError} from "../utils/";

import TokenizerSingle from "./TokenizerSingle";
import TokenizerRegex from "./TokenizerRegex";

const tokenizers = [
	new TokenizerRegex('Whitespace', /^\s+/),
	new TokenizerSingle('LoopOpen', '['),
	new TokenizerSingle('LoopClose', ']'),
	new TokenizerSingle('AssignmentLeft', '{'),
	new TokenizerSingle('AssignmentRight', '}'),
	new TokenizerSingle('TransmitterOpen', '<'),
	new TokenizerSingle('TransmitterClose', '>'),
	new TokenizerSingle('ReceiverOpen', '('),
	new TokenizerSingle('ReceiverClose', ')'),
	new TokenizerSingle('Hash', '#'),
	new TokenizerRegex('Operator', /^[\+\-\*\/]/),
	new TokenizerRegex('Number', /^2+/)
];

const tokenizeLine = (text, line, debug=false) => {
	const tokens = [];
	let originalText = text;

	let i = 0;
	while(text.length > 0) {
		const result = tokenizers.some(tokenizer => {
			const {token, length} = tokenizer.tokenize(text);

			if(length === 0) return false;

			const extracted = text.substr(0, length);

			text = text.slice(length);
			tokens.push(token);

			i += length;

			if(debug) {
				console.log(`Consumed ${length} by Tokenizer ${tokenizer.name}, Left string: ${text}`);
			}

			return true;
		});

		if(!result) {
			const error = new Error(`Syntax Error: undefined char at ${line + 1}:${i}`);
			error.row = line + 1;
			error.column = i;
			error.text = originalText;
			error.toString = () => displaySyntaxError(error);

			throw error;
		}
	}

	return tokens;
};

export default function tokenize(text, debug=false) {
	const tokens = [];

	const lines = text.split(/(\r|\n|\r\n)/);
	return lines.map((text, line) => tokenizeLine(text, line, debug));
};
