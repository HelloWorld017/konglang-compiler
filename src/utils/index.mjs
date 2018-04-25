import chalk from 'chalk';
import stringWidth from 'string-width';

export function displaySyntaxError(error) {
	switch(error.type) {
		case "InvalidToken":
		case "InvalidChar":
			// TODO handle
			break;

		default:
			console.error(error);
			return;
	}

	const errorPre = `${error.row} |    ` +
		error.text.slice(0, error.column).replace(/\s+/, '');

	const errorColored = chalk.red(error.text.substr(error.column, 1));

	const errorText =
		errorPre +
		errorColored +
		error.text.slice(error.column + 1)

	return error.message + '\n' +
		errorText + '\n' +
		' '.repeat(stringWidth(errorPre) - 1) + '^^^';
};

export function getInvalidTokenError(token) {
	const error = new Error(`Unexpected token: ${token.string}`);
	error.type = 'InvalidToken';
	error.token = token;

	return error;
};

export function toSigmaJson(tree) {
	const levelIndex = [];
	const nodes = [];
	const edges = [];

	const toInternalNode = (level, node) => {
		if(!levelIndex[level]) levelIndex[level] = 0;

		levelIndex[level]++;
		let connectionList = node.connectionList;
		let label = `${node.name},${node.value || ''}`;

		if(node.type === 'Token') {
			connectionList = [];
			label = `${node.name},${node.string}`;
		}

		const id = Math.random().toString(36).slice(2);

		return {
			id,
			level: level,
			index: levelIndex[level],
			label,
			connectionList
		};
	};

	let traversal = tree.connectionList
		.slice()
		.map(v => toInternalNode(0, v));

	while(traversal.length > 0) {
		const node = traversal.shift();
		nodes.push({
			id: node.id,
			x: node.index * 2,
			y: node.level * 2,
			label: node.label,
			size: 1
		});

		//console.log(node);
		const level = node.level + 1;

		node.connectionList.forEach(v => {
			const pendingNode = toInternalNode(level, v);
			const id = pendingNode.id;

			traversal.push(pendingNode);

			edges.push({
				id: Math.random().toString(36).slice(2),
				source: node.id,
				target: id
			});
		});
	}

	return {nodes, edges};
};
