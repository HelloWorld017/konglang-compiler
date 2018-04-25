class Node {
	constructor(name, token) {
		this.name = name;
		this.token = token;
		this.connection = {};
		this.type = 'Node';
	}

	setValue(value) {
		this.value = value;
	}

	connect(name, target) {
		if(!this.connection[name]) {
			this.connection[name] = [];
		}

		this.connection[name].push(target);
	}

	get connectionList() {
		const obj = Object.keys(this.connection)
			.map(v => this.connection[v])
			.reduce((prev, curr) => prev.concat(curr), []);

		return obj;
	}
}

export default Node;
