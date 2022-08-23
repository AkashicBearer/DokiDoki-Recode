const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const EmbedConfig = require('../../configs/embeds.json');
const moment = require("moment");

module.exports = {
	name: 'userinfo',
	description: "Shows the requested users userinfo.",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	options: [
		{
			name: "user",
			description: "concerned user",
			type: 6,
			required: false
		}	
	],
	run: async (client, interaction) => {
		try {
			
			const user = interaction.options.getUser('user');
			
			const PrepEmbed = new EmbedBuilder()
				.setTitle('❯ Executing Given Command')
				.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon })
				.setColor(`#${EmbedConfig.EmbedColorPrep}`);

			const EmbedPrep = await interaction.reply({ content: ' ', embeds: [PrepEmbed] });

			
			const UserinfoEmbed = new EmbedBuilder();
			UserinfoEmbed.setTitle('❯ Information on requested user');

			if (user) {

				UserinfoEmbed.addFields(

					{ name: '❯ Username', value: user.tag, inline: true },
					{ name: '❯ ID', value: user.id, inline: true },
					{ name: '❯ Discord Join Date', value: moment.utc(user.createdAt).format('DD/MM/YYYY h:mm A'), inline: true },
					{ name: '❯ Bot', value: user.bot ? 'Yes' : 'No', inline: true },

					{ name: '\u200B', value: '\u200B' },

				);
				UserinfoEmbed.setThumbnail(user.displayAvatarURL({ dynamic: true }));

			}
			else {

				UserinfoEmbed.addFields(
					{ name: '❯ Username', value: interaction.user.username, inline: true },
					{ name: '❯ ID', value: interaction.user.id, inline: true },
					{ name: '❯ Discord Join Date', value: moment.utc(interaction.user.createdAt).format('DD/MM/YYYY h:mm A'), inline: true },
					{ name: '❯ Bot', value: interaction.user.bot ? 'Yes' : 'No', inline: true },
				);
				UserinfoEmbed.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }));

			}

			UserinfoEmbed.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon });
			UserinfoEmbed.setColor(`#${EmbedConfig.EmbedColorReady}`);

			await interaction.editReply({ content: ' ', embeds: [UserinfoEmbed] });

		}
		catch (e) {

			const ErrorEmbed = new EmbedBuilder()
				.setTitle('❯ An Error has occured!')
				.setDescription('Some sort of error has occured please report it to the developer team\ni.e Command x gave me an error when I did x')
				.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon })
				.setColor(`#${EmbedConfig.EmbedColorError}`);

			await interaction.reply({ content: ' ', embeds: [ErrorEmbed] });

		}

	},
};