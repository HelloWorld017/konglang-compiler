class Node {
	constructor(name, token) {
		this.name = name;
		this.token = token;
		this.connection = {};
		this.type = 'Node';
		this.position = 0;
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

	async evaluate(memory, steps=-1) {
		return {
			consumeSteps: 0,
			result: null
		};
	}

	updatePosition(newPos) {
		this.position = newPos;
	}

	get connectionList() {
		const obj = Object.keys(this.connection)
			.map(v => this.connection[v])
			.reduce((prev, curr) => prev.concat(curr), []);

		return obj;
	}
}

export default Node;
