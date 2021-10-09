const { prefix } = require('../config.json');
const fs = require('fs');
const data = require('../shared/mousehunt-queue.json')

const readme = `Beep boop, boop beep! :robot:

Currently sniping Cinder 0, Igna 0, Smol 5, Mild 10
[Please don't send the SB upfront]

To begin, please type \`.s\` followed by \`yourNameInGame\` and \`mice\`, ie.
\`\`\`.s bartolomeus cinder
.s delphito cinder_igna_brut\`\`\`
After that, don't forget to invite my creator :arrow_down: to your map!

Name: Bartolomeus Delphito
ID: 4484502
URL: https://www.mousehuntgame.com/p.php?id=4484502

Feel free to look for other sniper if my creator haven't joined yet. If somehow my creator finds that your map has been sniped, he will look for the next queue

These are the commands that I understand:
\`\`\`.s queue -> see queue
.s cancel <name> -> canceling sniping\`\`\`
As I was born yesterday, I cannot understand human language perfectly. So if you have something in mind, don't hesitate to contact my creator`

module.exports = {
  name: `${prefix}s`,
  description: `Mousehunt Sniping`,
  execute(msg, args) {
    const name = args[0]
    const mice = args[1]

    if (!args[0]) {
      return msg.author.send(readme)
    }

    if (args[0] === 'queue') {
      let messages = `There are currently ${data.queues.length} queue(s)\n`
      data.queues.forEach((queue, idx) => {
        messages += `${idx + 1}. ${queue.mice}\n`
      });
      return msg.author.send(messages)
    }

    if (args[0] === 'cancel') {
      const canceledName = args[1]

      // filter to send to cancelled
      data.queues.forEach(queue => {
        if (queue.name === canceledName) {
          data.cancelled.push(queue)
        }
      });

      // filter method to remove
      const filteredQueues = data.queues.filter(queue => queue.name !== canceledName)
      data.queues = filteredQueues

      // write
      fs.writeFileSync('./shared/mousehunt-queue.json', JSON.stringify(data, null, 2), 'utf8')

      return msg.author.send(`Successfully cancelling **${canceledName}**'s!`)
    }

    if (args[0] === '.complete') {
      const completedname = args[1]

      // filter to send to completed
      data.queues.forEach(queue => {
        if (queue.name === completedname) {
          data.completed.push(queue)
        }
      });

      // filter method to remove
      const filteredQueues = data.queues.filter(queue => queue.name !== completedname)
      data.queues = filteredQueues

      // write
      fs.writeFileSync('./shared/mousehunt-queue.json', JSON.stringify(data, null, 2), 'utf8')

      return msg.author.send(`Successfully updated!`)
    }

    if (args[0] === '.dev') {
      const messages = JSON.stringify(data, null, 2)
      return msg.author.send('```json\n' + messages + '\n```')
    }

    if (args[2]) {
      const messages = `Beep boop, boop beep!\n`
      + `I'm not sure I understand your command perfectly. Did you separate words by <space> and <underscore> perfectly?`
      return msg.author.send(messages)
    }

    data.counter++
    data.queues.push({ id: data.counter, name: name, mice: mice })
    fs.writeFileSync('./shared/mousehunt-queue.json', JSON.stringify(data, null, 2), 'utf8')
    msg.author.send(`Alright, got it! I'll let my creator know to snipe **${mice}** with map's name **${name}**`)
  }
};