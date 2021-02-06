import { Client, Structures, TextChannel, GuildMember } from "discord.js";

Structures.extend('Message', Message => {
  class ExtendedMessage extends Message {
    mauthor: GuildMember
    constructor(client: Client, data: object, channel: TextChannel) {
      super(client, data, channel)
      this.mauthor = this.member!
    }
  }
  return ExtendedMessage
})