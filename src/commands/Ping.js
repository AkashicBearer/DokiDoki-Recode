const { SlashCommandBuilder, EmbedBuilder, Client, Interaction } = require('discord.js');
const EmbedConfig = require('../configs/embeds.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDMPermission(false)
		.setDescription('Replies with Pong!'),
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

			const Ping = new Date - interaction.createdTimestamp;

			const PingEmbed = new EmbedBuilder()
				.setTitle('❯ Ping Response')
				.setDescription(`🏓 ${Ping}ms`)
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

		}

	},

};