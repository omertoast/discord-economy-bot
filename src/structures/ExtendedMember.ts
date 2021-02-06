import { prisma, redis } from '../app'
import { Structures, Client, Guild } from 'discord.js'

Structures.extend('GuildMember', GuildMember => {
  class ExtendedGuildMember extends GuildMember {
    constructor(client: Client, data: object, guild: Guild) {
      super(client, data, guild)
    }

    async addBalance (amount: number): Promise<any> {
      await redis.zadd(this.guild.id, 'INCR', amount, this.id)

      await prisma.member.upsert({
        where: { id_memberGuildId: {id: this.id, memberGuildId: this.guild.id}},
        update: { balance: {increment: amount} },
        create: { 
          id: this.id,
          memberGuildId: this.guild.id,
          balance: amount
        }
      })   
    }
    
    async getBalance (): Promise<number> {
      // Check if the user already cached
      let balance: any = await redis.zscore(this.guild.id, this.id)

      if (!balance) { 
        this.isCached()
        balance = await redis.zscore(this.guild.id, this.id)
      }

      return Math.floor(Number(balance))
    }

    async getRank (): Promise<any> {
      const rank = await redis.zrevrank(this.guild.id, this.id)
      
      if (!rank) {
        await this.isCached()

        const newRank = (await redis.zrevrank(this.guild.id, this.id))
        return newRank?.toString() || console.error("hay amına koyayım")
      }

      return rank.toString()
    }

    async isCached (): Promise<any> {
      const data = { id: this.id, memberGuildId: this.guild.id}
      const user = await prisma.member.findUnique({
        where: {id_memberGuildId: { id: this.id, memberGuildId: this.guild.id}}
      })

      if (!user) {
        await prisma.member.create({
          data: {
            id: this.id,
            balance: 1.0,
            memberGuildId: this.guild.id
          }
        })

        return await redis.zadd(this.guild.id, 1, this.id)
      }

      await redis.zadd(this.guild.id, user.balance, this.id)
    }

  }

  return ExtendedGuildMember;
})


// It could be on cache
// It could be not registered