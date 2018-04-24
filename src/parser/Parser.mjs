class Parser {
	constructor(name) {
		this.name = name;
	}

	parse(tokens, position) {
		return {
			position,
			node: [null]
		};
	}
}

export default Parser;
