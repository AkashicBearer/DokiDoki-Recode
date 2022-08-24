const chalk = require('chalk');
const fs = require('fs');
const path = require('node:path');

const AsciiTable = require('ascii-table');
const table = new AsciiTable();
table.setHeading('Commands', 'Stats').setBorder('|', '-', '@', '@');

module.exports = (client) => {
	fs.readdirSync(path.resolve('src/commands')).forEach(dir => {
		const files = fs.readdirSync(path.resolve(`src/commands/${dir}/`)).filter(file => file.endsWith('.js'));
		if (!files || files.legnth <= 0) console.log(chalk.red('Commands - 0'));
		files.forEach((file) => {
			const command = require(`../commands/${dir}/${file}`);
			if (command) {
				client.commands.set(command.name, command);
				if (command.aliases && Array.isArray(command.aliases)) {
					command.aliases.forEach(alias => {
						client.aliases.set(alias, command.name);
					});
				}
				table.addRow(command.name, '✅');
			}
			else {
				table.addRow(file, '⛔');
			}
		});
	});
	console.log(chalk.greenBright(table.toString()));
};
