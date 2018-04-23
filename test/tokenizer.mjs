import test from 'ava';
import tokenize from "../src/tokenizer/";

test('Tokenizing default assignment', t => {
	const tokens = tokenize('(2 - 2) { 2');
});
