const Discord = require('discord.js');

module.exports = {
  name: 'ucthat',
  description: 'Run a UC that!',
  execute(msg, args) {
    const attachment = new Discord.MessageAttachment('https://i.imgur.com/PN6nMJa.jpg', {})
    msg.channel.send(attachment);
  },
};
