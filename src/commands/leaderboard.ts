import { Message, MessageEmbed, Command } from "discord.js";

const command:Command = {
  name: 'leaderboard',
  aliases: ['lb'],
  description: '',
  args: false,
  async execute(message: Message) {
    const rank = await message.mauthor.getRank()

    const ranks = await message.mauthor.guild.getLeaderboard()
    const embed = new MessageEmbed()
      .setAuthor(`${message.guild!.name} Leaderboard` , message.guild!.iconURL()!)
      .setDescription("En yüksek bakiyeye sahip olan ilk 10 kullanıcı:")
      .addField(rank, nickname , score)
      .addField()
      .addField()
      .addField()
      .addField()
      .addField()
      .addField()
      .addField()
      .addField()
      .addField()
      .setTimestamp()
      .setFooter(`Leaderboard rankınız: ${rank}`)

    return message.channel.send({embed})
  }
}