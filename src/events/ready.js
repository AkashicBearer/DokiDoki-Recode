// eslint-disable-next-line no-unused-vars
const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js');
const chalk = require('chalk');
const client = require('..');
const config = require('../configs/client.json');

// eslint-disable-next-line no-unused-vars
const cooldown = new Collection();

client.on('ready', () => {
	if (config.DevStatus === 2) {
		console.log(chalk.bgGreen.bold(`
█░░ █▀█ █▀▀ █▀▀ █▀▀ █▀▄   █ █▄░█
█▄▄ █▄█ █▄█ █▄█ ██▄ █▄▀   █ █░▀█`) + chalk.green.bold(`\n${client.user.tag}(${client.user.id})`) + chalk.red.bold('\n⛏Currently on Test Build!⛏'));

		const stats = [
			{ name: `${client.guilds.cache.size} Servers`, type: 2 }, // LISTENING
			{ name: `${client.channels.cache.size} Channels`, type: 0 }, // PLAYING
			{ name: `${client.users.cache.size} Users`, type: 3 }, // WATCHING
			{ name: '/info for information', type: 2 },
		];
		const status = ['online', 'dnd', 'idle'];

		let i = 0;
		setInterval(() => {
			if (i >= stats.length) i = 0;
			client.user.setActivity(stats[i]);
			i++;
		}, 10000);

		let s = 0;
		setInterval(() => {
			if (s >= stats.length) s = 0;
			client.user.setStatus(status[s]);
			s++;
		}, 30000);

	}
	else {
		console.log(chalk.bgGreen.bold(`
█░░ █▀█ █▀▀ █▀▀ █▀▀ █▀▄   █ █▄░█
█▄▄ █▄█ █▄█ █▄█ ██▄ █▄▀   █ █░▀█`) + chalk.green.bold(`\n${client.user.tag}(${client.user.id})`));
		const stats = [
			{ name: `${client.guilds.cache.size} Servers`, type: 2 }, // LISTENING
			{ name: `${client.channels.cache.size} Channels`, type: 0 }, // PLAYING
			{ name: `${client.users.cache.size} Users`, type: 3 }, // WATCHING
			{ name: '/info for information', type: 2 },
		];
		const status = ['online', 'dnd', 'idle'];

		let i = 0;
		setInterval(() => {
			if (i >= stats.length) i = 0;
			client.user.setActivity(stats[i]);
			i++;
		}, 5000);

		let s = 0;
		setInterval(() => {
			if (s >= stats.length) s = 0;
			client.user.setStatus(status[s]);
			s++;
		}, 30000);
	}
});
