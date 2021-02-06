import { Message } from "discord.js";

declare module 'discord.js' {
  interface GuildMember {
    addBalance(amount:number): Promise<void>
    getBalance(): Promise<number>
    isCached(): Promise<void>
    getRank(): Promise<string>
  }

  interface Guild {
    /* Includes start, excludes stop*/
    getLeaderboard(start: number, stop: number): Promise<any>
    createItem(name: string, description: string, type: number, duration: number): Promise<any>
  }

  interface Command {
    name: string,
	  description?: string,
    args: boolean,
	  aliases?: string[],
	  usage?: string,
	  cooldown?: number,
    execute: (message: Message, args: string[]) => any
  }

  interface Message {
    mauthor: GuildMember
  }
}

