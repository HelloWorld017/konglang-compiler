import EventEmitter from 'events';
import split from 'split';

class State extends EventEmitter {
	constructor(debug=false) {
		super();
		this.memory = new Map();
		this.inputQueue = [];
		this.inputStream = null;
		this.outputStream = null;
		this.debug = debug;
	}

	log(node, text) {
		if(this.debug) console.log(`[${node.name}] ${text}`);
	}

	attachInputStream(stream) {
		let queue = [];
		stream.setEncoding('utf8');
		stream.on('data', data => {
			const lines = data.split(/(\r|\n|\r\n)/);

			lines.forEach(line => {
				this.inputQueue.push(...Buffer.from(line, 'utf8'));
				if(this.debug) console.log(`[Interpreter, UserInput] ${this.inputQueue}`);

				this.emit('data');
			});
		});

		this.inputStream = stream;
	}

	attachOutputStream(stream) {
		this.outputStream = stream;
	}

	attachStdio() {
		this.attachInputStream(process.stdin);
		this.attachOutputStream(process.stdout);
	}

	async getUserInput() {
		if(this.inputQueue.length > 0) return this.inputQueue.pop();

		await new Promise(resolve => this.on('data', resolve));
		return this.inputQueue.shift();
	}

	set(index, value) {
		if(this.debug) console.log(`[Interpreter, MemSet] Set ${index} => ${value}`);

		if(index === 'Hash') {
			if(this.debug) console.log(`[Interpreter, Output Raw] ${value}`);
			if(this.outputStream) {
				this.outputStream.write(new Uint8Array([value]));
			}

			return;
		}

		this.memory.set(index, value);
	}

	async get(index) {
		let value;

		if(index === 'Hash') {
			value = await this.getUserInput();
		} else {
			value = this.memory.get(index);
		}

		if(this.debug) console.log(`[Interpreter, MemGet] Get ${index}, Value: ${value}`);

		return value;
	}
}

export default State;
