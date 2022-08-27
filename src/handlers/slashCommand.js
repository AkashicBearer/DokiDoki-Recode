const fs = require('fs');
const path = require('node:path');
const chalk = require('chalk');

const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');

const AsciiTable = require('ascii-table');
const table = new AsciiTable().setHeading('Category', 'Slash Commands', 'Stats').setBorder('|', '-', '@', '@');

const configs = require('../configs/client.json');
const GUILD_ID = '389111570162122752';

let TOKEN;
let CLIENT_ID;

if (configs.DevStatus === 2) {
	CLIENT_ID = '435901305030967306';
}
else {
	CLIENT_ID = '385115460397694977';
}
if (configs.DevStatus === 2) {
	TOKEN = process.env['BOT_DEV_TOKEN'];
}
else {
	TOKEN = process.env['BOT_TOKEN'];
}
const rest = new REST({ version: '9' }).setToken(TOKEN);

module.exports = (client) => {
	const slashCommands = [];

	fs.readdirSync(path.resolve('src/slashCommands/')).forEach(async dir => {
		const files = fs.readdirSync(path.resolve(`src/slashCommands/${dir}/`)).filter(file => file.endsWith('.js'));

		for (const file of files) {
			const slashCommand = require(`../slashCommands/${dir}/${file}`);
			slashCommands.push({
				name: slashCommand.name,
				alias: slashCommand.alias ? slashCommand.alias : null,
				description: slashCommand.description,
				category: slashCommand.category,
				isOwner: slashCommand.isOwner ? slashCommand.isOwner : null,
				type: slashCommand.type,
				options: slashCommand.options ? slashCommand.options : null,
				default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
				default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null,
			});

			if (slashCommand.name) {
				client.slashCommands.set(slashCommand.name, slashCommand);
				table.addRow(slashCommand.category, file.split('.js')[0], '✅');
			}
			else {
				table.addRow(slashCommand.category, file.split('.js')[0], '⛔');
			}
		}

	});
	console.log(chalk.greenBright(table.toString()));

	(async () => {
		try {
			if (configs.DevStatus === 2) {

				await rest.put(
					Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
					{ body: slashCommands },
				);

			}
			else {

				await rest.put(
					Routes.applicationCommands(CLIENT_ID),
					{ body: slashCommands },
				);

				console.log(chalk.green('Successfully reloaded application (/) commands.'));
			}
		}
		catch (error) {
			console.error(error);
		}
	})();
};
