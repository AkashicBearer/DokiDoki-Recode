const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const EmbedConfig = require('../../configs/embeds.json');

module.exports = {
	name: 'avatar',
	description: 'Shows selected users avatar',
	category: 'util',
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	options: [
		{
			name: 'user',
			description: 'concerned user',
			type: 6,
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

			const user = interaction.options.getUser('target');

			const AvatarEmbed = new EmbedBuilder();

			if (user) {

				AvatarEmbed.setTitle(`❯ ${user.username}`);
				AvatarEmbed.setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }));

			}
			else {

				AvatarEmbed.setTitle('❯ Your avatar');
				AvatarEmbed.setImage(interaction.user.displayAvatarURL({ dynamic: true, size: 2048 }));

			}

			AvatarEmbed.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon });
			AvatarEmbed.setColor(`#${EmbedConfig.EmbedColorReady}`);

			await interaction.editReply({ content: ' ', embeds: [AvatarEmbed] });

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