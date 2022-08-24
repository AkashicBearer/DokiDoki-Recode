const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const configs = require('./configs/client.json');
const fs = require('fs');
const path = require('node:path');
const Token = process.env['BOT_TOKEN'];
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
client.prefix = configs.Prefix;

module.exports = client;
const files = fs.readdirSync(path.resolve(__dirname, 'commands'));


fs.readdirSync(path.resolve(__dirname, 'handlers')).forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

if (configs.DevStatus === 2) {
	client.login(Token);
}
else {
	client.login(Token);
}