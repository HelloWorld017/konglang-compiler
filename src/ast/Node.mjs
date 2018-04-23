class Node {
	constructor(name) {
		this.name = name;
		this.connection = {};
	}

	connectTo(name, target) {
		if(!this.connection[name]) {
			this.connection[name] = [];
		}

		this.connection[name].push(target);
	}
}

export default Node;
