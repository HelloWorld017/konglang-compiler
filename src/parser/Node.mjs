class Node {
	constructor(name) {
		this.name = name;
		this.connection = {};
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
}

export default Node;
