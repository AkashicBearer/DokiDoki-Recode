const fs = require('fs');
const path = require('node:path');
const chalk = require('chalk')

var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Events', 'Stats').setBorder('|', '-', "@", "@")

module.exports = (client) => {
	fs.readdirSync(path.resolve('src/events/')).filter((file) => file.endsWith('.js')).forEach((event) => {
		require(`../events/${event}`);
		table.addRow(event.split('.js')[0], '✅')
	})
	console.log(chalk.greenBright(table.toString()))
};
