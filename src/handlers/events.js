const fs = require('fs');
const path = require('node:path');
const chalk = require('chalk');

const AsciiTable = require('ascii-table');
const table = new AsciiTable();
table.setHeading('Events', 'Stats').setBorder('|', '-', '@', '@');

// eslint-disable-next-line no-unused-vars
module.exports = (client) => {
	fs.readdirSync(path.resolve('src/events/')).filter((file) => file.endsWith('.js')).forEach((event) => {
		require(`../events/${event}`);
		table.addRow(event.split('.js')[0], '✅');
	});
	console.log(chalk.greenBright(table.toString()));
};
