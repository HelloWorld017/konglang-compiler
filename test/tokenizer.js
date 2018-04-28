import fs from 'fs';
import test from 'ava';
import tokenize from "../src/tokenizer/index.mjs";

const loadKong = name => fs.readFileSync(`./tokenizer/${name}.kong`, 'utf8').replace(/\r\n/g, '\n');
const tokenToString = tokens => tokens.map(v => `${v.name}/${v.string}`).join(',');

const tokenized = {
	'assignment': 'Number/2,Operator/+,Number/2,AssignmentRight/},ReceiverOpen/(,Number/22,ReceiverClose/)',
	'multiline': 'ReceiverOpen/(,Number/2,ReceiverClose/),AssignmentLeft/{,TransmitterOpen/<,Hash/#,' +
		'TransmitterClose/>,NewLine/\n,TransmitterOpen/<,Number/2,TransmitterClose/2,LoopOpen/[,' +
		'NewLine/\n,TransmitterOpen/<,Number/2,Operator/+,Number/2,TransmitterClose/>,Operator/+,Number/2,' +
		'AssignmentRight/},ReceiverOpen/(,Number/2,Operator/+,Number/2,ReceiverClose/),' +
		'NewLine/\n,LoopClose/]'
};

test('Tokenizing default assignment', t => {
	const tokens = tokenize(loadKong('assignment'));
	t.is(
		tokenToString(tokens.filter(v => v.name !== 'NewLine')),
		tokenized.assignment
	);
});

test('Tokenizing multiple lines', t => {
	const tokens = tokenize(loadKong('assignment'));

	t.is(tokenToString(tokens), tokenized.multiline);
});

test('Tokenizing unexpected chars.', t => {
	const error = t.throws(() => {
		tokenize(loadKong('invalid'));
	});

	t.is(error.message, 'Syntax Error: undefined char at 2:14');
});
