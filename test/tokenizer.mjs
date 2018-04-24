import test from 'ava';
import tokenize from "../src/tokenizer/";

test('Tokenizing default assignment', t => {
	const tokens = tokenize('(2 - 2) { 22');
});

test('Tokenizing multiple lines', t => {
	const tokens = tokenize(`
		(2 - 2) { 2
		2 + 2 * 2 } (2 + 2)
		<2 - 2> [
			(#) { <2 + 2 * 2>
		]
	`);
});

test('Tokenizing error-containing codes.', t => {
	const tokens = tokenize(`
		(2 - 2) { 3
		2 + 2 * 2 } (2 + 2)
		<2 - 2> [
			(#) { <2 + 2 * 2>
		]
	`);
});

test('Tokenizing unexpected chars.', t => {
	const tokens = tokenize(`
		(2 - 2) { 3
		2 + 2 * 2 } (2 + 2)
		<2 - 2> [
			(&) { <2 + 2 * 2>
		]
	`);
});
