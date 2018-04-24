import SubParserExpression from "./SubParserExpression";

export default function parse(tokens, debug=false) {
	const parser = new SubParserExpression();
	parser.parse(tokens, 0, tokens.length - 1);
}
