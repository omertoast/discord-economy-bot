const config = require('../config');
import { PrismaClient, User } from '@prisma/client'
import { Message, Client } from 'discord.js'
import { currency } from './helpers/currency'
import { readdirSync } from 'fs'
import { Collection } from 'discord.js';

export const prisma = new PrismaClient()
const client = new Client()
const PREFIX = '!'

const commandFiles = readdirSync('src/commands')

export interface Command {
  name: string,
  description: string,
  args: boolean,
  guildOnly: boolean,
  usage?: string
  execute: (message: Message, args: string[]) => any
}

const commands = new Collection<string, Command>()

for (const file of commandFiles) {
	const command: Command = require(`./commands/${file}`)
	commands.set(command.name, command)
}

client.once('ready', async () => {
	const storedBalances = await prisma.user.findMany()
	storedBalances.forEach(user => currency.set(user.id, user))
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async (message: Message) => {
	if (message.author.bot) return
	//currency.add(message.author.id, 1.00)
	if (!message.content.startsWith(PREFIX)) return

	const args = message.content.slice(PREFIX.length).trim().split(/ +/)
	const commandName = args.shift().toLowerCase()

	if (!commands.has(commandName)) return

	const command = commands.get(commandName)

	try {
		command.execute(message, args)
	} catch (error) {
		console.error(error)
		message.reply('there was an error trying to execute that command!');
	}
})

client.login(config.token)
