import tokenize from "./tokenizer";

try {
	console.log(tokenize(`
		(2 - 2) { 2
		2 + 2 * 2 } (2 + 2)
		<2 - 2> [
			(#) { <2 + 2 * 2>
		]
	`));

	console.log(tokenize(`
		(2 - 2) { 3
		2 + 2 * 2 } (2 + 2)
		<2 - 2> [
			(#) { <2 + 2 * 2>
		]
	`));
} catch (e) {
	console.error(e.toString());
}
