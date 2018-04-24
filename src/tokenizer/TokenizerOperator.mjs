import Token from "./Token";
import Tokenizer from "./Tokenizer";

class TokenizerOperator extends Tokenizer {
	constructor() {
		super('Operator');

		this.regexLow = /^[\+\-]/;
		this.regexHigh = /^[\*\/]/;
	}

	tokenize(string) {
		const matchLow = string.match(this.regexLow);
		const matchHigh = string.match(this.regexHigh);
		const match = matchLow || matchHigh;

		if(match) {
			const token = new Token(this.name, match[0]);

			if(matchLow) token.setAttribute('Priority', 0);
			else token.setAttribute('Priority', 1);

			return {
				token,
				length: match[0].length
			}
		}

		return {
			token: null,
			length: 0
		};
	}
}

export default TokenizerOperator;
