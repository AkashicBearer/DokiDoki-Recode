const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const EmbedConfig = require('../../configs/embeds.json');
const fs = require('fs');
const path = require('node:path');

module.exports = {
	name: 'help',
	description: "Replies with a lsit of commands",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {
		try {

			const PrepEmbed = new EmbedBuilder()
				.setTitle('❯ Executing Given Command')
				.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon })
				.setColor(`#${EmbedConfig.EmbedColorPrep}`);

			const EmbedPrep = await interaction.reply({ content: ' ', embeds: [PrepEmbed] });

			const PingEmbed = new EmbedBuilder()
				.setTitle('❯ Current commands')

				.setDescription(`help,userinfo,avatar,ping,info`)

				.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon })
				.setColor(`#${EmbedConfig.EmbedColorReady}`);

			await interaction.editReply({ content: ' ', embeds: [PingEmbed] });

		}
		catch (e) {

			const ErrorEmbed = new EmbedBuilder()
				.setTitle('❯ An Error has occured!')
				.setDescription('Some sort of error has occured please report it to the developer team\ni.e Command x gave me an error when I did x')
				.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon })
				.setColor(`#${EmbedConfig.EmbedColorError}`);

			await interaction.reply({ content: ' ', embeds: [ErrorEmbed] });

			console.log(e)

		}

	},
};