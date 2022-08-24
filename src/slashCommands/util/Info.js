const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const EmbedConfig = require('../../configs/embeds.json');

module.exports = {
	name: 'info',
	description: 'Sends information on the current situation',
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

			const InfoEmbed = new EmbedBuilder();
			InfoEmbed.setDescription('The Bot is currently undergoing a global rework, which is why many commands are missing. Also unless you are already able to run this command, please reinvite the bot with the correct permissions just like every other bot with slash command support\n\nDo note that there is no exact arrival time for the end of the recode, but I`ll try my best to finish it as soon as pos');
			InfoEmbed.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon });
			InfoEmbed.setColor(`#${EmbedConfig.EmbedColorReady}`);
			await interaction.editReply({ content: ' ', embeds: [InfoEmbed] });

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