const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientID, MasterGuildID } =  require('./configs/client.json');
const Token = process.env.BOT_TOKEN

const commands = [
	
	new SlashCommandBuilder().setName('ping').setDescription('Replies with the bots ping.')
	
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientID, MasterGuildID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);