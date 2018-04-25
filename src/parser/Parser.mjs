class Parser {
	constructor(name) {
		this.name = name;
	}

	isStartOf(tokens, index) {
		return false;
	}

	parse(tokens, start, parsers, debug=false) {
		return {
			end: 0,
			node: [null]
		};
	}
}

export default Parser;
