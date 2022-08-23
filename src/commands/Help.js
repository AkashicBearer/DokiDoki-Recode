const { SlashCommandBuilder, EmbedBuilder, Collection } = require('discord.js');
const fs = require('node:fs');
const EmbedConfig = require('../configs/embeds.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows all commands the bot has to offer')
		.setDMPermission(false),
	/**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   * @param {Collection} collection
   */
	async execute(interaction) {

		try {

			const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
			let str;
			for (const file of commandFiles) {
				const command = require(`./${file}`);
				str += `\n**${command.data.name}**: ${command.data.description}`;
			}

			console.log(str);

			function removeUndefinedValues(arr) {
				return arr.filter(x => x != undefined);
			}

			console.log(removeUndefinedValues(str));

			const PrepEmbed = new EmbedBuilder()
				.setTitle('❯ Executing Given Command')
				.setFooter({ text: EmbedConfig.EmbedFooter, iconURL: EmbedConfig.EmbedFooterIcon })
				.setColor(`#${EmbedConfig.EmbedColorPrep}`);
			const EmbedPrep = await interaction.reply({ content: ' ', embeds: [PrepEmbed] });

			const HelpEmbed = new EmbedBuilder();
			HelpEmbed.setDescription(`${str}`);
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
			await interaction.reply({ content: ' ', embeds: [ErrorEmbed] });

			console.log(e);

		}

	},

};