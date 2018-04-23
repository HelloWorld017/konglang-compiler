import chalk from 'chalk';
import stringWidth from 'string-width';

export function displaySyntaxError(error) {
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
}
