const { prefix } = require('../config.json');
const axios = require('axios')
const desc = `Create a random meme from reddit
  Takes 1 argument:
  <> number_of_memes: number [optional]`

module.exports = {
  name: `${prefix}meme`,
  description: desc,
  execute(msg, args) {
    const arg = args[0]

    if (!arg) {
      axios.get('https://meme-api.herokuapp.com/gimme')
        .then((response) => {
          console.log('response=', response);
          const length = response.data.preview.length
          msg.channel.send({
            files: [{
              attachment: `${response.data.preview[length - 1]}`,
              name: `${response.data.title}.jpg`
            }]
          })
        })
    }

    if (arg <= 10) {
      axios.get(`https://meme-api.herokuapp.com/gimme/${arg}`)
        .then((response) => {
          console.log('response=', response);
          response.data.memes.forEach(meme => {
            const length = meme.preview.length
            msg.channel.send({
              files: [{
                attachment: `${meme.preview[length - 1]}`,
                name: `${meme.title}.jpg`
              }]
            })
          });
        })
    }

    if (arg > 10) {
      msg.channel.send(`Can only send max 5 memes`)
    }

  }
};
