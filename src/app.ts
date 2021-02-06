import { PrismaClient } from '@prisma/client'
import { Message, Client, Command } from 'discord.js'
import { readdirSync } from 'fs'
import { Collection } from 'discord.js';
import Redis from 'ioredis'

import './structures/ExtendedMember'
import './structures/ExtendedMessage'

export const prisma = new PrismaClient()
export const redis = new Redis(process.env.REDIS_DATABASE_URL) 
export const client = new Client()
const PREFIX = '!'

// Get commands from commands file
const commandFiles = readdirSync('./commands')

// Create a collection for commands
const commands = new Collection<string, Command>()

// Set commands 
for (const file of commandFiles) {
	const command: Command = require(`./commands/${file}`)
	commands.set(command.name, command)
}

// Start the bot
client.once('ready', async () => {
	redis.flushall()

	client.guilds.cache.forEach(async guild => {
		await prisma.guild.upsert({
			where: {id: guild.id},
			update: {},
			create: {id: guild.id}
		})
	})

	const storedBalances = await prisma.member.findMany()

  const pipeline = redis.pipeline()
  storedBalances.forEach(user => pipeline.zadd(user.memberGuildId, user.balance, user.id))
	await pipeline.exec().catch(err => console.log(err))

	console.log(`Logged in as ${client.user!.tag}!`)
})

client.on('message', async (message: Message) => {
	// TO-DO
	// Add cooldown to commands
	// Allow users to use commands only in specific channels

	// Filter Messages
	if (message.author.bot) return
	if (message.channel.type == 'dm') return

	// Give money to user per message
	await message.member!.addBalance(1.00)

	// Check if the message is an attempt to run a command or not (check the prefix)
	if (!message.content.startsWith(PREFIX)) return

	// Seperate command args from commands by making an args array
	const args = message.content.slice(PREFIX.length).trim().split(/ +/)

	// Seperate the name of the command that user trying to use
	const commandName = args.shift()!.toLowerCase()

	// Check if the command or command aliase exist
	const command = commands.get(commandName) || commands.find(cmd => cmd.aliases! && cmd.aliases.includes(commandName))
	if (!command) return

	try {
		command.execute(message, args)
	} catch (error) {
		console.error(error)
		message.reply('there was an error trying to execute that command!');
	}
})

client.login(process.env.TOKEN)
