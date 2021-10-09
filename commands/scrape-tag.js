const { prefix } = require('../config.json');

const ig = require('instagram-scraping');
const fs = require('fs');

module.exports = {
  name: `${prefix}scr`,
  description: `Send a specific scrapped data from Instagram
  Takes 2 argument:
  <> tag: string [required]
  <> options: string [optional]
    -> [NULL] will send the highest like count
    -> type 'random' to send randomly scraped data
    -> type 'download' to download the entire scrapped data
    -> type 'showall' to show the entire scrapped data`,
  execute(msg, args) {
    const arg = args[0]
    const arg2 = args[1]

    // validation
    if (!arg) {
      return msg.channel.send(`Plase provide an argument ie. <${prefix}scr meme>`)
    }

    // scrape and send the highest like count
    if (!arg2) {
      ig.scrapeTag(arg).then(result => {
        const medias = result.medias

        // sorty by the highest like
        medias.sort((a, b) => {
          // Compare the 2 media
          if (a.like_count > b.like_count) return -1;
          if (a.like_count < b.like_count) return 1;
          return 0;
        });

        // pick by the highest like
        const media = medias[0]

        msg.channel.send(`LIKES COUNT: **${media.like_count}**
${media.text}`)
        msg.channel.send({
          files: [{
            attachment: `${media.display_url}`,
            name: `${media.media_id}.jpg`
          }]
        })
      });
    }

    // send randomly
    if (arg2 === 'random') {
      ig.scrapeTag(arg).then(result => {
        const medias = result.medias

        // pick one randomly
        const rand = Math.floor(Math.random() * medias.length)
        const media = medias[rand]

        msg.channel.send(`LIKES COUNT: ${media.like_count}
${media.text}`)
        msg.channel.send({
          files: [{
            attachment: `${media.display_url}`,
            name: `${media.media_id}.jpg`
          }]
        })
      });
    }

    // send the scrapped data
    if (arg2 === 'download') {
      ig.scrapeTag(arg).then(result => {
        const medias = result.medias

        // sort by the highest like
        medias.sort((a, b) => {
          // Compare the 2 media
          if (a.like_count > b.like_count) return -1;
          if (a.like_count < b.like_count) return 1;
          return 0;
        });

        // changed the old data with the new data
        result.medias = medias

        fs.writeFileSync(`./shared/${arg}.txt`, JSON.stringify(result, null, 2))

        msg.channel.send({
          files: [
            `./shared/${arg}.txt`
          ]
        })
      });
    }

    // send all scrapped data
    if (arg2 === 'showall') {
      msg.channel.send(`That feature is currently blocked due to immense traffic, please use download instead`)

      // ig.scrapeTag(arg).then(result => {
      //   const medias = result.medias

      //   medias.forEach(media => {
      //     msg.channel.send(`${media.text}`)
      //     msg.channel.send({
      //       files: [{
      //         attachment: `${media.display_url}`,
      //         name: `${media.media_id}.jpg`
      //       }]
      //     })
      //   });
      // });
    }
  }
};