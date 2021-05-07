const { prefix } = require('../config.json');

const ig = require('instagram-scraping');
const fs = require('fs');

module.exports = {
  name: `${prefix}scr`,
  description: `Send a specific scrapped data from Instagram
  Takes 2 argument:
  <> tag: string [required]
  <> download: string [optional] -> type 'download' to download the entire scrapped data`,
  execute(msg, args) {
    const arg = args[0]
    const arg2 = args[1]

    // validation
    if (!arg) {
      return msg.channel.send(`Plase provide an argument ie. <${prefix}scr meme>`)
    }

    // scrape and send randomly
    if (arg2 !== 'download') {
      ig.scrapeTag(arg).then(result => {
        const medias = result.medias
  
        // pick one
        const rand = Math.floor(Math.random() * medias.length)
        const media = medias[rand]
  
        msg.channel.send(`${media.text}`)
        msg.channel.send({
          files: [{
            attachment: `${media.display_url}`,
            name: `${media.media_id}.jpg`
          }]
        })
      });
    }

    // send the scrapped data
    if (arg2 == 'download') {
      ig.scrapeTag(arg).then(result => {
        fs.writeFileSync(`./shared/${arg}.txt`, JSON.stringify(result), 'utf8')
        
        msg.channel.send({
          files: [
            `./shared/${arg}.txt`
          ]
        })
      });
    }
  }
};