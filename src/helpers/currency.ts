import { User } from '@prisma/client'
import { Collection } from 'discord.js'
import { prisma } from '../app'

class Currency extends Collection<string, User> {
  constructor() {
    super()
  }
  static async check(id: string): Promise<User> {
    let user = currency.get(id)

    if (!user) {
      return user = await prisma.user.create({
        data: {
          id: id,
          balance: 1.00
        }
      })
    }

    return user
  }

  async add(id: string, amount: number): Promise<any> {
    const user = await Currency.check(id)

    return await prisma.user.update({
      where: { id: id },
      data: { balance: user.balance += amount }
    })
  }

  async getBalance(id: string): Promise<number> {
    const user = await Currency.check(id)
    return user.balance
  }
}

export const currency = new Currency()