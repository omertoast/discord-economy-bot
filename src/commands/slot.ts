import { MessageEmbed, Message, Command } from 'discord.js'

const command: Command = {
  name: 'slot',
  description: 'Slot Makinesi',
  args: true,
  async execute(message: Message, args: string[]) {
    // Variables
    var bet = Number(args[0])
    var extra = args[1]
    var minAllowedBet = Number(5)
    var author = message.author
    //const oldBalance = await author.getBalance()

    if (extra != null) {
      return message.reply("No junk please, my owner feeds me enough.")
    }

    // Check if valid bet.
    if (bet < minAllowedBet) {
      return message.reply("Im sorry you can not bet that amount! MIN 5.");
    }
    if (args[0] == null) {
      return message.reply("Sorry you must include a bet to play.")
    }
    var ifNeg = Math.sign(bet).toString()
    if (ifNeg == "-1") {
      return message.reply("You can't bet a negative amount.");
    }
    if(isNaN(bet)){
      return message.reply("Don't try to bet non numbers.");
    }
    if(await message.mauthor.getBalance() < bet) {
      return message.reply('fakir')
    }

    message.mauthor.addBalance( -bet )

    // Spin Results:
    var slot1 = [':trophy:',':hot_pepper:',':gem:',':slot_machine:',':moneybag:',':microbe:',':ocean:'];
    var slot2 = [':trophy:',':hot_pepper:',':gem:',':slot_machine:',':moneybag:',':microbe:',':ocean:'];
    var slot3 = [':trophy:',':hot_pepper:',':gem:',':slot_machine:',':moneybag:',':microbe:',':ocean:'];

    // Row 1:
    var rand1 = slot1[(Math.random() * slot1.length) | 0];
    var rand2 = slot2[(Math.random() * slot2.length) | 0];
    var rand3 = slot3[(Math.random() * slot3.length) | 0];
    const data1:string = rand1 + "  |  " + rand2 + "  |  " + rand3

    // Row 2:
    var rand4 = slot1[(Math.random() * slot1.length) | 0];
    var rand5 = slot2[(Math.random() * slot2.length) | 0];
    var rand6 = slot3[(Math.random() * slot3.length) | 0];
    const data2:string = rand4 + "  |  " + rand5 + "  |  " + rand6

    // Row 3:
    var rand7 = slot1[(Math.random() * slot1.length) | 0];
    var rand8 = slot2[(Math.random() * slot2.length) | 0];
    var rand9 = slot3[(Math.random() * slot3.length) | 0];
    const data3:string = rand7 + "  |  " + rand8 + "  |  " + rand9

    // Prize logic:
    // rand1 rand2 rand3
    // rand4 rand5 rand6
    // rand7 rand8 rand9

    // Prize List:
    // Each line multiplies the win.

    // Row wins & Empty Arrays:
    var rowWin = "";
    var winCount = "";

    // TO-DO: change the hardcoded combinations to a class and increase the chance of winning

    // Row wins:
    if (rand1 == ":slot_machine:" && rand2 == ":slot_machine:" && rand3 == ":slot_machine:") {rowWin += " :slot_machine: Row 1 was a winner!"; winCount += "xxx";}
    if (rand4 == ":slot_machine:" && rand5 == ":slot_machine:" && rand6 == ":slot_machine:") {rowWin += " :slot_machine: Row 2 was a winner!"; winCount += "xxx";}
    if (rand7 == ":slot_machine:" && rand8 == ":slot_machine:" && rand9 == ":slot_machine:") {rowWin += " :slot_machine: Row 3 was a winner!"; winCount += "xxx";}
    if (rand1 == ":trophy:" && rand2 == ":trophy:" && rand3 == ":trophy:") {rowWin += " :trophy: Row 1 was a winner!"; winCount += "xxx";}
    if (rand4 == ":trophy:" && rand5 == ":trophy:" && rand6 == ":trophy:") {rowWin += " :trophy: Row 2 was a winner!"; winCount += "xxx";}
    if (rand7 == ":trophy:" && rand8 == ":trophy:" && rand9 == ":trophy:") {rowWin += " :trophy: Row 3 was a winner!"; winCount += "xxx";}
    if (rand1 == ":hot_pepper:" && rand2 == ":hot_pepper:" && rand3 == ":hot_pepper:") {rowWin += " :hot_pepper: Row 1 was a winner!"; winCount += "xx";}
    if (rand4 == ":hot_pepper:" && rand5 == ":hot_pepper:" && rand6 == ":hot_pepper:") {rowWin += " :hot_pepper: Row 2 was a winner!"; winCount += "xx";}
    if (rand7 == ":hot_pepper:" && rand8 == ":hot_pepper:" && rand9 == ":hot_pepper:") {rowWin += " :hot_pepper: Row 3 was a winner!"; winCount += "xx";}
    if (rand1 == ":gem:" && rand2 == ":gem:" && rand3 == ":gem:") {rowWin += " :gem: Row 1 was a winner!"; winCount += "xx";}
    if (rand4 == ":gem:" && rand5 == ":gem:" && rand6 == ":gem:") {rowWin += " :gem: Row 2 was a winner!"; winCount += "xx";}
    if (rand7 == ":gem:" && rand8 == ":gem:" && rand9 == ":gem:") {rowWin += " :gem: Row 3 was a winner!"; winCount += "xx";}
    if (rand1 == ":moneybag:" && rand2 == ":moneybag:" && rand3 == ":moneybag:") {rowWin += " :moneybag: Row 1 was a winner!"; winCount += "x";}
    if (rand4 == ":moneybag:" && rand5 == ":moneybag:" && rand6 == ":moneybag:") {rowWin += " :moneybag: Row 2 was a winner!"; winCount += "x";}
    if (rand7 == ":moneybag:" && rand8 == ":moneybag:" && rand9 == ":moneybag:") {rowWin += " :moneybag: Row 3 was a winner!"; winCount += "x";}
    if (rand1 == ":microbe:" && rand2 == ":microbe:" && rand3 == ":microbe:") {rowWin += " :microbe: Row 1 was a winner!"; winCount += "x";}
    if (rand4 == ":microbe:" && rand5 == ":microbe:" && rand6 == ":microbe:") {rowWin += " :microbe: Row 2 was a winner!"; winCount += "x";}
    if (rand7 == ":microbe:" && rand8 == ":microbe:" && rand9 == ":microbe:") {rowWin += " :microbe: Row 3 was a winner!"; winCount += "x";}

    // Vertical wins
    if (rand1 == ":slot_machine:" && rand4 == ":slot_machine:" && rand7 == ":slot_machine:") {rowWin += " :slot_machine: Vertical Win!"; winCount += "xxx";}
    if (rand2 == ":slot_machine:" && rand5 == ":slot_machine:" && rand8 == ":slot_machine:") {rowWin += " :slot_machine: Vertical Win!"; winCount += "xxx";}
    if (rand3 == ":slot_machine:" && rand6 == ":slot_machine:" && rand9 == ":slot_machine:") {rowWin += " :slot_machine: Vertical Win!"; winCount += "xxx";}
    if (rand1 == ":trophy:" && rand4 == ":trophy:" && rand7 == ":trophy:") {rowWin += " :trophy: Vertical Win!"; winCount += "xxx";}
    if (rand2 == ":trophy:" && rand5 == ":trophy:" && rand8 == ":trophy:") {rowWin += " :trophy: Vertical Win!"; winCount += "xxx";}
    if (rand3 == ":trophy:" && rand6 == ":trophy:" && rand9 == ":trophy:") {rowWin += " :trophy: Vertical Win!"; winCount += "xxx";}
    if (rand1 == ":hot_pepper:" && rand4 == ":hot_pepper:" && rand7 == ":hot_pepper:") {rowWin += " :hot_pepper: Vertical Win!"; winCount += "xx";}
    if (rand2 == ":hot_pepper:" && rand5 == ":hot_pepper:" && rand8 == ":hot_pepper:") {rowWin += " :hot_pepper: Vertical Win!"; winCount += "xx";}
    if (rand3 == ":hot_pepper:" && rand6 == ":hot_pepper:" && rand9 == ":hot_pepper:") {rowWin += " :hot_pepper: Vertical Win!"; winCount += "xx";}
    if (rand1 == ":gem:" && rand4 == ":gem:" && rand7 == ":gem:") {rowWin += " :gem: Vertical Win!"; winCount += "xx";}
    if (rand2 == ":gem:" && rand5 == ":gem:" && rand8 == ":gem:") {rowWin += " :gem: Vertical Win!"; winCount += "xx";}
    if (rand3 == ":gem:" && rand6 == ":gem:" && rand9 == ":gem:") {rowWin += " :gem: Vertical Win!"; winCount += "xx";}
    if (rand1 == ":moneybag:" && rand4 == ":moneybag:" && rand7 == ":moneybag:") {rowWin += " :moneybag: Vertical Win!"; winCount += "x";}
    if (rand2 == ":moneybag:" && rand5 == ":moneybag:" && rand8 == ":moneybag:") {rowWin += " :moneybag: Vertical Win!"; winCount += "x";}
    if (rand3 == ":moneybag:" && rand6 == ":moneybag:" && rand9 == ":moneybag:") {rowWin += " :moneybag: Vertical Win!"; winCount += "x";}
    if (rand1 == ":microbe:" && rand4 == ":microbe:" && rand7 == ":microbe:") {rowWin += " :microbe: Vertical Win!"; winCount += "x";}
    if (rand2 == ":microbe:" && rand5 == ":microbe:" && rand8 == ":microbe:") {rowWin += " :microbe: Vertical Win!"; winCount += "x";}
    if (rand3 == ":microbe:" && rand6 == ":microbe:" && rand9 == ":microbe:") {rowWin += " :microbe: Vertical Win!"; winCount += "x";}

    // Diagonal wins:
    if (rand1 == ":slot_machine:" && rand5 == ":slot_machine:" && rand9 == ":slot_machine:") {rowWin += " :slot_machine: Diagonal Win!"; winCount += "xxx";}
    if (rand3 == ":slot_machine:" && rand5 == ":slot_machine:" && rand7 == ":slot_machine:") {rowWin += " :slot_machine: Diagonal Win!"; winCount += "xxx";}
    if (rand1 == ":trophy:" && rand5 == ":trophy:" && rand9 == ":trophy:") {rowWin += " :trophy: Diagonal Win!"; winCount += "xxx";}
    if (rand3 == ":trophy:" && rand5 == ":trophy:" && rand7 == ":trophy:") {rowWin += " :trophy: Diagonal Win!"; winCount += "xxx";}
    if (rand1 == ":hot_pepper:" && rand5 == ":hot_pepper:" && rand9 == ":hot_pepper:") {rowWin += " :hot_pepper: Diagonal Win!"; winCount += "xx";}
    if (rand3 == ":hot_pepper:" && rand5 == ":hot_pepper:" && rand7 == ":hot_pepper:") {rowWin += " :hot_pepper: Diagonal Win!"; winCount += "xx";}
    if (rand1 == ":gem:" && rand5 == ":gem:" && rand9 == ":gem:") {rowWin += " :gem: Diagonal Win!"; winCount += "xx";}
    if (rand3 == ":gem:" && rand5 == ":gem:" && rand7 == ":gem:") {rowWin += " :gem: Diagonal Win!"; winCount += "xx";}
    if (rand1 == ":moneybag:" && rand5 == ":moneybag:" && rand9 == ":moneybag:") {rowWin += " :moneybag: Diagonal Win!"; winCount += "x";}
    if (rand3 == ":moneybag:" && rand5 == ":moneybag:" && rand7 == ":moneybag:") {rowWin += " :moneybag: Diagonal Win!"; winCount += "x";}
    if (rand1 == ":microbe:" && rand5 == ":microbe:" && rand9 == ":microbe:") {rowWin += " :microbe: Diagonal Win!"; winCount += "x";}
    if (rand3 == ":microbe:" && rand5 == ":microbe:" && rand7 == ":microbe:") {rowWin += " :microbe: Diagonal Win!"; winCount += "x";}
    if (rand1 == ":ocean:" && rand5 == ":ocean:" && rand9 == ":ocean:") {rowWin += " :ocean: Diagonal Win!"; winCount += "x";}
    if (rand3 == ":ocean:" && rand5 == ":ocean:" && rand7 == ":ocean:") {rowWin += " :ocean: Diagonal Win!"; winCount += "x";}
    // No wins:
    if (rowWin === "") {var rowWin = "No wins this spin, try again!";}

    // Prize Win logic
    var winsAmount = winCount.length;

    if (winCount === "") {
      var wonAmount = 0
    } else {
      var wonAmount = (Number(bet) * Number(winsAmount));
      message.mauthor.addBalance(wonAmount)
    }

    if (winsAmount == 0) {
      // Send embed
      const embed = new MessageEmbed()
        .setThumbnail('https://i.imgur.com/uqR42KF.png')
        .setAuthor(author.username, author.avatarURL()!)
        .setColor('RED')
        //.setFooter(miscSettings.footerBranding, miscSettings.img32x32)
        .setTitle('Slot Makinesi')
        .setDescription(` \n${data1}\n \n${data2}\n \n${data3}`)
        //.addField("Slot Makinesi", ` \n${data1}\n \n${data2}\n \n${data3}`)
        .addField("Bahis:", bet.toString() + " GISK", true)
        .addField("Kazanç:", wonAmount.toString() + " GISK", true)
        .setTimestamp()

        return message.channel.send({embed});

    } else {
      // Send embed
      const embed = new MessageEmbed()
        .setAuthor(author.username , author.avatarURL()!)

        .setColor('GREEN')
        //.setFooter(miscSettings.footerBranding, miscSettings.img32x32)
        .setThumbnail('https://i.imgur.com/uqR42KF.png')

        .setTimestamp()
        .addField("Slot Makinesi", `\n${data1}\n \n${data2}\n \n${data3}`)
        .addField("Bahis:", bet.toString() + " GISK", true)
        .addField("Kazanç:", `${wonAmount.toString()} GISK (x${winsAmount})`, true)

        return message.channel.send({embed});
    }
  }
}

export = command