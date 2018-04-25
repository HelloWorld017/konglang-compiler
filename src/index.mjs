import fs from "fs";
import parse from "./parser";
import tokenize from "./tokenizer";
import {toSigmaJson} from "./utils";

let tokens = parse(tokenize(`
	(2 - 2) { 2
	2 + 2 * 2 } (2 + 2)
	<2 - 2> [
		(#) { <2 + 2 * 2>
		(2 - 2) { <#>

		<2 + 2> [
			(2 + 2) { 2 - 2
		]
	]
`));

fs.writeFileSync(
	'./tools/sigma/data.json',
	JSON.stringify(toSigmaJson(tokens))
);
