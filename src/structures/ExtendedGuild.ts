import { prisma, redis } from 'app'
import { Structures, Guild, Client } from 'discord.js'

Structures.extend('Guild', Guild => {
  class ExtendedGuild extends Guild {
    constructor(client: Client, data: object) {
      super(client, data)
    }

    //async getLeaderboard (start: number, stop: number): Promise<any> {
      //const ranks = await redis.zrevrangebyscore(this.id, start, stop, "WITHSCORES")

      //ranks.split()
    //}

    async createItem (name: string, description: string, type: number, args: string, duration: number) {
      return await prisma.item.create({
       data: {
          name: name,
          description: description,
          type: type,
          args: args,
          duration: duration,
          itemGuildId: this.id
        }
      })
    }
  }

  return ExtendedGuild
})

