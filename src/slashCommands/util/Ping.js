const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const EmbedConfig = require('../../configs/embeds.json');

module.exports = {
	name: 'ping',
	description: 'Replies with pong!.',
	isOwner: false,
	category: 'util',
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {
		try {
			const PrepEmbed = new EmbedBuilder();
			PrepEmbed.setTitle('❯ Executing Given Command');
			PrepEmbed.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon });
			PrepEmbed.setColor(`#${EmbedConfig.EmbedColorPrep}`);

			// eslint-disable-next-line no-unused-vars
			const EmbedPrep = await interaction.reply({ content: ' ', embeds: [PrepEmbed] });

			const Ping = new Date - interaction.createdTimestamp;

			const PingEmbed = new EmbedBuilder();
			PingEmbed.setTitle('❯ Ping Response');
			PingEmbed.setDescription(`🏓 ${Ping} latency || ${client.ws.ping}ms`);
			PingEmbed.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon });
			PingEmbed.setColor(`#${EmbedConfig.EmbedColorReady}`);

			await interaction.editReply({ content: ' ', embeds: [PingEmbed] });
		}
		catch (e) {
			const ErrorEmbed = new EmbedBuilder();
			ErrorEmbed.setTitle('❯ An Error has occured!');
			ErrorEmbed.setDescription('Some sort of error has occured please report it to the developer team\ni.e Command x gave me an error when I did x');
			ErrorEmbed.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon });
			ErrorEmbed.setColor(`#${EmbedConfig.EmbedColorError}`);

			try {
				await interaction.editReply({ content: ' ', embeds: [ErrorEmbed] });
			}
			catch (e) {
				await interaction.reply({ content: ' ', embeds: [ErrorEmbed] });
			}
		}
	},
};