import { client, redis } from '../app'
import { MessageEmbed, Command } from 'discord.js'

const command: Command = {
  name: 'bakiye',
  description: 'Kaç GISK\'e sahip olduğunuzu görebilmenizi sağlar.',
  args: false,
  async execute(message) {
    const cash = (await message.mauthor.getBalance()).toString() 
    const rank = await message.mauthor.getRank()
    const embed = new MessageEmbed() 
      .setDescription(`Leaderboard Rank: ${rank}`)
      .setAuthor(message.author.username , message.author.avatarURL()!)
      .setColor('BLUE')
      .addField('Bakiye:', `${cash} GISK`)
      .setTimestamp()
    return message.channel.send({embed})
  }
}

export = command