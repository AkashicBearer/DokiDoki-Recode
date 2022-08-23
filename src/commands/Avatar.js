const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const EmbedConfig = require('../configs/embeds.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Replies with your or a mentioned users avatar')
		.setDMPermission(false)
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
	/**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
	async execute(interaction) {

		try {

			const PrepEmbed = new EmbedBuilder()
				.setTitle('❯ Executing Given Command')
				.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon })
				.setColor(`#${EmbedConfig.EmbedColorPrep}`);

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

			await interaction.reply({ content: ' ', embeds: [ErrorEmbed] });

		}

	},

};