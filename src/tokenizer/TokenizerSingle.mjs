import Token from "./Token.mjs";
import Tokenizer from "./Tokenizer.mjs";

class TokenizerSingle extends Tokenizer {
	constructor(name, character) {
		super(name);

		this.character = character;
	}

	tokenize(string) {
		if(string[0] === this.character) {
			return {
				token: new Token(this.name, string[0]),
				length: 1
			};
		}

		return {
			token: null,
			length: 0
		};
	}
}

export default TokenizerSingle;
