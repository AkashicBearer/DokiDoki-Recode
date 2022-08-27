const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const EmbedConfig = require('../../configs/embeds.json');

module.exports = {
	name: 'help',
	description: 'Send the complete list of commands the bot has to offer',
	isOwner: false,
	category: 'util',
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	options: [
		{
			name: 'command',
			description: 'Command to get information about',
			type: 3,
			required: false,
		},
	],
	run: async (client, interaction) => {
		try {
			const PrepEmbed = new EmbedBuilder()
				.setTitle('❯ Executing Given Command')
				.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon })
				.setColor(`#${EmbedConfig.EmbedColorPrep}`);

			// eslint-disable-next-line no-unused-vars
			const EmbedPrep = await interaction.reply({ content: ' ', embeds: [PrepEmbed] });

			const HelpEmbed = new EmbedBuilder();
			const command = interaction.options.getString('command');
			const commandArray = Array.from(client.slashCommands.values());
			const commandKeys = Array.from(client.slashCommands.keys());


			if (command) {
				try {
					if (commandKeys.includes(command)) {
						const getCommand = commandArray.find(cmd => cmd.name == command);

						HelpEmbed.setTitle('❯ Command Information');
						HelpEmbed.addFields(
							{ name: '❯ Command Name ', value: getCommand.name, inline: true },
							{ name: '❯ Command Group', value: getCommand.category, inline: true },
							{ name: '❯ Command Information', value: getCommand.description, inline: false }
						);
						HelpEmbed.setColor(`#${EmbedConfig.EmbedColorReady}`);

					} else {

						HelpEmbed.setTitle('❯ Error ');
						HelpEmbed.setDescription('The command you\'ve requested doesnt exist');
						HelpEmbed.setColor(`#${EmbedConfig.EmbedColorError}`);
					}

				}
				catch (e) {

					HelpEmbed.setTitle('❯ Error ');
					HelpEmbed.setDescription('Something went wrong?');
					HelpEmbed.setColor(`#${EmbedConfig.EmbedColorError}`);

					console.log(e)

				}
			}
			else {

				let util = [];
				let rp = [];
				let owner = [];

				for (const command of commandArray) {
					if (command.category === 'util') {
						util += `\`${command.name}\`, `;
					}
					if (command.category === 'roleplay') {
						rp += `\`${command.name}\`, `;
					}
					if (command.category === 'owner') {
						owner += `\`${command.name}\`, `
					}
				}

				HelpEmbed.setTitle('❯ Recoded Commands');

				if (interaction.user.id === configs.ownerID) {
					HelpEmbed.addFields(
						{ name: '__Roleplay Commands__', value: `${rp}`, inline: false },
						{ name: '__Utilisation Commands__', value: `${util}`, inline: false },
						{ name: "__Owner Only Commands__", value: `${owner}`, inline: false }
					);
				} else {
					HelpEmbed.addFields(
						{ name: '__Roleplay Commands__', value: `${rp}`, inline: false },
						{ name: '__Utilisation Commands__', value: `${util}`, inline: false }
					);
				}
				HelpEmbed.setColor(`#${EmbedConfig.EmbedColorReady}`);
			}

			HelpEmbed.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon });

			await interaction.editReply({ content: ' ', embeds: [HelpEmbed] });

		}
		catch (e) {
			const ErrorEmbed = new EmbedBuilder()
				.setTitle('❯ An Error has occured!')
				.setDescription('Some sort of error has occured please report it to the developer team\ni.e Command x gave me an error when I did x')
				.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon })
				.setColor(`#${EmbedConfig.EmbedColorError}`);

			try {
				await interaction.editReply({ content: ' ', embeds: [ErrorEmbed] });
			}
			catch {
				await interaction.reply({ content: ' ', embeds: [ErrorEmbed] });
			}
			console.log(e);
		}
	},
};