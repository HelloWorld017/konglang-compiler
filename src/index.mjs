import tokenize from "./tokenizer";
import parse from "./parser";

let tokens = tokenize(`
	(2 - 2) { 2
	2 + 2 * 2 } (2 + 2)
	<2 - 2> [
		(#) { <2 + 2 * 2>
	]
`);

parse(tokenize('2 + 2 * 22'));
parse(tokenize('2 + 2 + 22'));
parse(tokenize('2 * 2 + 22'));
parse(tokenize('2 / 2 - 222 * 2 - 22'));
