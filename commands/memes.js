module.exports = {
  name: 'ucthat!',
  description: 'Run a UC that!',
  execute(msg, args) {
    msg.channel.send({
      files: [{
        attachment: 'https://i.imgur.com/PN6nMJa.jpg',
        name: 'ucthat.png'
      }]
    })
  },
  name: 'stinks!',
  description: 'Un-Stonks!',
  execute(msg, args) {
    msg.channel.send({
      files: [{
        attachment: 'https://ib.downloadapk.net/unstonks+k_trN2YffH_150.png',
        name: 'stinks.png'
      }]
    })
  },
};
