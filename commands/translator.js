const { prefix } = require('../config.json');
const axios = require('axios')

// https://english.api.rakuten.net/googlecloud/api/google-translate1?endpoint=apiendpoint_a5764907-04b6-4d61-869b-79dc5325c739

const desc = `Translator.
Takes 3 argument:
  <> source: string [ie. en, id, es...]
  <> target: string [ie. en, id, es...]
  <> sentences: string [ie. Hello world!]`

module.exports = {
  name: `${prefix}tr`,
  description: desc,
  execute(msg, args) {
    const source = args[0]
    const target = args[1]
    const sentences = args.slice(2, args.length).join(' ')

    if (!source || !target || !sentences) {
      return msg.channel.send(desc)
    }

    axios({
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "accept-encoding": "application/gzip",
        "x-rapidapi-key": "74b6052625mshba67c0e90f188bcp17d2f8jsnba94b09c0f01",
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
        "useQueryString": true
      },
      data: {
        q: sentences,
        format: 'text',
        source: source,
        target: target
      }
    })
      .then((response) => {
        msg.channel.send(response.data.message)
        // const message = ``
        // message += response.data.translations.translatedText
      })
      .catch((err) => {
        // console.log(err.response);
        msg.channel.send(err.response.data.message)
      })
  }
};