const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const EmbedConfig = require('../../configs/embeds.json');
const fs = require('fs');

module.exports = {
	name: 'help',
	description: 'Replies with a lsit of commands',
	category: 'util',
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {
		try {

			const PrepEmbed = new EmbedBuilder()
				.setTitle('❯ Executing Given Command')
				.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon })
				.setColor(`#${EmbedConfig.EmbedColorPrep}`);

			const EmbedPrep = await interaction.reply({ content: ' ', embeds: [PrepEmbed] });


			const HelpEmbed = new EmbedBuilder();

			let util = [];
			let rp = [];

			const cmd = Array.from(client.slashCommands.values());
			for (const command of cmd) {
				if (command.category === 'util') {
					util += `\`${command.name}\`, `;
				}
				if (command.category === 'roleplay') {
					rp += `\`${command.name}\`, `;
				}
			}

			HelpEmbed.setTitle('❯ Recoded Commands');

			HelpEmbed.addFields(
				{ name: '__Roleplay Commands__', value: `${util}`, inline: false },
				{ name: '__Utilisation Commands__', value: `${rp}`, inline: false },
			);

			HelpEmbed.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon });
			HelpEmbed.setColor(`#${EmbedConfig.EmbedColorReady}`);

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