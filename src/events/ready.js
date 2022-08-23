const chalk = require('chalk');
const config = require('../configs/client.json');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		if (config.DevStatus === 2) {
			console.log(chalk.bgGreen.bold(`
█░░ █▀█ █▀▀ █▀▀ █▀▀ █▀▄   █ █▄░█
█▄▄ █▄█ █▄█ █▄█ ██▄ █▄▀   █ █░▀█`) + chalk.green.bold(`\n${client.user.tag}(${client.user.id})`) + chalk.red.bold('\n⛏Currently on Test Build!⛏'));
		}
		else {
			console.log(chalk.bgGreen.bold(`
█░░ █▀█ █▀▀ █▀▀ █▀▀ █▀▄   █ █▄░█
█▄▄ █▄█ █▄█ █▄█ ██▄ █▄▀   █ █░▀█`) + chalk.green.bold(`\n${client.user.tag}(${client.user.id})`));
			const status = ['>help for more info', 'v2.0.0', 'Under a rock!'];
			setInterval(function() {
				const RandomStatus = status[Math.floor(Math.random() * status.length)];
				client.user.setPresence({
					activity: {
						name: `${RandomStatus}`,
					},
					status: 'online',
				});
			}, 20000);
		}
	},
};