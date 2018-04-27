import split from 'split';

class State {
	constructor() {
		this.memory = new Map();
		this.stdio = new Map();

		process.stdin.setEncoding('utf8');
		process.stdin.pipe(split()).on('data', (line) => {
			Buffer.from(`line${\n}`)
		});
		process.stdin.on('readable', () => {
			const chunk = process.stdin.read();

			if(chunk !== null)
		});
	}
}
