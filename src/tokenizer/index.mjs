import Token from "./Token";
import TokenizerOperator from "./TokenizerOperator";
import TokenizerSingle from "./TokenizerSingle";
import TokenizerRegex from "./TokenizerRegex";

const tokenizers = [
	new TokenizerRegex('NewLine', /^(\r\n|\r|\n)/),
	new TokenizerRegex('Whitespace', /^\s+/),
	new TokenizerRegex('Number', /^2+/),
	new TokenizerOperator(),
	new TokenizerSingle('Hash', '#'),
	new TokenizerSingle('AssignmentLeft', '{'),
	new TokenizerSingle('AssignmentRight', '}'),
	new TokenizerSingle('LoopOpen', '['),
	new TokenizerSingle('LoopClose', ']'),
	new TokenizerSingle('TransmitterOpen', '<'),
	new TokenizerSingle('TransmitterClose', '>'),
	new TokenizerSingle('ReceiverOpen', '('),
	new TokenizerSingle('ReceiverClose', ')')
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

			if(token.name !== 'Whitespace') {
				token.mapCode(line + 1, i, length);
				tokens.push(token);
			}

			i += length;

			if(debug) {
				console.log(`[Tokenizing] Consumed ${length} by ${tokenizer.name}, Left string: ${text}`);
			}

			return true;
		});

		if(!result) {
			const error = new Error(`Syntax Error: undefined char at ${line + 1}:${i}`);
			error.row = line + 1;
			error.column = i;
			error.text = originalText;
			error.type = 'InvalidChar';

			throw error;
		}
	}

	return tokens;
};

export default function tokenize(text, debug=false) {
	const tokens = [];

	const lines = text.split(/(\r|\n|\r\n)/);
	return lines
		.map((text, line) => tokenizeLine(text, line, debug))
		.reduce((prev, curr) => prev.concat(curr), []);
};
