const { prefix } = require('../config.json');
const fs = require('fs');
const fsPath = '../shared/mousehunt-marketplace.json'

module.exports = {
  name: `$`,
  description: `Marketplace`,
  async execute(msg, args, bot) {
    const authorID = msg.author.id
    const authorUsername = msg.author.username

    // custom args
    args = msg.content.replace(new RegExp('\n', 'g'), ' ').split(/ +/);

    // init
    const newData = { buy: {}, sell: {} }
    let data = {}
    fs.existsSync(fsPath)
      ? data = require('../../shared/mousehunt-marketplace.json')
      : fs.writeFileSync(fsPath, JSON.stringify(data, null, 2), 'utf8')

    if (!data[authorID]) {
      data[authorID] = {
        buy: {},
        sell: {}
      }
    }

    // status command
    if (args[1].toLowerCase() == 'status') {
      let messages = "\`\`\`json\n" + JSON.stringify(data[authorID], null, 4) + "\`\`\`"
      msg.author.send(messages)
      return
    }

    // delete command
    if (args[1].toLowerCase() == 'delete') {
      action = args[2].toLowerCase()
      item = args[3]
      if (action !== 'buy' && action !== 'sell') {
        return msg.author.send(`Please provide buy/sell as a third argument!
        ie: $ delete sell aej`)
      }
      if (!item) {
        return msg.author.send(`Please provide item as a fourth argument!
        ie: $ delete sell aej`)
      }
      delete data[authorID][action][item]
      fs.writeFileSync(fsPath, JSON.stringify(data, null, 2), 'utf8')
      msg.author.send(`Your ${item} has been deleted!`)
      return
    }

    // destroy command
    if (args[1].toLowerCase() == 'destroy') {
      data[authorID] = {
        buy: {},
        sell: {},
        timestamp: Math.floor((new Date()).getTime() / 1000),
      }
      fs.writeFileSync(fsPath, JSON.stringify(data, null, 2), 'utf8')
      msg.author.send(`Destroyed!`)
      return
    }

    // add timestamp
    data[authorID].timestamp = Math.floor((new Date()).getTime() / 1000)

    args.forEach((arg, index) => {
      if (arg == 'b>') {
        data[authorID].buy[args[index + 1]] = args[index + 2]
        newData.buy[args[index + 1]] = args[index + 2]
      }
      if (arg == 's>') {
        data[authorID].sell[args[index + 1]] = args[index + 2]
        newData.sell[args[index + 1]] = args[index + 2]
      }
    });

    // filter - matchmaking
    const mentionedUsers = []

    // loop in newData buy
    for (const newItem in newData.buy) {
      if (Object.hasOwnProperty.call(newData.buy, newItem)) {
        const price = newData.buy[newItem];

        // loop in database
        for (const userID in data) {
          if (Object.hasOwnProperty.call(data, userID)) {
            const userData = data[userID];

            if (+userData.sell[newItem] <= +price) {
              mentionedUsers.push(userID)
            }
          }
        }
      }
    }

    // loop in newData sell
    for (const newItem in newData.sell) {
      if (Object.hasOwnProperty.call(newData.sell, newItem)) {
        const price = newData.sell[newItem];

        // loop in database
        for (const userID in data) {
          if (Object.hasOwnProperty.call(data, userID)) {
            const userData = data[userID];

            if (+userData.sell[newItem] >= +price) {
              mentionedUsers.push(userID)
            }
          }
        }
      }
    }

    fs.writeFileSync(fsPath, JSON.stringify(data, null, 2), 'utf8')
    const members = await bot.guilds.get('895950998667952129').fetchMembers() // TA

    // notify other users about the author post
    mentionedUsers.forEach(mentionedUser => {
      let messages = `[ID: <@${authorID}>] ${authorUsername}'s' new listing have something that may interest you:`
      messages += "\`\`\`json\n"  + JSON.stringify(newData, null, 4) + "\`\`\`"

      // send
      bot.users.get(mentionedUser).send(messages);
    });

    // notify the author
    msg.author.send(`Posted! I'll notify all the previous users that matches your listing. To check your status, type: \`$ status\``)

    // parse mentioned Users
    // let mentionedUsersSTR = ``
    // mentionedUsers.forEach(mentionedUser => {
    //   mentionedUsersSTR += `<@${mentionedUser}> `
    // });

    // msg.channel.send(`<@${authorID}>'s new listings have something that may interest you:
    // ${JSON.stringify(newData)}
    // ${mentionedUsersSTR}`)
  }
};