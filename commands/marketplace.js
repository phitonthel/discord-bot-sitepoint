const { prefix } = require('../config.json');
const fs = require('fs');
const fsPath = '../shared/mousehunt-marketplace.json'

module.exports = {
  name: `$`,
  description: `Marketplace`,
  execute(msg, args) {
    const authorID = msg.author.id

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
    for (const item in newData.buy) {
      if (Object.hasOwnProperty.call(newData.buy, item)) {
        const listing = newData.buy[item];
        for (const ID in data) {
          if (Object.hasOwnProperty.call(data, ID)) {
            const otherUserData = data[ID];
            if (otherUserData.sell < listing) {
              mentionedUsers.push(ID)
            }
          }
        }
      }
    }
    for (const item in newData.sell) {
      if (Object.hasOwnProperty.call(newData.sell, item)) {
        const listing = newData.sell[item];
        for (const ID in data) {
          if (Object.hasOwnProperty.call(data, ID)) {
            const otherUserData = data[ID];
            if (otherUserData.buy > listing) {
              mentionedUsers.push(ID)
            }
          }
        }
      }
    }

    fs.writeFileSync(fsPath, JSON.stringify(data, null, 2), 'utf8')

    // parse mentioned Users
    let mentionedUsersSTR = ``
    mentionedUsers.forEach(mentionedUser => {
      mentionedUsersSTR += `<@${mentionedUser}> `
    });


    msg.channel.send(`<@${authorID}>'s new listings have something that interest you:
    ${JSON.stringify(newData)}
    ${mentionedUsersSTR}`)
  }
};