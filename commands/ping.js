const { prefix } = require('../config.json');

module.exports = {
  name: `${prefix}ping`,
  description: 'Return a pong!',
  execute(msg, args) {
    msg.reply('pong');
  },
};
