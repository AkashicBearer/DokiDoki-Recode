require('dotenv').config();

// eslint-disable-next-line no-unused-vars
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const configs = require('./configs/client.json');
const fs = require('fs');
const path = require('node:path');
// const { AutoPoster } = require('topgg-autoposter')

const Token = process.env['BOT_TOKEN'];
const DevToken = process.env['BOT_DEV_TOKEN'];
// const DBL_Token = process.env['DBL_TOKEN'];

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

/*
const poster = AutoPoster(" ", client) //figure out why cant assign token to a const
poster.on('posted', (stats) => {
	console.log(`Posted stats to Top.gg | ${stats.serverCount} servers`)
});
*/
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
client.prefix = configs.Prefix;

module.exports = client;

fs.readdirSync(path.resolve(__dirname, 'handlers')).forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

if (configs.DevStatus === 2) {
	client.login(DevToken);
}
else {
	client.login(Token);
}

