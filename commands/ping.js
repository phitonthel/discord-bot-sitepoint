const { prefix } = require('../config.json');

module.exports = {
  name: `${prefix}hi!`,
  description: 'Beep boop, boop beep!',
  execute(msg, args) {
    msg.reply('Beep boop, boop beep!');
  },
};
