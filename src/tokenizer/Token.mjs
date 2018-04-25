class Token {
	constructor(name, string) {
		this.name = name;
		this.string = string;
		this.attribute = {};
		this.type = 'Token';
	}

	setAttribute(key, value) {
		this.attribute[key] = value;
	}

	getAttribute(key) {
		return this.attribute[key];
	}

	mapCode(line, column, length) {
		this.line = line;
		this.column = column;
		this.length = length;
	}
}

export default Token;
