import Token from "./Token.mjs";
import Tokenizer from "./Tokenizer.mjs";

class TokenizerRegex extends Tokenizer {
	constructor(name, regex) {
		super(name);

		this.regex = regex;
	}

	tokenize(string) {
		const match = string.match(this.regex);

		if(match) {
			return {
				token: new Token(this.name, match[0]),
				length: match[0].length
			}
		}

		return {
			token: null,
			length: 0
		};
	}
}

export default TokenizerRegex;
