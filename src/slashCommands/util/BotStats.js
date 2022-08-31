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
			InfoEmbed.setTitle(`❯ __**${client.user.username} Information**__`);
			InfoEmbed.addFields(
				{ name: '❯ Bot Tag', value: `${client.user.tag}`, inline: true },
				{ name: '❯ Bot ID', value: `${client.user.id}`, inline: true },
				{ name: '❯ Server Count', value: `${client.guilds.cache.size}`, inline: true },

				{ name: '\u200B', value: '\u200B' },

				{ name: 'Bot Invite', value: '[Invite](https://discordapp.com/api/oauth2/authorize?client_id=385115460397694977&permissions=1514446113862&scope=applications.commands%20bot)', inline: true },
				{ name: 'Support Server Invite', value: '[Invite](https://discord.com/invite/4RNvxJR)', inline: true },
			);
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