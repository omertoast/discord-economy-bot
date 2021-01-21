import { currency } from '../helpers/currency'
import { Command } from '../app'

const command: Command = {
  name: 'bakiye',
  description: 'Kaç GISK\'e sahip olduğunuzu görebilmenizi sağlar.',
  args: false,
  guildOnly: false,
  async execute(message) {
    const target = message.mentions.users.first() || message.author
    return message.channel.send(`${target} has ${(await currency.getBalance(target.id)).toString()} GISK 💰`)
  }
}

export = command