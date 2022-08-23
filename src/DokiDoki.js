const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
dotenv.config();
const chalk = require('chalk');
const configs = require('./configs/client.json');
const clientId = configs.clientId

//	const DevToken = process.env['DEV_BOT_TOKEN'];
const Token = process.env['BOT_TOKEN'];

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
	if (configs.DevStatus === 2) {
		console.log('Loaded Commands: ' + chalk.green(command.data.name));
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
	if (configs.DevStatus === 2) {
		console.log('Loaded Events: ' + chalk.green(event.name));
	}
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('guildCreate', async guild => {
	let guildId = guild.id;

	const commands = [];
	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		commands.push(command.data.toJSON());
		if (configs.DevStatus === 2) {
			console.log(command.data);
		}
	}

	const rest = new REST({ version: '10' }).setToken(Token);

	rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
})

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

if (configs.DevStatus === 2) {
	client.login(Token);
}
else {
	client.login(Token);
}