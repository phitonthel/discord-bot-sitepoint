const { prefix } = require('../config.json');
const fs = require('fs');

const data = fs.readFileSync('./shared/cantik.json', 'utf8')
const dataParsed = JSON.parse(data)
const medias = dataParsed.medias

module.exports = {
  name: `${prefix}cantik`,
  description: `Send a random beautiful picture from Instagram`,
  execute(msg, args) {
    const rand = Math.floor(Math.random() * medias.length)
    const media = medias[rand]
    msg.channel.send(`${media.text}`)
    msg.channel.send({
      files: [{
        attachment: `${media.display_url}`,
        name: `${media.media_id}.jpg`
      }]
    })
  }
};