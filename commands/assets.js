const { prefix } = require('../config.json');
const fs = require('fs');
const fsPath = '../shared/assets.json'

const H = require('./helpers/assets')

module.exports = {
  name: `${prefix}a`,
  description: `Assets`,
  async execute(msg, args, bot) {
    const authorID = msg.author.id
    const authorUsername = msg.author.username

    let data = {
      sequence: 0,
      assets: [],
      liabilities: []
    }
    fs.existsSync(fsPath)
      ? data = require('../../shared/assets.json')
      : fs.writeFileSync(fsPath, JSON.stringify(data, null, 2), 'utf8')

    // status command
    if (args[0] == 'status') {
      let messages = 'Please provide additional argument: <all/summary/author>'
      
      if (args[1] == 'all') {
        const message = JSON.stringify(data, null, 2)

        if (message.length >= 2000) {
          msg.channel.send({
            files: [{
              attachment: fsPath,
              name: `assets.txt`
            }]
          })
        } else {
          messages = "\`\`\`json\n" + JSON.stringify(data, null, 2) + "\`\`\`"
        }
      } 
      if (args[1] == 'summary') {
        const summary = H.createSummary(data)
        messages = "\`\`\`json\n" + JSON.stringify(summary, null, 2) + "\`\`\`"
      }
      if (args[1] == 'author') {
        const summary = H.createSummaryWithAuthor(data)
        messages = "\`\`\`json\n" + JSON.stringify(summary, null, 2) + "\`\`\`"
      }
      if (args[1] == 'SSD') {
        const summary = H.createSummarySSD(data)
        messages = "\`\`\`json\n" + JSON.stringify(summary, null, 2) + "\`\`\`"
      }
      msg.channel.send(messages)
      return
    }

    // add command
    if (args[0] == 'add') {
      const field = args[1] // liabilities or assets
      const name = args[2]
      const price = +args[3]
      const message = args.slice(4).join(' ')

      // validations
      if (field !== 'liabilities' && field !== 'assets') {
        return msg.channel.send('Invalid format! add <liabilities/assets> <name> <price> <message>')
      }

      data.sequence += 1
      data[field].push({
        id: data.sequence,
        name,
        price,
        date: ( new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' })  + ' | '
            + (new Date()).getHours() + ':'
            + (new Date()).getMinutes() + ':'
            + (new Date()).getSeconds()),
        author: authorUsername,
        message
      })

      data.totalAssets = H.calculateAssets(data)
      data.totalLiabilities = H.calculateLiabilitites(data)
      
      fs.writeFileSync(fsPath, JSON.stringify(data, null, 2), 'utf8')
      msg.channel.send('Added!')

      const summary = H.createSummary(data)

      let messages = "\`\`\`json\n" + JSON.stringify(summary, null, 2) + "\`\`\`"
      msg.channel.send(messages)

      return
    }

    // delete command
    if (args[0] == 'delete') {
      const id = +args[1]

      data.liabilities = data.liabilities.filter((item) => item.id !== id)
      data.assets = data.assets.filter((item) => item.id !== id)

      data.totalAssets = H.calculateAssets(data)
      data.totalLiabilities = H.calculateLiabilitites(data)

      fs.writeFileSync(fsPath, JSON.stringify(data, null, 2), 'utf8')

      msg.channel.send('Deleted!')

      const summary = H.createSummary(data)

      let messages = "\`\`\`json\n" + JSON.stringify(summary, null, 2) + "\`\`\`"
      msg.channel.send(messages)

      return
    }
  }
};