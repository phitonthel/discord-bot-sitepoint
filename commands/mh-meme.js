const { prefix } = require('../config.json');

const desc = `Create a mousehunt meme!
Choose an argument:
<> ucthat
<> stinks
<> rngesus
<> why`

module.exports = {
  name: `${prefix}mh`,
  description: desc,
  execute(msg, args) {
    const arg = args[0]

    // validation
    if (!arg) {
      msg.channel.send(desc)
    }

    if (arg === 'ucthat') {
      msg.channel.send({
        files: [{
          attachment: 'https://i.imgur.com/PN6nMJa.jpg',
          name: 'ucthat.png'
        }]
      })
    }

    if (arg === 'stinks') {
      msg.channel.send({
        files: [{
          attachment: 'https://ib.downloadapk.net/unstonks+k_trN2YffH_150.png',
          name: 'stinks.png'
        }]
      })
    }

    if (arg === 'rngesus') {
      msg.channel.send({
        files: [{
          attachment: 'https://i.pinimg.com/originals/b0/38/8c/b0388cce1540f49543711b5aee696050.png',
          name: 'rngesus.png'
        }]
      })
    }

    if (arg === 'why') {
      msg.channel.send({
        files: [{
          attachment: 'https://i.pinimg.com/originals/16/47/8d/16478dff79d566ccb958bbf6ea1c1ba3.png',
          name: 'why.png'
        }]
      })
    }
  }
};
