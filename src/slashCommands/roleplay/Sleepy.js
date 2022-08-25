const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const EmbedConfig = require('../../configs/embeds.json');
const fetch = require('node-fetch');
const Token = process.env['KAWAII_TOKEN'];

module.exports = {
	name: 'sleepy',
	description: 'Sends a gif of someone who is sleepy',
	category: 'roleplay',
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

			const ImageEmbed = new EmbedBuilder();

			const img = await fetch(`https://kawaii.red/api/gif/sleepy/token=${Token}&type=json/`)
				.then(res => res.json()).catch(err => {
					console.log(err);
				});

			ImageEmbed.setTitle(`❯ ${interaction.user.username} is sleepy`);
			ImageEmbed.setImage(img.response);
			ImageEmbed.setFooter({ text: EmbedConfig.EmbedFooterImageAPI, iconURL: EmbedConfig.EmbedFooterIcon });
			ImageEmbed.setColor(`#${EmbedConfig.EmbedColorReady}`);

			await interaction.editReply({ content: ' ', embeds: [ImageEmbed] });

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