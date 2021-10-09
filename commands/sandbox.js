const { prefix } = require('../config.json');

module.exports = {
  name: `${prefix}sb`,
  description: `Sandbox`,
  execute(msg, args) {
    console.log(msg.author);
    console.log(args);
    msg.channel.send(`Sandbox!`)
    // msg.channel.send({
    //   files: [{
    //     attachment: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1397401934l/13058009.jpg',
    //     name: 'cat.jpg'
    //   }]
    // })
  }
};