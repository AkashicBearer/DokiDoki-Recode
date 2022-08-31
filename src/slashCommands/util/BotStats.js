const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const EmbedConfig = require('../../configs/embeds.json');

module.exports = {
	name: 'stats',
	description: 'Sends information on the bot',
	category: 'util',
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {
		try {
			const PrepEmbed = new EmbedBuilder()
				.setTitle('❯ Executing Given Command')
				.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon })
				.setColor(`#${EmbedConfig.EmbedColorPrep}`);

			// eslint-disable-next-line no-unused-vars
			const EmbedPrep = await interaction.reply({ content: ' ', embeds: [PrepEmbed] });

			const InfoEmbed = new EmbedBuilder();
			InfoEmbed.setDescription(`${client.user.username} Information`);
			InfoEmbed.addFields(
				{ name: "Bot Tag", value: client.user.tag, inline: false },
				{ name: "Bot ID", value: client.user.id, inline: true },
				{ name: "Server Count", value: client.guilds.cache.size, inline: false },
				{ name: "Channel Count", value: client.channels.cache.size, inline: true }
			)
			InfoEmbed.setThumbnail(client.user.displayAvatarURL());
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